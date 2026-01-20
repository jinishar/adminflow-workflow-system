import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import PortalSelection from './pages/PortalSelection';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CreateRequest from './pages/student/CreateRequest';
import MyRequests from './pages/student/MyRequests';
import RequestDetails from './pages/student/RequestDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingRequests from './pages/admin/PendingRequests';
import RequestReview from './pages/admin/RequestReview';
import Metrics from './pages/admin/Metrics';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Sidebar />
      <main className="pl-64 pt-24 px-10 pb-20">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PortalSelection />} />
          <Route path="/login/student" element={<Login />} />
          <Route path="/login/admin" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Student Routes */}
              <Route element={<RoleRoute allowedRoles={['STUDENT']} />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/my-requests" element={<MyRequests />} />
                <Route path="/student/create-request" element={<CreateRequest />} />
                <Route path="/student/requests/:id" element={<RequestDetails />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/pending" element={<PendingRequests />} />
                <Route path="/admin/requests/:id" element={<RequestReview />} />
                <Route path="/admin/metrics" element={<Metrics />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
