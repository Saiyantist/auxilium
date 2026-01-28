import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const bgClass =
    location.pathname === "/login"
      ? "bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300"
      : "bg-gradient-to-br from-blue-300 via-purple-300 to-indigo-300";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
      <Outlet />
    </div>
  );
}