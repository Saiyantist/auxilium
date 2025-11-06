import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen container mx-auto">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
