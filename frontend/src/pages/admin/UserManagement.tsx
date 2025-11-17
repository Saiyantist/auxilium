import agentImage from '@/assets/agent.png';
import userImage from '@/assets/user.png';
import { Card } from '@/components/ui/card';

export default function UserManagement() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Performance Card */}
      <Card className="bg-indigo-100 p-1 text-center hover:shadow-xl transition-shadow border-t-4 border-blue-300 flex flex-col items-center">
        <div className="flex justify-center items-center w-full h-52">
          <img src={userImage} alt="User Image" className="w-52 h-52 object-contain" />
        </div>
        <h3 className="text-3xl font-semibold mb-3 text-gray-800 mt-2">
          User Management
        </h3>
      </Card>

      {/* Performance Card */}
      <Card className="bg-red-100 p-1 text-center hover:shadow-xl transition-shadow border-t-4 border-red-300 flex flex-col items-center">
        <div className="flex justify-center items-center w-full h-52">
          <img src={agentImage} alt="User Image" className="w-52 h-52 object-contain" />
        </div>
        <h3 className="text-3xl font-semibold mb-3 text-gray-800 mt-2">Agent Users</h3>
      </Card>
    </div>
  );
}
