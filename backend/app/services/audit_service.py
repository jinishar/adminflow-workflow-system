from sqlalchemy.orm import Session
from ..models.audit_log import AuditLog
from ..models.user import User
from ..utils.enums import RequestStatus

class AuditService:
    @staticmethod
    def log_transition(
        db: Session, 
        request_id: int, 
        actor: User, 
        old_status: RequestStatus, 
        new_status: RequestStatus, 
        remarks: str = None
    ):
        log_entry = AuditLog(
            request_id=request_id,
            actor_id=actor.id,
            actor_role=actor.role,
            old_status=old_status,
            new_status=new_status,
            remarks=remarks
        )
        db.add(log_entry)
        db.commit()
        return log_entry
