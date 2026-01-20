from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash
import sys

def verify_and_fix():
    passwords = ["postgres", "admin", "password", "root", "admin123", "123456"]
    connected = False
    
    for pwd in passwords:
        print(f"Trying password: '{pwd}'...")
        try:
            # Manually construct URL to test
            test_url = f"postgresql://postgres:{pwd}@localhost:5432/adminflow_db"
            from sqlalchemy import create_engine
            engine = create_engine(test_url)
            conn = engine.connect()
            conn.close()
            print(f"SUCCESS! Connected with password: {pwd}")
            connected = True
            # Update the actual .env file if success
            with open(".env", "r") as f:
                lines = f.readlines()
            with open(".env", "w") as f:
                for line in lines:
                    if line.startswith("DATABASE_URL="):
                        f.write(f"DATABASE_URL={test_url}\n")
                    else:
                        f.write(line)
            break
        except Exception:
            continue

    if not connected:
        print("Failed to connect with common passwords.")
        return

    db = SessionLocal()
    try:
        users = db.query(User).all()
        if not users:
            print("No users found in database! Did you run seed.sql?")
            return

        print(f"Found {len(users)} users.")
        for u in users:
            print(f"- {u.email} ({u.role})")

        # Fix admin1 password
        admin = db.query(User).filter(User.email == "admin1@adminflow.com").first()
        if admin:
            print("Updating admin1@adminflow.com password to 'password123'...")
            admin.password_hash = get_password_hash("password123")
            db.commit()
            print("Success!")
        else:
            print("Admin user not found. Creating one...")
            new_admin = User(
                name="Admin One",
                email="admin1@adminflow.com",
                password_hash=get_password_hash("password123"),
                role="ADMIN"
            )
            db.add(new_admin)
            db.commit()
            print("Created Admin user successfully.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    verify_and_fix()
