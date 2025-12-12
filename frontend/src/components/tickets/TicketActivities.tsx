import { useState } from "react"
import type { Activity } from "@/types"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "../ui/scroll-area"

function ExpandableJson({ data }: { data: any }) {
  const [expanded, setExpanded] = useState(false)
  const jsonString = JSON.stringify(data, null, 2)
  const isLong = jsonString.length > 120
  return (
    <div className="bg-white p-2 rounded border">
      {isLong && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-purple-600 mb-1 px-2 py-1 h-auto"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Collapse" : "Expand"} JSON
        </Button>
      )}
      <div
        className="overflow-auto max-h-64 text-xs font-mono"
        style={{ whiteSpace: "pre" }}
      >
        {expanded || !isLong ? (
          <code>{jsonString}</code>
        ) : (
          <code>
            {jsonString.slice(0, 120)}{isLong ? "..." : ""}
          </code>
        )}
      </div>
    </div>
  )
}

export default function TicketActivities({ activities }: { activities: any }) {
  if (activities.isLoading) return <div>Loading activities...</div>

  return (
    <ScrollArea className='h-[calc(100vh-11rem)]'>
    
    <div className="space-y-4 pr-4">
      {activities.data?.map((a: Activity) => (
        <div key={a.id} className="border rounded p-3 bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">{a.action}</p>
              <p className="text-xs">
                by: {a.user?.first_name} {a.user?.last_name}
              </p>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(a.created_at).toLocaleString()}
            </p>
          </div>

          {a.metadata && <ExpandableJson data={a.metadata} />}
        </div>
      ))}
    </div>

    </ScrollArea>
  )
}
