// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Sidebar from '@/components/shared/Sidebar';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TicketProvider } from '@/contexts/TicketContext';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <DashboardHeader />
        <ScrollArea className='h-screen'>
          <main className='flex-1 pt-[100px] pb-[80px] px-6 overflow-auto'>
            <TicketProvider>
              <Outlet />
            </TicketProvider>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
