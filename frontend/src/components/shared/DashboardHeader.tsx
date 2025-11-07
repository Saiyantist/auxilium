import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/services/auth";

export default function DashboardHeader() {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header
      aria-label="Dashboard navigation"
      className="w-full fixed top-0 left-0 z-50 bg-purple-500 text-white drop-shadow-xl px-6 py-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-purple-600" />
          <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
        </div>

        <div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-primary">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
