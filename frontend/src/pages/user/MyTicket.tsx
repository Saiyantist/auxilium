// MyTicket.tsx (src/pages/user/MyTicket.tsx)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTickets } from "@/components/shared/TicketContext";

// Ticket Detail Modal
function TicketDetailModal({ ticket, open, onClose }: any) {
  if (!ticket) return null;

  const renderStars = (rate: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rate ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Ticket Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-semibold text-gray-700">Ticket No:</span>
            <span className="text-gray-600">{ticket.id}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-600">{ticket.date}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-600">{ticket.name}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-semibold text-gray-700">Dept:</span>
            <span className="text-gray-600">{ticket.department}</span>
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Title:</span>
              <span className="text-gray-600">{ticket.subject}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Description:</span>
              <span className="text-gray-600">{ticket.description}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="text-gray-600">{ticket.category}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Type:</span>
              <span className="text-gray-600">{ticket.type}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Priority:</span>
              <span className="text-gray-600">{ticket.priority}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className="text-gray-600">{ticket.status}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <span className="font-semibold text-gray-700">Rate:</span>
              <div>{renderStars(ticket.rate)}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <Button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MyTicket() {
  const navigate = useNavigate();
  const { tickets } = useTickets();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredTickets = tickets.filter((ticket: any) =>
    ticket.id.toString().includes(searchTerm) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedTickets = filteredTickets.slice(startIndex, startIndex + entriesPerPage);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "In Progress": "bg-yellow-400 hover:bg-yellow-600",
      "On Hold": "bg-blue-500 hover:bg-blue-600",
      "Closed": "bg-gray-500 hover:bg-gray-600",
      "Resolved": "bg-emerald-500 hover:bg-emerald-600"
    };
    return variants[status] || "bg-gray-500";
  };

  const renderStars = (rate: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rate ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-2xl font-bold text-gray-800">List of Ticket</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Find ticket"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show</span>
                  <Select
                    value={entriesPerPage.toString()}
                    onValueChange={(value) => setEntriesPerPage(Number(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-600">Entries</span>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ticket No</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Support by</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {displayedTickets.map((ticket: any) => (
                        <tr
                          key={ticket.id}
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleTicketClick(ticket)}
                        >
                          <td className="px-4 py-3 text-sm text-blue-600 font-medium">{ticket.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{ticket.subject}</td>
                          <td className="px-4 py-3">
                            <Badge className={`${getStatusBadge(ticket.status)} text-white`}>
                              {ticket.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{ticket.supportBy}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{ticket.date}</td>
                          <td className="px-4 py-3">{renderStars(ticket.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredTickets.length)} of {filteredTickets.length} entries
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-sm text-gray-600">
                    {currentPage} / {totalPages || 1}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating New Ticket Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={() => navigate("/new-ticket")}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-6 rounded-full"
          >
            + New Ticket
          </Button>
        </div>
      </div>
      
      <TicketDetailModal
        ticket={selectedTicket}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}