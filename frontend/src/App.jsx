import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddCertificate from './pages/AddCertificate';
import MyCertificates from './pages/MyCertificates';
import VerifyCertificates from './pages/VerifyCertificates';
import CertificateDetails from './pages/CertificateDetails';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/add-certificate" element={<ProtectedRoute role="student"><AddCertificate /></ProtectedRoute>} />
          <Route path="/my-certificates" element={<ProtectedRoute role="student"><MyCertificates /></ProtectedRoute>} />
          <Route path="/certificates/:id" element={<ProtectedRoute><CertificateDetails /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/verify-certificates" element={<ProtectedRoute role="admin"><VerifyCertificates /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
