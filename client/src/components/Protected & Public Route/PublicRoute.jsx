import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const storedToken = localStorage.getItem("token");

  const isAuthenticated = token || storedToken;

  if (isAuthenticated) {
    console.log("🚫 Already logged in — redirecting to dashboard");
    return <Navigate to="/chat-dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
