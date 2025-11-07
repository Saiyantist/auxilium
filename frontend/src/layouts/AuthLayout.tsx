import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-md p-6">
        <Outlet />
      </div>
    </div>
  );
}
