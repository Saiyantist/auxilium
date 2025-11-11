import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AppLayout() {
  return (
    <ScrollArea className="h-screen">
      <div className="flex w-full">
        {/* Fixed Header */}
        <Header />
        {/* Main Content — fills the space between header & footer */}
        <main className="flex-1 py-14">
          <Outlet />
        </main>

        {/* Fixed Footer */}
          <Footer />
      </div>
    </ScrollArea>
  );
}