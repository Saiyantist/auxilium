import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth";

export default function Header() {
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="shadow-sm px-6 py-4">
      <h2 className="text-xl font-semibold">Auxilium Helpdesk</h2>
      <ul>
        <li>
          <NavLink to="/" className="mr-4 hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="mr-4 hover:underline">
            About
          </NavLink>
          {/* Not yet working */}
          <NavLink to="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </NavLink>
          {token ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <NavLink to="/login" className="mr-4 hover:underline">
                Login
              </NavLink>
              <NavLink to="/register" className="mr-4 hover:underline">
                Register
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </header>
  );
}
