from pydantic import BaseModel, EmailStr
from datetime import datetime
from ..utils.enums import UserRole, RequestStatus

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.STUDENT

class UserResponse(UserBase):
    id: int
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

# Request Schemas
class RequestCreate(BaseModel):
    type: str
    title: str
    description: str | None = None

class AuditLogResponse(BaseModel):
    id: int
    actor_id: int | None
    actor_role: UserRole
    old_status: RequestStatus | None
    new_status: RequestStatus
    remarks: str | None
    timestamp: datetime

    class Config:
        from_attributes = True

class RequestResponse(BaseModel):
    id: int
    student_id: int
    type: str
    title: str
    description: str | None
    status: RequestStatus
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class RequestDetailResponse(RequestResponse):
    history: list[AuditLogResponse] = []

class AdminAction(BaseModel):
    remarks: str | None = None
