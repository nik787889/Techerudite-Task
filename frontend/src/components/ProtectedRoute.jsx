import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isLoggedIn, role } = useContext(AuthContext);
    const location = useLocation();

    if (!isLoggedIn || role !== requiredRole) {
        return <Navigate to={`/login/${requiredRole}`} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;