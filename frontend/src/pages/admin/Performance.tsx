import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useTickets } from "@/contexts/TicketContext";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  // Users,
  Activity,
  Calendar,
  BarChart3,
  Target,
  Zap,
  MessageSquare,
  UserCheck
} from "lucide-react";

export default function Performance() {
  const { tickets } = useTickets();
  const [timeRange, setTimeRange] = useState('7days');

  // Filter active tickets once to avoid redundant computations
  const activeTickets = tickets.filter(t => !t.isDeleted);
  
  // Calculate metrics based on active tickets
  const totalTickets = activeTickets.length;
  const resolvedTickets = activeTickets.filter(t => t.status === 'Closed').length; // Changed 'Resolved' to 'Closed' to match Status type
  // const inProgressTickets = activeTickets.filter(t => t.status === 'In Progress').length;
  // const pendingTickets = activeTickets.filter(t => t.status === 'Pending Approval' || t.status === 'On Hold').length; // Fixed 'Awaiting Approval' to 'Pending Approval'

  // Mock performance data
  const performanceData = {
    avgResponseTime: 2.3,
    avgResolutionTime: 8.5,
    firstResponseTime: 1.1,
    customerSatisfaction: 4.6,
    resolutionRate: totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0,
    reopenRate: 2.4,
  };

  // Mock weekly data for charts
  const weeklyData = [
    { day: 'Mon', tickets: 12, resolved: 10, avgTime: 7.2 },
    { day: 'Tue', tickets: 15, resolved: 13, avgTime: 8.1 },
    { day: 'Wed', tickets: 18, resolved: 15, avgTime: 6.8 },
    { day: 'Thu', tickets: 14, resolved: 12, avgTime: 9.2 },
    { day: 'Fri', tickets: 16, resolved: 14, avgTime: 7.5 },
    { day: 'Sat', tickets: 8, resolved: 7, avgTime: 5.3 },
    { day: 'Sun', tickets: 6, resolved: 6, avgTime: 4.8 },
  ];

  // Agent performance data
  const agentPerformance = [
    { name: 'Jose Luis Vincent', tickets: 45, resolved: 42, avgTime: 6.2, satisfaction: 4.8 },
    { name: 'Ryan James Pancho', tickets: 38, resolved: 35, avgTime: 7.5, satisfaction: 4.5 },
    { name: 'Jerome Abad', tickets: 52, resolved: 48, avgTime: 5.8, satisfaction: 4.9 },
    { name: 'Tralalero Tralala', tickets: 28, resolved: 26, avgTime: 8.1, satisfaction: 4.3 },
    { name: 'Brr Brr Patapim', tickets: 41, resolved: 38, avgTime: 7.2, satisfaction: 4.6 },
  ];

  // Category breakdown
  const categoryData = [
    { name: 'Technical', count: 45, percentage: 35, color: 'bg-blue-500' },
    { name: 'Access', count: 32, percentage: 25, color: 'bg-purple-500' },
    { name: 'Feedback', count: 28, percentage: 22, color: 'bg-green-500' },
    { name: 'Billing', count: 23, percentage: 18, color: 'bg-orange-500' },
  ];

  const maxWeeklyTickets = Math.max(...weeklyData.map(d => d.tickets));

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Performance Analytics
            </h1>
            <p className="text-gray-600">Detailed insights into your support team's performance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Average Response Time */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Response Time</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.avgResponseTime}h</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">12% faster</span>
              <span className="text-gray-600 ml-1">than last period</span>
            </div>
          </Card>

          {/* Average Resolution Time */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Resolution Time</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.avgResolutionTime}h</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">8% faster</span>
              <span className="text-gray-600 ml-1">than last period</span>
            </div>
          </Card>

          {/* First Response Time */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">First Response Time</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.firstResponseTime}h</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">15% faster</span>
              <span className="text-gray-600 ml-1">than last period</span>
            </div>
          </Card>

          {/* Resolution Rate */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Resolution Rate</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.resolutionRate}%</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">+5%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Customer Satisfaction</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.customerSatisfaction}/5</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">+0.3</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </Card>

          {/* Reopen Rate */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-red-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Reopen Rate</p>
                <h3 className="text-3xl font-bold text-gray-900">{performanceData.reopenRate}%</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">-1.2%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Ticket Volume */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Weekly Ticket Volume</h3>
              </div>
            </div>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{day.day}</span>
                    <span className="text-sm text-gray-600">{day.tickets} tickets</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(day.tickets / maxWeeklyTickets) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(day.resolved / maxWeeklyTickets) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Total Tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Resolved</span>
              </div>
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Tickets by Category</h3>
              </div>
            </div>
            <div className="space-y-6">
              {categoryData.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{category.count}</span>
                      <span className="text-xs text-gray-600 ml-1">({category.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${category.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{categoryData.reduce((a, b) => a + b.count, 0)} tickets</span>
              </p>
            </div>
          </Card>
        </div>

        {/* Agent Performance Table */}
        <Card className="bg-white p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Top Agent Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Agent Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Tickets Handled
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Avg Time (hrs)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agentPerformance.map((agent, index) => {
                  const resolutionRate = Math.round((agent.resolved / agent.tickets) * 100);
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.tickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.resolved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.avgTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-900">{agent.satisfaction}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                resolutionRate >= 90
                                  ? 'bg-green-500'
                                  : resolutionRate >= 80
                                  ? 'bg-yellow-500'
                                  : 'bg-orange-500'
                              }`}
                              style={{ width: `${resolutionRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{resolutionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}