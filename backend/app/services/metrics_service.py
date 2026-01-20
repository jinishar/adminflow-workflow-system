from sqlalchemy.orm import Session
from sqlalchemy import text

class MetricsService:
    @staticmethod
    def get_summary_metrics(db: Session):
        query = text("""
            SELECT 
                COUNT(*) as total_requests,
                COUNT(*) FILTER (WHERE status = 'SUBMITTED') as pending_requests,
                COUNT(*) FILTER (WHERE status = 'APPROVED') as approved_requests,
                COUNT(*) FILTER (WHERE status = 'REJECTED') as rejected_requests,
                COUNT(*) FILTER (WHERE status = 'RESOLVED') as resolved_requests
            FROM requests;
        """)
        result = db.execute(query).fetchone()
        return dict(result._mapping)

    @staticmethod
    def get_status_distribution(db: Session):
        query = text("""
            SELECT status, COUNT(*) as count
            FROM requests
            GROUP BY status;
        """)
        results = db.execute(query).fetchall()
        return [dict(r._mapping) for r in results]

    @staticmethod
    def get_avg_processing_time(db: Session):
        query = text("""
            SELECT AVG(updated_at - created_at) as avg_processing_time
            FROM requests
            WHERE status IN ('RESOLVED', 'REJECTED');
        """)
        result = db.execute(query).fetchone()
        # Handle interval to string
        res = result[0]
        return str(res) if res else "0"

    @staticmethod
    def get_admin_workload(db: Session):
        query = text("""
            SELECT 
                u.name as admin_name,
                COUNT(DISTINCT al.request_id) as requests_handled
            FROM users u
            JOIN audit_logs al ON u.id = al.actor_id
            WHERE u.role = 'ADMIN'
            GROUP BY u.name;
        """)
        results = db.execute(query).fetchall()
        return [dict(r._mapping) for r in results]
