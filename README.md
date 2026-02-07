# AdminFlow - Intelligent Workflow Management System

## Problem Statement
Internal operations in educational institutions and organizations suffer from inefficient request management, lack of transparency in approval processes, and poor audit trails. Students and employees face delays in getting their requests processed, while administrators struggle with tracking and managing multiple requests. The absence of a centralized, role-based workflow system leads to bottlenecks and reduced operational efficiency.

## Proposed Solution
**AdminFlow** is a domain-agnostic internal operations and approval workflow system designed to streamline request management from submission to resolution. By implementing strict state transition rules and comprehensive audit logging, the platform ensures transparency, accountability, and efficiency.

Our web application:
- **Streamlines** the complete lifecycle of requests with a well-defined workflow: `SUBMITTED` → `IN_REVIEW` → `APPROVED/REJECTED` → `RESOLVED`.
- **Empowers** students and employees to submit, track, and manage their requests through an intuitive, modern interface.
- **Facilitates** administrators with powerful tools to review, approve/reject, and monitor requests with real-time metrics.
- **Ensures** accountability through comprehensive audit logging, tracking every state transition and action performed.

## Innovation & Creativity
- **Backend-First Architecture**: Built with FastAPI and SQLAlchemy ORM, ensuring scalability and type-safe database operations.
- **State Machine Workflow**: Implements strict state transitions that prevent invalid workflow states and ensure data integrity.
- **Real-Time Metrics Dashboard**: SQL-powered aggregations provide summary statistics, pending request counts, and performance analytics.
- **Premium Glassmorphism UI**: Modern interface with glassmorphic design elements, smooth animations, and curated color palettes.
- **Dual Portal System**: Separate login portals for students/employees and administrators, each optimized for their specific workflows.

## Technical Complexity & Stack
This project leverages a modern, full-stack architecture:

- **Backend Framework**: FastAPI - High-performance async Python web framework with automatic API documentation
- **ORM & Database**: SQLAlchemy + PostgreSQL - Enterprise-grade relational database with complex query support
- **Authentication**: 
  - `python-jose[cryptography]`: JWT token generation and validation
  - `passlib[bcrypt]`: Secure password hashing
- **Frontend Framework**: React (v19.2.0) - Modern component-based UI library
- **Build Tool**: Vite (v7.2.4) - Next-generation frontend tooling with instant HMR
- **Styling**: Tailwind CSS (v4.1.18) - Utility-first CSS framework with custom design system
- **Routing**: React Router DOM (v7.12.0) - Declarative routing for SPAs
- **HTTP Client**: Axios (v1.13.2) - Promise-based HTTP client with auth interceptors
- **Architecture**: Feature-first structure with clear separation of concerns (routes, services, models, schemas)

## Usability & Impact
**Users:**
1. **Students/Employees**: Individuals who submit requests for administrative processes (leave applications, document requests, grievances).
2. **Administrators**: Staff members responsible for reviewing, approving/rejecting, and managing requests.

**Interaction:**
- **Students/Employees** submit requests with detailed descriptions, track status in real-time, and view complete history with audit trail.
- **Administrators** view pending requests, approve/reject with comments, and access metrics dashboard showing total requests, pending counts, and approval rates.

**Impact:**
- **Operational**: Reduces request processing time by up to 70% through automated workflows and centralized management.
- **Transparency**: Complete audit trail ensures accountability and tracking of every action.
- **Scalability**: Domain-agnostic design allows adaptation for various organizational contexts (educational, corporate, government).

## Setup Instructions

### Prerequisites
- [Python 3.8+](https://www.python.org/downloads/) installed and configured.
- [Node.js 16+](https://nodejs.org/) and npm installed.
- [PostgreSQL 12+](https://www.postgresql.org/download/) database server running.

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd AdminFlow
   ```

2. **Database Setup**
   ```bash
   createdb adminflow
   psql -d adminflow -f database/schema.sql
   psql -d adminflow -f database/seed.sql
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   
   # Create .env file with:
   # DATABASE_URL=postgresql://postgres:password@localhost:5432/adminflow
   # JWT_SECRET=your-secret-key
   # JWT_EXPIRES_MINUTES=1440
   
   uvicorn app.main:app --reload
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Default Credentials (Seed Data)
| Role | Email | Password |
|------|-------|----------|
| Admin | `admin1@adminflow.com` | `password123` |
| Student | `john@student.com` | `password123` |

### API Endpoints
- **Auth**: `/auth/login`, `/auth/register`, `/auth/me`
- **Student**: `/requests` (POST), `/requests/my` (GET), `/requests/{id}` (GET)
- **Admin**: `/admin/requests/pending`, `/admin/requests/{id}/approve`, `/admin/metrics/summary`
