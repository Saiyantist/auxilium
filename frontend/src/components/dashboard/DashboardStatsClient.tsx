import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardStatsClient({ stats }: { stats: any }) {
  const closed = stats.closed + stats.resolved;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Open Tickets</CardTitle>
          <CardDescription>Waiting for Agent</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.open}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Tickets</CardTitle>
          <CardDescription>Waiting for your reply</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>On hold</CardTitle>
          <CardDescription>Waiting for response</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.on_hold}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resolved</CardTitle>
          <CardDescription>Issue resolved</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{closed}</p>
        </CardContent>
      </Card>
    </div>
  );
}
