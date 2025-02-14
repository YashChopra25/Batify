import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetToken } from "@/utils/GetToken";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = GetToken();

  useEffect(() => {
    // Redirect to login if no token is found and the user is trying to access the dashboard
    if (pathname === "/dashboard" && !token) {
      navigate("/auth/login");
    }
    // Redirect to dashboard if user is authenticated and trying to access login or signup
    else if (
      (pathname === "/auth/login" || pathname === "/auth/signup") &&
      token
    ) {
      navigate("/dashboard");
    }
  }, [pathname, token, navigate]);

  // Render children if no redirection happened
  return children;
};

export default ProtectedRoute;
