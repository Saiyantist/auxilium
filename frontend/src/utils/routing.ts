/**
 * Get the correct dashboard route based on user role
 */
export function getDashboardRoute(role: string | undefined): string {
  if (role === 'admin') {
    return '/admin-dashboard';
  } else if (role === 'agent') {
    return '/agent-dashboard';
  } else if (role === 'client') {
    return '/dashboard';
  }
  // Fallback to dashboard for unknown roles
  return '/dashboard';
}
