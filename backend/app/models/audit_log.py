from sqlalchemy import Column, Integer, Enum as SQLEnum, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from ..db.session import Base
from ..utils.enums import RequestStatus, UserRole

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("requests.id", ondelete="CASCADE"))
    actor_id = Column(Integer, ForeignKey("users.id"))
    actor_role = Column(SQLEnum(UserRole), nullable=False)
    old_status = Column(SQLEnum(RequestStatus), nullable=True)
    new_status = Column(SQLEnum(RequestStatus), nullable=False)
    remarks = Column(Text, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
