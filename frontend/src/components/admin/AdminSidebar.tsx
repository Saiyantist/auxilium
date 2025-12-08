import { ChartColumn, Bolt, BookUser, Users, Home, Ticket } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

export default function AppSidebar() {
  const location = useLocation();

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
                  isActive={location.pathname === "/admin-dashboard"}
                >
                  <NavLink to="/admin-dashboard">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* My Ticket */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/all-tickets"}
                >
                  <NavLink to="/all-tickets">
                    <Ticket className="w-5 h-5" />
                    <span>All Tickets</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Ticket Approval */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/approval"}
                >
                  <NavLink to="/approval">
                    <Ticket className="w-5 h-5" />
                    <span>Ticket Approval</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User Management*/}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/user-management"}
                >
                  <NavLink to="/user-management">
                    <Users className="w-5 h-5" />
                    <span>Users</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User Log History */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/user-history"}
                >
                  <NavLink to="/user-history">
                    <BookUser className="w-5 h-5" />
                    <span>User Log History</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              {/* Performance */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/performance"}
                >
                  <NavLink to="/performance">
                    <ChartColumn className="w-5 h-5" />
                    <span>Performance</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/settings"}
                >
                  <NavLink to="/settings">
                    <Bolt className="w-5 h-5" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}