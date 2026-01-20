from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, student_requests, admin_requests, dashboard
from .db.session import Base, engine

# Create tables (simple approach without Alembic for now)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AdminFlow API", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(student_requests.router)
app.include_router(admin_requests.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "AdminFlow API is running"}
