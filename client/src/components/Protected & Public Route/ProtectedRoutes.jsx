import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
//   console.log(token);

  const storedToken = localStorage.getItem("token");
  const isAuth = token || storedToken;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  console.log("✅ Protected route: access granted");
  return children;
};

export default ProtectedRoutes;
