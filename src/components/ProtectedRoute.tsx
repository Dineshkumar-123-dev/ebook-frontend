import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // if not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && allowedRoles.includes(role)) {
    // allowed role → render the page
    return children;
  }

  // unauthorized → redirect home
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
