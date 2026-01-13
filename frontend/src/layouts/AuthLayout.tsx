import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const bgClass =
    location.pathname === "/login"
      ? "bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200"
      : "bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
      <Outlet />
    </div>
  );
}