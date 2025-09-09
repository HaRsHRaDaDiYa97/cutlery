import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const { user } = useSelector((state) => state.auth);


 // ❌ not logged in → redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }


  if (user.role !== "admin") {
    // logged in but not admin → redirect to home
    return <Navigate to="/" replace />;
  }

  // ✅ user is admin → allow access
  return <Outlet />;
};

export default ProtectedAdminRoute;
