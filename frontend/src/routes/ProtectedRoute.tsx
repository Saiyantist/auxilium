import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute() {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}