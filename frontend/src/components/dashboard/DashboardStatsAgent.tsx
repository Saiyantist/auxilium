import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardStatsAgent({ stats }: { stats: any }) {
  const closed = stats.closed + stats.resolved
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-blue-700">Assigned Tickets</CardTitle>
          <CardDescription>Waiting for you</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-700">{stats.open}</p>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-amber-700">Pending Tickets</CardTitle>
          <CardDescription>Waiting for your client</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-amber-700">{stats.pending}</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="text-slate-700">On hold</CardTitle>
          <CardDescription>Waiting for internal/dev team</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-slate-700">{stats.on_hold}</p>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-emerald-700">Resolved</CardTitle>
          <CardDescription>Issue resolved</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-emerald-700">{closed}</p>
        </CardContent>
      </Card>
    </div>
  )
}
