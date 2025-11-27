import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardHeader() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate('/login'); // no need, ProtectedRoute redirects to /login automatically.
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <header
      aria-label="Dashboard navigation"
      className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-purple-400 to-purple-600 text-white drop-shadow-xl px-6 py-4"
    >
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-purple-600" />
          <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
        </div>

        <div className="">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-primary"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
