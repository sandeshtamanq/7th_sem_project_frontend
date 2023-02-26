import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import jwtDecode from "jwt-decode";
const ProtectedRoutes = ({ children }) => {
  let user;
  const token = localStorage.getItem("access-token");
  if (token) {
    user = jwtDecode(token);
  }

  if (user?.user?.role === "admin") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
