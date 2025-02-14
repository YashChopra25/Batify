import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import DashboardHome from "@/pages/dashboard/DashboardHome.tsx";
import Redirection from "./pages/Redirection.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path="/" />
      <Route
        path="/auth/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route path="/:shortLink" element={<Redirection />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
