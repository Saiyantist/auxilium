import { Card } from "@/components/ui/card";
import { useTickets } from "@/contexts/TicketContext";
import { Ticket, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, UserCheck, Star } from "lucide-react";
import performanceImage from "@/assets/performance.png";

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

  // Calculate user and agent counts (mock data)
  const totalUsers = 7;
  const totalAgents = 8; // Mock agent count
  const activeAgents = 6; // Mock active agents

  // Mock agent data for display
  const mockAgentInitials = ['JL', 'RP', 'JA', 'TT', 'BP', 'MB', 'ST', 'PM'];

  // Calculate average rating (mock data)
  const averageRating = 4.5;
  const totalFeedbacks = 127;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Overview of your helpdesk performance and metrics</p>
        </div>

        {/* Ticket Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Tickets */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-gray-400">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-black mb-1">Total Tickets</p>
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
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-gray-400">
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
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-gray-400">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-black mb-1">Awaiting Approval</p>
                <h3 className="text-3xl font-bold text-gray-900">{totalAwaiting}</h3>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-red-600 font-medium">
              Requires attention
            </div>
          </Card>

          {/* In Progress */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-gray-400">
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

          {/* Team Overview */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Overview</h3>
            
            {/* Users */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
              </div>
            </div>

            {/* Agents */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Support Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAgents}</p>
                </div>
              </div>
            </div>

            {/* Active Agents */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Active Now</p>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {activeAgents} online
                </span>
              </div>
              <div className="flex -space-x-2">
                {mockAgentInitials.slice(0, 5).map((initials, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    title={`Agent ${initials}`}
                  >
                    {initials}
                  </div>
                ))}
                {mockAgentInitials.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-semibold">
                    +{mockAgentInitials.length - 5}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Customer Feedback */}
        <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-4 bg-yellow-100 rounded-lg">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction</h3>
                <p className="text-sm text-gray-600">Based on {totalFeedbacks} recent feedbacks</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center gap-2 justify-center md:justify-end mb-2">
                <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.floor(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">+0.3</span> this month
                </span>
              </div>
            </div>
          </div>
          
          {/* Rating Breakdown */}
          <div className="mt-6 grid grid-cols-5 gap-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
              return (
                <div key={rating} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">{rating}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-1 block">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}