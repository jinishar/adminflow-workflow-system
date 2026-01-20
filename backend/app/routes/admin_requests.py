from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..models.request import Request
from ..models.audit_log import AuditLog
from ..schemas.user import RequestResponse, AdminAction, RequestDetailResponse
from ..core.rbac import admin_only
from ..utils.enums import RequestStatus
from ..services.workflow_service import WorkflowService
from ..services.audit_service import AuditService

router = APIRouter(prefix="/admin/requests", tags=["admin"])

@router.get("/all", response_model=list[RequestResponse])
def get_all_requests(db: Session = Depends(get_db), current_user: User = Depends(admin_only)):
    return db.query(Request).all()

@router.get("/pending", response_model=list[RequestResponse])
def get_pending_requests(db: Session = Depends(get_db), current_user: User = Depends(admin_only)):
    return db.query(Request).filter(Request.status.in_([RequestStatus.SUBMITTED, RequestStatus.IN_REVIEW])).all()

def update_request_status(
    id: int, 
    next_status: RequestStatus, 
    action: AdminAction, 
    db: Session, 
    admin: User
):
    request = db.query(Request).filter(Request.id == id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    WorkflowService.validate_transition(request.status, next_status)
    
    old_status = request.status
    request.status = next_status
    db.commit()
    
    AuditService.log_transition(db, id, admin, old_status, next_status, action.remarks)
    db.refresh(request)
    return request

@router.patch("/{id}/review", response_model=RequestResponse)
def move_to_review(id: int, action: AdminAction, db: Session = Depends(get_db), admin: User = Depends(admin_only)):
    return update_request_status(id, RequestStatus.IN_REVIEW, action, db, admin)

@router.patch("/{id}/approve", response_model=RequestResponse)
def approve_request(id: int, action: AdminAction, db: Session = Depends(get_db), admin: User = Depends(admin_only)):
    return update_request_status(id, RequestStatus.APPROVED, action, db, admin)

@router.patch("/{id}/reject", response_model=RequestResponse)
def reject_request(id: int, action: AdminAction, db: Session = Depends(get_db), admin: User = Depends(admin_only)):
    if not action.remarks:
        raise HTTPException(status_code=400, detail="Remarks are mandatory for rejection")
    return update_request_status(id, RequestStatus.REJECTED, action, db, admin)

@router.patch("/{id}/resolve", response_model=RequestResponse)
def resolve_request(id: int, action: AdminAction, db: Session = Depends(get_db), admin: User = Depends(admin_only)):
    return update_request_status(id, RequestStatus.RESOLVED, action, db, admin)

@router.get("/{id}", response_model=RequestDetailResponse)
def get_admin_request_detail(id: int, db: Session = Depends(get_db), current_user: User = Depends(admin_only)):
    request = db.query(Request).filter(Request.id == id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    history = db.query(AuditLog).filter(AuditLog.request_id == id).order_by(AuditLog.timestamp.desc()).all()
    request.history = history
    return request
