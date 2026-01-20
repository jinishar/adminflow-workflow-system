from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..models.request import Request
from ..models.audit_log import AuditLog
from ..schemas.user import RequestCreate, RequestResponse, RequestDetailResponse, AuditLogResponse
from ..core.rbac import student_only
from ..utils.enums import RequestStatus

router = APIRouter(prefix="/requests", tags=["student"])

@router.post("", response_model=RequestResponse)
def create_request(
    request_in: RequestCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(student_only)
):
    request = Request(
        student_id=current_user.id,
        type=request_in.type,
        title=request_in.title,
        description=request_in.description,
        status=RequestStatus.SUBMITTED
    )
    db.add(request)
    db.commit()
    db.refresh(request)
    return request

@router.get("/my", response_model=list[RequestResponse])
def get_my_requests(
    db: Session = Depends(get_db), 
    current_user: User = Depends(student_only)
):
    return db.query(Request).filter(Request.student_id == current_user.id).all()

@router.get("/{id}", response_model=RequestDetailResponse)
def get_request_detail(
    id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(student_only)
):
    request = db.query(Request).filter(Request.id == id, Request.student_id == current_user.id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    history = db.query(AuditLog).filter(AuditLog.request_id == id).order_by(AuditLog.timestamp.desc()).all()
    request.history = history
    return request
