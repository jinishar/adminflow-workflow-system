from app.db.session import SessionLocal, engine, Base
from app.models.user import User
from app.models.request import Request
from app.models.audit_log import AuditLog
from app.utils.enums import UserRole, RequestStatus
from app.core.security import get_password_hash
from datetime import datetime, timedelta

def setup_sqlite():
    print("Creating SQLite tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        if db.query(User).count() > 0:
            print("Database already has data. Skipping seed.")
            return

        print("Seeding SQLite database...")
        # Create Users
        admin = User(
            name="Admin One",
            email="admin1@adminflow.com",
            password_hash=get_password_hash("password123"),
            role=UserRole.ADMIN
        )
        student = User(
            name="Student John",
            email="john@student.com",
            password_hash=get_password_hash("password123"),
            role=UserRole.STUDENT
        )
        db.add_all([admin, student])
        db.commit()

        # Create a Request
        req = Request(
            student_id=student.id,
            type="HR_LEAVE",
            title="Sample Request",
            description="This is a sample request for testing.",
            status=RequestStatus.SUBMITTED
        )
        db.add(req)
        db.commit()
        
        print("SQLite setup complete! Admin: admin1@adminflow.com / password123")

    finally:
        db.close()

if __name__ == "__main__":
    setup_sqlite()
