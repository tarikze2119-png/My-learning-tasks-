import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Spinner } from "../ui/Spinner";

/**
 * RequireAuth — Guard component wrapping protected screens (e.g. /checkout)
 * As taught on Day 31: checks loading first to avoid premature bounce,
 * then redirects to /login with original location stored in state.
 */
export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner label="Verifying account session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
