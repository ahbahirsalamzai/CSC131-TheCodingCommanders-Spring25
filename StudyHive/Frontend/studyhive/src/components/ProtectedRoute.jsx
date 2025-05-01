import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

  //  Wait until token/user is fully checked
  if (loading) return null; // or add a spinner if you want

  //  If not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

  //  If role is not allowed, redirect to forbidden
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" replace />;
        }

  //  Otherwise, render the protected content
    return children;
};

export default ProtectedRoute;