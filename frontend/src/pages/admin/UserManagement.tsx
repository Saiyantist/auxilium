import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Search } from 'lucide-react';
import agentImage from '@/assets/agent.png';
import userImage from '@/assets/user.png';

// Static mock users
interface User {
  id: number;
  name: string;
  role: string;
  department: string;
  email?: string;
  status?: string;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', role: 'User', department: 'IT', email: 'john.doe@company.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'User', department: 'HR', email: 'jane.smith@company.com', status: 'Active' },
  { id: 3, name: 'Bob Johnson', role: 'User', department: 'Finance', email: 'bob.johnson@company.com', status: 'Active' },
  { id: 4, name: 'Alice Williams', role: 'User', department: 'Operations', email: 'alice.williams@company.com', status: 'Inactive' },
  { id: 5, name: 'Charlie Brown', role: 'User', department: 'Marketing', email: 'charlie.brown@company.com', status: 'Active' },
  { id: 6, name: 'David Lee', role: 'User', department: 'Sales', email: 'david.lee@company.com', status: 'Active' },
  { id: 7, name: 'Eva Martinez', role: 'User', department: 'Engineering', email: 'eva.martinez@company.com', status: 'Active' },
];

// Static mock agents
interface Agent {
  id: number;
  name: string;
  role: string;
  email?: string;
  status?: string;
  ticketsAssigned?: number;
}

const MOCK_AGENTS: Agent[] = [
  { id: 1, name: 'Alice Johnson', role: 'Agent', email: 'alice.johnson@company.com', status: 'Active', ticketsAssigned: 12 },
  { id: 2, name: 'Bob Smith', role: 'Agent', email: 'bob.smith@company.com', status: 'Active', ticketsAssigned: 8 },
  { id: 3, name: 'Carol Williams', role: 'Agent', email: 'carol.williams@company.com', status: 'Active', ticketsAssigned: 15 },
  { id: 4, name: 'David Brown', role: 'Agent', email: 'david.brown@company.com', status: 'Inactive', ticketsAssigned: 0 },
  { id: 5, name: 'Eve Davis', role: 'Agent', email: 'eve.davis@company.com', status: 'Active', ticketsAssigned: 10 },
  { id: 6, name: 'Frank Miller', role: 'Agent', email: 'frank.miller@company.com', status: 'Active', ticketsAssigned: 7 },
  { id: 7, name: 'Grace Wilson', role: 'Agent', email: 'grace.wilson@company.com', status: 'Active', ticketsAssigned: 14 },
  { id: 8, name: 'Henry Moore', role: 'Agent', email: 'henry.moore@company.com', status: 'Active', ticketsAssigned: 9 },
];

export default function UserManagement() {
  const [viewMode, setViewMode] = useState<'cards' | 'userTable' | 'agentTable'>('cards');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search
  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter agents based on search
  const filteredAgents = MOCK_AGENTS.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cards View
  if (viewMode === 'cards') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">User Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* User Management Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-400 flex flex-col items-center rounded-xl transform hover:scale-105">
              <button
                onClick={() => setViewMode('userTable')}
                className="focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg transition-all bg-transparent"
                aria-label="View user list"
              >
                <div className="flex justify-center items-center w-full h-52 mb-4">
                  <img 
                    src={userImage} 
                    alt="User Management" 
                    className="w-52 h-52 object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all" 
                  />
                </div>
              </button>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">User Management</h3>
              <p className="text-gray-600 mb-6">Manage all regular users in the system</p>
              
              <button
                onClick={() => setViewMode('userTable')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                View
              </button>
            </Card>

            {/* Agent Users Card */}
            <Card className="bg-gradient-to-br from-red-50 to-pink-100 p-8 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-red-400 flex flex-col items-center rounded-xl transform hover:scale-105">
              <button
                onClick={() => setViewMode('agentTable')}
                className="focus:outline-none focus:ring-4 focus:ring-red-300 rounded-lg transition-all bg-transparent"
                aria-label="View agent list"
              >
                <div className="flex justify-center items-center w-full h-52 mb-4">
                  <img 
                    src={agentImage} 
                    alt="Agent Users" 
                    className="w-52 h-52 object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all" 
                  />
                </div>
              </button>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">Agent Users</h3>
              <p className="text-gray-600 mb-6">Manage support agents and assignments</p>
              
              <button
                onClick={() => setViewMode('agentTable')}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                View
              </button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // User Table View
  if (viewMode === 'userTable') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setViewMode('cards');
                    setSearchQuery('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {MOCK_USERS.length} users
                {searchQuery && <span className="ml-1">(filtered)</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agent Table View
  if (viewMode === 'agentTable') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setViewMode('cards');
                    setSearchQuery('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800">Agent Management</h1>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tickets Assigned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAgents.map((agent, index) => (
                    <tr key={agent.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {agent.ticketsAssigned} tickets
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          agent.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {filteredAgents.length} of {MOCK_AGENTS.length} agents
                {searchQuery && <span className="ml-1">(filtered)</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}