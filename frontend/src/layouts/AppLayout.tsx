import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />
      {/* Main Content — fills the space between header & footer */}
      <main className="flex-1 pt-[200px] pb-[80px] px-6 overflow-auto">
        <Outlet />
      </main>

      {/* Fixed Footer */}
        <Footer />
    </div>
  );
}
