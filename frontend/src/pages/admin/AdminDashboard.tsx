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
    <div className="min-h-screen bg-gradient-to-br p-10">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="py-10">
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {/* Total Tickets */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tickets</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalTickets}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">12%</span>
              <span className="ml-1">vs last month</span>
            </div>
          </Card>

          {/* Solved */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Solved Tickets</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalSolved}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <span className="text-green-600 font-medium">
                {totalTickets > 0 ? Math.round((totalSolved / totalTickets) * 100) : 0}%
              </span>
              <span className="ml-1">resolution rate</span>
            </div>
          </Card>

          {/* Awaiting Approval */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Awaiting Approval</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalAwaiting}</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-600 font-medium">
              Requires attention
            </div>
          </Card>

          {/* In Progress */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalInProgress}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Active tickets being worked on
            </div>
          </Card>
        </div>

        {/* Middle Section - Performance & Team */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <img
                src={performanceImage}
                alt="Performance graph"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg. Response</p>
                <p className="text-lg font-semibold text-gray-900">2.5h</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg. Resolution</p>
                <p className="text-lg font-semibold text-gray-900">8.2h</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">First Response</p>
                <p className="text-lg font-semibold text-gray-900">1.2h</p>
              </div>
            </div>
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
