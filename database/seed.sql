-- AdminFlow Seed Data

-- Clear existing data
TRUNCATE audit_logs, requests, users RESTART IDENTITY CASCADE;

-- Insert Users (Password hash for 'password123' using bcrypt - mock hash)
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin One', 'admin1@adminflow.com', '$2b$12$K8y4TfL4/4r7iK/w6hH8O.1vjHj0v5O6X7zV8I0lJ3O9.P7qY.G.m', 'ADMIN'),
('Admin Two', 'admin2@adminflow.com', '$2b$12$K8y4TfL4/4r7iK/w6hH8O.1vjHj0v5O6X7zV8I0lJ3O9.P7qY.G.m', 'ADMIN'),
('Student John', 'john@student.com', '$2b$12$K8y4TfL4/4r7iK/w6hH8O.1vjHj0v5O6X7zV8I0lJ3O9.P7qY.G.m', 'STUDENT'),
('Student Jane', 'jane@student.com', '$2b$12$K8y4TfL4/4r7iK/w6hH8O.1vjHj0v5O6X7zV8I0lJ3O9.P7qY.G.m', 'STUDENT'),
('Student Bob', 'bob@student.com', '$2b$12$K8y4TfL4/4r7iK/w6hH8O.1vjHj0v5O6X7zV8I0lJ3O9.P7qY.G.m', 'STUDENT');

-- Insert Requests
INSERT INTO requests (student_id, type, title, description, status, created_at) VALUES
(3, 'HR_LEAVE', 'Medical Leave', 'Requesting 2 days leave for health checkup.', 'SUBMITTED', NOW() - INTERVAL '2 days'),
(3, 'IT_SUPPORT', 'Laptop Screen Issue', 'Flickering screen on Macbook Pro.', 'IN_REVIEW', NOW() - INTERVAL '5 days'),
(4, 'PROCUREMENT', 'Office Chair', 'Need ergonomic chair for back support.', 'APPROVED', NOW() - INTERVAL '10 days'),
(4, 'HR_LEAVE', 'Family Wedding', 'Requesting 1 week leave for wedding.', 'REJECTED', NOW() - INTERVAL '15 days'),
(5, 'COMPLIANCE', 'System Access', 'Requesting access to production database.', 'RESOLVED', NOW() - INTERVAL '20 days'),
(3, 'IT_SUPPORT', 'WiFi Issue', 'Connection drops frequently in Hall A.', 'SUBMITTED', NOW() - INTERVAL '1 day'),
(5, 'HR_LEAVE', 'Short Leave', 'Need to attend bank work.', 'SUBMITTED', NOW() - INTERVAL '4 hours');

-- Insert Audit Logs
INSERT INTO audit_logs (request_id, actor_id, actor_role, old_status, new_status, remarks, timestamp) VALUES
(2, 1, 'ADMIN', 'SUBMITTED', 'IN_REVIEW', 'Reviewing hardware specifications.', NOW() - INTERVAL '4 days'),
(3, 1, 'ADMIN', 'SUBMITTED', 'IN_REVIEW', 'Checking inventory.', NOW() - INTERVAL '9 days'),
(3, 2, 'ADMIN', 'IN_REVIEW', 'APPROVED', 'Request approved. Procurement initiated.', NOW() - INTERVAL '8 days'),
(4, 1, 'ADMIN', 'SUBMITTED', 'IN_REVIEW', 'Verifying leave balance.', NOW() - INTERVAL '14 days'),
(4, 1, 'ADMIN', 'IN_REVIEW', 'REJECTED', 'Insufficient leave balance for 1 week.', NOW() - INTERVAL '13 days'),
(5, 2, 'ADMIN', 'SUBMITTED', 'IN_REVIEW', 'Reviewing compliance requirements.', NOW() - INTERVAL '19 days'),
(5, 2, 'ADMIN', 'IN_REVIEW', 'APPROVED', 'Access granted for temporary period.', NOW() - INTERVAL '18 days'),
(5, 2, 'ADMIN', 'APPROVED', 'RESOLVED', 'Access confirmed and verified.', NOW() - INTERVAL '17 days');
