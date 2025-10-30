import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRole } from "../redux/authSlice";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, role, loading } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isAuthenticated && user?.email && !role) {
      dispatch(fetchUserRole(user.email));
    }
  }, [dispatch, isAuthenticated, user, role]);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        Checking permissions...
      </div>
    );
  }


  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }


  return children;
}
