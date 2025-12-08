import { useState } from "react"
import { History, X } from "lucide-react"
import TicketActivities from "./TicketActivities"
import { Button } from "@/components/ui/button"

export default function ActivityDrawer({ activities }: { activities: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* History Icon Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="View activity history"
        aria-label="View activity history"
        variant="ghost"
      >
        <History className="w-5 h-5 text-gray-600" />
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setIsOpen(false)} />}

      {/* Drawer */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-100 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Activity History</h2>
          <Button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close drawer"
            variant={"ghost"}
            >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 pr-0">
          <TicketActivities activities={activities} />
        </div>
      </div>
    </>
  )
}
