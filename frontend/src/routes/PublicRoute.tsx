import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { getDashboardRoute } from '@/utils/routing';

export default function PublicRoute({ redirectTo }: { redirectTo?: string }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If user is authenticated, redirect to their role-specific dashboard
  if (user) {
    const dashboardRoute = redirectTo || getDashboardRoute(user?.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  return <Outlet />;
}
