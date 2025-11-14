import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/")
      setTimeout(() => {navigate("/")}, 1)
    } catch (err: any) {
      console.error(err)
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
 
        {/* Admin Links for placeholder only waiting for backend function */}
        <div className="flex items-center gap-6">
          <NavLink to="">User Dashboard</NavLink>
          <NavLink to="/agent-dashboard">Agent Dashboard</NavLink>
          <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-primary">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
