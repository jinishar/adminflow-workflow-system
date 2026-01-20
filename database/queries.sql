-- AdminFlow Dashboard Queries (SQL Aggregations)

-- Summary Metrics
-- Total requests, pending, approved, rejected
SELECT 
    COUNT(*) as total_requests,
    COUNT(*) FILTER (WHERE status = 'SUBMITTED') as pending_requests,
    COUNT(*) FILTER (WHERE status = 'APPROVED') as approved_requests,
    COUNT(*) FILTER (WHERE status = 'REJECTED') as rejected_requests,
    COUNT(*) FILTER (WHERE status = 'RESOLVED') as resolved_requests
FROM requests;

-- Status Distribution
SELECT status, COUNT(*) as count
FROM requests
GROUP BY status;

-- Average Processing Time (from SUBMITTED to RESOLVED or REJECTED)
SELECT AVG(updated_at - created_at) as avg_processing_time
FROM requests
WHERE status IN ('RESOLVED', 'REJECTED');

-- Admin Workload (Requests handled by each admin)
SELECT 
    u.name as admin_name,
    COUNT(DISTINCT al.request_id) as requests_handled
FROM users u
JOIN audit_logs al ON u.id = al.actor_id
WHERE u.role = 'ADMIN'
GROUP BY u.name;

-- Weekly Request Volume
SELECT 
    DATE_TRUNC('week', created_at) as week,
    COUNT(*) as volume
FROM requests
GROUP BY week
ORDER BY week DESC;
