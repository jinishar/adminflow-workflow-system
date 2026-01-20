from ..utils.enums import RequestStatus
from ..utils.exceptions import InvalidStateTransitionException

class WorkflowService:
    # Allowed transitions: current_status -> list of next_statuses
    ALLOWED_TRANSITIONS = {
        RequestStatus.SUBMITTED: [RequestStatus.IN_REVIEW],
        RequestStatus.IN_REVIEW: [RequestStatus.APPROVED, RequestStatus.REJECTED],
        RequestStatus.APPROVED: [RequestStatus.RESOLVED],
        RequestStatus.REJECTED: [], # Final state
        RequestStatus.RESOLVED: [] # Final state
    }

    @staticmethod
    def validate_transition(current_status: RequestStatus, next_status: RequestStatus):
        if next_status not in WorkflowService.ALLOWED_TRANSITIONS.get(current_status, []):
            raise InvalidStateTransitionException(
                f"Cannot transition from {current_status} to {next_status}"
            )
        return True

    @staticmethod
    def is_immutable(status: RequestStatus):
        # Once submitted, it cannot be edited by the student.
        # This is already a rule, since students only 'create'.
        return True
