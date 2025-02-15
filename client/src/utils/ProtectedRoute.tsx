import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetToken } from "@/utils/GetToken";
import { useAppSelector } from "@/store/auth.store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = GetToken();
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  useEffect(() => {
    console.log(pathname, token, user);
    // Redirect to login if no token is found and the user is trying to access the dashboard
    if (pathname === "/dashboard" && (!token || !user || !user.name)) {
      navigate("/auth/login");
    }
    // Redirect to dashboard if user is authenticated and trying to access login or signup
    if (
      (pathname === "/auth/login" || pathname === "/auth/signup") &&
      token &&
      user
    ) {
      navigate("/dashboard");
    }
  }, [pathname, token, navigate, isLoading, user]);
  if (isLoading)
    return <div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>;
  // Render children if no redirection happened
  return children;
};

export default ProtectedRoute;
