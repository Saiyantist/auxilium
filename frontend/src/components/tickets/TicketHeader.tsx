import { Badge } from "@/components/ui/badge"
import type { Ticket } from "@/types"
import { getBadgeProps } from "@/utils/badge";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TicketHeader({ ticket }: { ticket: Ticket }) {
  const navigate = useNavigate();
  const { label: statusLabel, className: statusClass, variant: statusVariant } = getBadgeProps('status', ticket.status);
  const { label: priorityLabel, className: priorityClass, variant: priorityVariant } = getBadgeProps('priority', ticket.priority);
  const { label: severityLabel, className: severityClass, variant: severityVariant } = getBadgeProps('severity', ticket.severity);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="cursor-pointer rounded-full hover:bg-accent p-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={32} />
        </div>
        <Badge variant="outline">{ticket.number}</Badge>
        <h1 className="text-3xl font-semibold flex items-center gap-3">
          {ticket.subject}
        </h1>
        <Badge variant={statusVariant} className={statusClass}>{statusLabel}</Badge>
      </div>

      <div className="flex items-center gap-3 ml-12">
        <Badge variant={priorityVariant} className={priorityClass}>Priority: {priorityLabel}</Badge>
        <Badge variant={severityVariant} className={severityClass}>Severity: {severityLabel}</Badge>
        <p className="text-sm text-gray-500">Created at {new Date(ticket.created_at).toLocaleString()}</p>
      </div>
    </div>
  )
}
