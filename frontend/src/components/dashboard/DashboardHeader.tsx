import { Button } from "@/components/ui/button";
import { isAgent, isClient } from '@/utils/role';
import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ role }: { role: string | undefined }) {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        {role && isClient(role) && (
          <>
            <h1 className="text-3xl font-semibold">
              My Support Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of your tickets and recent activity.
            </p>
          </>  
        )}
        {role && isAgent(role) && (
          <>
            <h1 className="text-3xl font-semibold">
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of your assigned tickets and recent activity.
            </p>
          </>  
        )}
      </div>

      {/* Client sees Create Ticket */}
      {role && isClient(role) && (
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate("/new-ticket")}>
          Create Ticket
        </Button>
      )}
    </div>
  );
}
