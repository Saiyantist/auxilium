import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function DashboardTicketList({ tickets }: { tickets: any }) {
  const navigate = useNavigate();
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {tickets.map((t: any) => (
            <div
              key={t.id}
              className="py-3 flex justify-between items-center hover:bg-muted/50 cursor-pointer"
              onClick={() => navigate(`/tickets/${t.id}`)}
            >
              <div>
                <div className="font-medium">{t.subject}</div>
                <div className="text-sm text-muted-foreground">
                  {t.number} • {new Date(t.updated_at).toLocaleDateString()}
                </div>
              </div>

              <Badge variant="secondary">{t.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
