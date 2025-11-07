// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/shared/Sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 pt-[200px] pb-[80px] px-6 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
