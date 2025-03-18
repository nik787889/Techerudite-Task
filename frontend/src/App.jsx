import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerWelcome from './pages/CustomerWelcome';
import AdminWelcome from './pages/AdminWelcome';
import CustomerRegistration from './components/CustomerRegistration';
import AdminRegistration from './components/AdminRegistration';
import AdminLogin from './components/AdminLogin';
import Navbar from './pages/Navbar';
import CustomerLogin from './components/CustomerLogin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (

    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/customer-welcome"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerWelcome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-welcome"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminWelcome />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/register/customer" element={<CustomerRegistration />} />
          <Route path="/register/admin" element={<AdminRegistration />} />
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;