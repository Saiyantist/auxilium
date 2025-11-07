import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicRoute({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
}
