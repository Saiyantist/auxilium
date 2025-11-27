import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { getDashboardRoute } from '@/utils/routing';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

/**
 * Route guard that checks if the user has one of the allowed roles.
 * Redirects to the user's appropriate dashboard if they don't have access.
 */
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user doesn't have an allowed role, redirect to their dashboard
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRoute(user?.role)} replace />;
  }

  return <Outlet />;
}
