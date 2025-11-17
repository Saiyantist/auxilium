import { Card } from "@/components/ui/card";
import { useTickets } from "@/contexts/TicketContext";
import performanceImage from "@/assets/performance.png";
import agentImage from "@/assets/agent.png";
import userImage from "@/assets/user.png";


export default function AdminDashboard() {
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
        Admin Dashboard
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
  {/* Performance Card */}
  <Card className="bg-rose-100 p-1 text-center hover:shadow-xl transition-shadow border-t-4 border-red-300 flex flex-col items-center">
    <div className="flex justify-center items-center w-full h-52">
      <img
        src={performanceImage}
        alt="Performance graph"
        className="w-52 h-52 object-contain"
      />
    </div>
    <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-2">Performance</h3>
  </Card>

  {/* User & Agent Card */}
  <Card className="bg-sky-100 p-7 hover:shadow-xl transition-shadow border-t-4 border-blue-300">
    <div className="grid grid-cols-2 gap-8 text-center">
      {/* Users */}
      <div className="flex flex-col items-center">
        <img
          src={userImage}
          alt="User icon"
          className="w-40 h-40 mb-3 object-contain"
        />
        <span className="text-3xl font-bold text-gray-800">0</span>
        <span className="text-sm font-medium text-gray-600 mt-1">Users</span>
      </div>

      {/* Agent Team */}
      <div className="flex flex-col items-center">
        <img
          src={agentImage}
          alt="Agent team icon"
          className="w-40 h-40 mb-3 object-contain"
        />
        <span className="text-3xl font-bold text-gray-800">0</span>
        <span className="text-sm font-medium text-gray-600 mt-1">
          Agent Team
        </span>
      </div>
    </div>
  </Card>
</div>

      <div className="my-12">
        {/* Future Metrics Card */}
        <Card className="bg-yellow-100 p-7 text-center hover:shadow-xl transition-shadow border-t-4 border-yellow-300 flex flex-col justify-center">
          <p className="text-gray-600 font-medium text-3xl">Customer Feedbacks</p>
            <h3 className="text-5xl font-semibold mb-3 text-gray-800 mt-12">
            ⭐⭐⭐⭐⭐
            </h3>
        </Card>
      </div>
    </div>
  );
}
