from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..core.rbac import admin_only
from ..services.metrics_service import MetricsService

router = APIRouter(prefix="/admin/metrics", tags=["dashboard"])

@router.get("/summary")
def get_summary(db: Session = Depends(get_db), admin=Depends(admin_only)):
    return MetricsService.get_summary_metrics(db)

@router.get("/status-distribution")
def get_status_dist(db: Session = Depends(get_db), admin=Depends(admin_only)):
    return MetricsService.get_status_distribution(db)

@router.get("/avg-processing-time")
def get_avg_time(db: Session = Depends(get_db), admin=Depends(admin_only)):
    return {"avg_processing_time": MetricsService.get_avg_processing_time(db)}

@router.get("/admin-workload")
def get_workload(db: Session = Depends(get_db), admin=Depends(admin_only)):
    return MetricsService.get_admin_workload(db)
