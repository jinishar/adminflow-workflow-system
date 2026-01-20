from enum import Enum

class UserRole(str, Enum):
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"

class RequestStatus(str, Enum):
    SUBMITTED = "SUBMITTED"
    IN_REVIEW = "IN_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    RESOLVED = "RESOLVED"
