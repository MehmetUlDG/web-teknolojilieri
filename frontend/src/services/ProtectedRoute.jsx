import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user } = useSelector((state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }));
    
    const location = useLocation();
    const currentUserRole = user?.role || user?.user?.role;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && currentUserRole !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;