import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* <div className="w-full max-w-lg h-[80vh] bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8"> */}
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <Outlet />
      </div>
    </div>
  );
}