import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isServiceUnavailable } from "../utils/serviceAvailability";

const TimeBasedRouteGuard = ({ children }) => {

  const isBlocked = isServiceUnavailable();
  useEffect(() => {
    if (isBlocked && !window.location.pathname.startsWith("/dashboard")) {
      toast.error("Pickup orders are not available after 8 PM IST.");
    }
  }, [isBlocked]);

  if (isBlocked) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default TimeBasedRouteGuard;