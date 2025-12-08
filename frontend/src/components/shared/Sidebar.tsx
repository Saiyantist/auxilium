import { Home, PlusCircle, Ticket, CircleUserRound, Headset } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold">Auxilium</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                >
                  <NavLink to="/dashboard">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* New Ticket */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/new-ticket"}
                >
                  <NavLink to="/new-ticket">
                    <PlusCircle className="w-5 h-5" />
                    <span>New Ticket</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* My Ticket */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/tickets"}
                >
                  <NavLink to="/tickets">
                    <Ticket className="w-5 h-5" />
                    <span>My Tickets</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto cursor-default">
              <div className="flex items-center gap-3">
                {user?.role === 'client' &&
                  <CircleUserRound className="w-5 h-5" />}
                {user?.role === 'agent' &&
                  <Headset className="w-5 h-5" />}
                <div>
                  <p>{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs">{user?.email}</p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}