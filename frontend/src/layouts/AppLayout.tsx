import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Fixed Header */}
      <Header />
      {/* Main Content — fills the space between header & footer */}
      <main className="flex-1 pt-[30px] pb-[40px] overflow-auto">
        <Outlet />
      </main>

      {/* Fixed Footer */}
        <Footer />
    </div>
  );
}