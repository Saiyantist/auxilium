"use client"

import { useParams } from "react-router-dom";
import { useTicket, useTicketActivities } from "@/hooks/useTickets";
import { useTicketComments } from "@/hooks/useComments";

import TicketHeader from "@/components/tickets/TicketHeader";
import TicketDetailsSection from "@/components/tickets/TicketDetailsSection";
import ActivityDrawer from "@/components/tickets/ActivityDrawer";

export default function TicketDetailPage() {
  const { id } = useParams()
  const ticketId = Number(id)

  const ticket = useTicket(ticketId)
  const comments = useTicketComments(ticketId)
  const activities = useTicketActivities(ticketId)

  if (ticket.isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading ticket...</p>
        </div>
      </div>
    )
  }

  if (!ticket.data) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <h1>404</h1>
          <p className="text-gray-600 text-lg">Ticket not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header Bar with History Icon */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <TicketHeader ticket={ticket.data} />
          </div>
          <div className="-mt-10 mr-20">
            <ActivityDrawer activities={activities} />

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <TicketDetailsSection ticket={ticket.data} comments={comments} />
      </div>
    </div>
  )
}