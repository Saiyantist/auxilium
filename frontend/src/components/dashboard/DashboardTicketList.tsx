"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { getBadgeProps } from "@/utils/badge"

export default function DashboardTicketList({ tickets }: { tickets: any }) {
  const navigate = useNavigate()

  return (
    <Card className="mt-6 border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
      <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 border-b border-purple-100 rounded-t-lg">
        <CardTitle className="text-white">Recent Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-purple-100">
          {tickets.map((t: any) => {
            const {
              label: statusLabel,
              className: statusClass,
              variant: statusVariant,
            } = getBadgeProps("status", t.status)
            return (
              <div
                key={t.id}
                className="py-3 flex justify-between items-center hover:bg-purple-100/50 cursor-pointer rounded-md px-2 transition-colors"
                onClick={() => navigate(`/tickets/${t.id}`)}
              >
                <div>
                  <div className="font-medium text-purple-800">{t.subject}</div>
                  <div className="text-sm text-violet-950">
                    {t.number} • {new Date(t.updated_at).toLocaleDateString()}
                  </div>
                </div>

                <Badge variant={statusVariant} className={statusClass}>
                  {statusLabel}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
