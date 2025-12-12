import { useTickets } from "@/hooks/useTickets";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStatsClient from "@/components/dashboard/DashboardStatsClient";
import DashboardStatsAgent from "@/components/dashboard/DashboardStatsAgent";
import DashboardTicketList from "@/components/dashboard/DashboardTicketList";
import { isAgent, isClient } from "@/utils/role";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();

  const tickets = useTickets();

  const filteredTickets = tickets.data?.filter((t) => {
    if (user && isClient(user.role)) return t.creator_id === user.id;

    if (user && isAgent(user.role))
      return t.assignee_id === user.id || !t.assignee_id;

    return [];
  });

  // Compute stats
  const stats = {
    open: filteredTickets?.filter((t) => t.status === "open").length || 0,
    pending: filteredTickets?.filter((t) => t.status === "pending").length || 0,
    on_hold: filteredTickets?.filter((t) => t.status === "on_hold").length || 0,
    closed: filteredTickets?.filter((t) => t.status === "closed").length || 0,
    resolved: filteredTickets?.filter((t) => t.status === "resolved").length || 0,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <DashboardHeader role={user?.role} />

      {/* Stats */}
      {user && isAgent(user?.role) ? ( <DashboardStatsAgent stats={stats}/>) :
                                        <DashboardStatsClient stats={stats} />}

      {/* Recent Tickets */}
      <DashboardTicketList tickets={filteredTickets?.slice(0, 5) || []} />

    </div>
  );
}
