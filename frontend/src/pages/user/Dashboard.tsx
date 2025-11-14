import { Card } from "@/components/ui/card";
import { useTickets } from "@/contexts/TicketContext";

export default function Dashboard() {
  const { tickets } = useTickets();

  // Count totals by status
  const totalTickets = tickets.length;
  const totalSolved = tickets.filter(
    (t: any) => t.status === "Resolved" || t.status === "Closed"
  ).length;
  const totalAwaiting = tickets.filter(
    (t: any) => t.status === "Awaiting Approval" || t.status === "On Hold"
  ).length;
  const totalInProgress = tickets.filter(
    (t: any) => t.status === "In Progress"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Dashboard
      </h1>

      <div className="py-10">
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {/* Total Tickets */}
          <Card className="bg-blue-100 p-7 text-center hover:shadow-xl transition-shadow border-t-4 border-blue-500">
            <p className="text-gray-600 font-medium">Total Tickets</p>
            <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-12">
              {totalTickets}
            </h3>
          </Card>

          {/* Solved */}
          <Card className="bg-green-100 p-7 text-center hover:shadow-xl transition-shadow border-t-4 border-green-500">
            <p className="text-gray-600 font-medium">Total Solved</p>
            <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-12">
              {totalSolved}
            </h3>
          </Card>

          {/* Awaiting Approval */}
          <Card className="bg-red-100 p-7 text-center hover:shadow-xl transition-shadow border-t-4 border-red-500">
            <p className="text-gray-600 font-medium">Total Awaiting Approval</p>
            <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-12">
              {totalAwaiting}
            </h3>
          </Card>

          {/* In Progress */}
          <Card className="bg-yellow-100 p-7 text-center hover:shadow-xl transition-shadow border-t-4 border-yellow-300">
            <p className="text-gray-600 font-medium">Total In Progress</p>
            <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-12">
              {totalInProgress}
            </h3>
          </Card>
        </div>
      </div>
    </div>
  );
}
