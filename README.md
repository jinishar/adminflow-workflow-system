****AdminFlow – Internal Operations & Approval Workflow System****

AdminFlow is a backend-first internal operations platform built to digitize structured approval workflows inside an institution.
Users can submit operational requests and authorized administrators can review, approve, reject, and resolve those requests through a strict backend-enforced lifecycle.

This project demonstrates workflow enforcement, RBAC security, audit trails, and SQL-driven analytics, making it more advanced than typical CRUD systems.

****Features****
**Workflow Enforcement (Backend)**

**Requests follow a strict lifecycle:**
SUBMITTED → IN_REVIEW → APPROVED/REJECTED → RESOLVED

**Rules enforced:**
Only students can submit requests
Only admins can change request status
Invalid state transitions are blocked
Requests cannot be edited after submission
Rejections require mandatory remarks

**Role-Based Access Control (RBAC)**
Separate permissions for Student and Admin/Warden
Enforced at API level

****Audit Trail -******
**Every action is logged with:**
old state → new state
actor (student/admin)
timestamp
remarks

**Admin Dashboards & Metrics (SQL-driven)**
Pending request count
Status distribution
Average processing time
Workload overview
Tech Stack

**Backend:**
Python, FastAPI
JWT Authentication
RBAC Authorization

**Database:**
PostgreSQL
SQL joins + aggregations for metrics

**Frontend:**
React (Vite)
Tailwind CSS
