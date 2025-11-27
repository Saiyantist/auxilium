import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Check,
  X,
} from 'lucide-react';
import { useTickets, type Priority, type Ticket } from '@/contexts/TicketContext';

export default function Approval() {
  const { tickets, updateTicket } = useTickets();
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalType, setModalType] = useState<'details' | 'assign' | 'confirm' | null>(null); // Added 'confirm' to union type
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null); // Added state for confirm action type

  // Filter to pending tickets first
  const pendingTickets = tickets.filter((ticket: Ticket) => ticket.status === 'pending');

  // Then filter by ticket number
  const filteredTickets = pendingTickets.filter((ticket: Ticket) =>
    ticket.number.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setModalType('details');
  };

  const handleApproveClick = (ticket: Ticket) => { // Renamed to handleApproveClick and updated to open confirm modal
    setSelectedTicket(ticket);
    setConfirmAction('approve');
    setModalType('confirm');
  };

  const handleRejectClick = (ticket: Ticket) => { // Renamed to handleRejectClick and updated to open confirm modal
    setSelectedTicket(ticket);
    setConfirmAction('reject');
    setModalType('confirm');
  };

  const handleConfirmAction = () => { // Added handler for confirming the action in the modal
    if (selectedTicket && confirmAction) {
      updateTicket(selectedTicket.id, { status: confirmAction === 'approve' ? 'approved' : 'rejected' });
      handleCloseModal();
    }
  };

  const handleAssign = (ticketId: number) => {
    const ticket = pendingTickets.find((t: Ticket) => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setModalType('assign');
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTicket(null);
    setAssigneeId('');
    setConfirmAction(null); // Reset confirm action on close
  };

  const handleSubmitAssign = () => {
    if (selectedTicket && assigneeId) {
      updateTicket(selectedTicket.id, { assignee_id: Number(assigneeId) });
      handleCloseModal();
    }
  };

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600 font-semibold';
      case 'Low':
        return 'text-green-600 font-semibold';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Ticket Approval</h1>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={entriesPerPage}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">Entries</span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find ticket..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Ticket No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Assign to
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTickets.map((ticket: Ticket, index: number) => (
                  <tr
                    key={ticket.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 underline cursor-pointer hover:text-teal-600"
                      onClick={() => handleViewTicket(ticket)}
                    >
                      {ticket.number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.category}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveClick(ticket)} // Updated to handleApproveClick with ticket param
                          className="p-1.5 hover:bg-green-100 rounded transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleRejectClick(ticket)} // Updated to handleRejectClick with ticket param
                          className="p-1.5 hover:bg-red-100 rounded transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleAssign(ticket.id)}
                        className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors flex items-center gap-2"
                      >
                        <span>⋮</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredTickets.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} entries
              {searchQuery && (
                <span className="ml-1">
                  (filtered from {pendingTickets.length} pending entries)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="First page"
              >
                <ChevronsLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <span className="px-3 py-1 text-sm text-gray-700">
                {currentPage}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next page"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Last page"
              >
                <ChevronsRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalType && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'details' ? 'Ticket Details' : modalType === 'assign' ? 'Assign Ticket' : 'Confirm Action'}
            </h2>
            {modalType === 'details' ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedTicket.id}</p>
                <p><strong>Number:</strong> {selectedTicket.number || 'N/A'}</p>
                <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                <p><strong>Description:</strong> {selectedTicket.description || 'N/A'}</p>
                <p><strong>Status:</strong> {selectedTicket.status || 'N/A'}</p>
                <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                <p><strong>Severity:</strong> {selectedTicket.severity || 'N/A'}</p>
                <p><strong>Ticket Type:</strong> {selectedTicket.type || 'N/A'}</p>
                <p><strong>Category:</strong> {selectedTicket.category || 'N/A'}</p>
                <p><strong>Category ID:</strong> {selectedTicket.category_id || 'N/A'}</p>
                <p><strong>Project ID:</strong> {selectedTicket.project_id || 'N/A'}</p>
                <p><strong>Creator ID:</strong> {selectedTicket.creator_id || 'N/A'}</p>
                <p><strong>Assignee ID:</strong> {selectedTicket.assignee_id || 'N/A'}</p>
                <p><strong>Due Date:</strong> {selectedTicket.due_date || 'N/A'}</p>
                <p><strong>Closed At:</strong> {selectedTicket.closed_at || 'N/A'}</p>
                <p><strong>Created At:</strong> {selectedTicket.created_at || selectedTicket.date}</p>
                <p><strong>Updated At:</strong> {selectedTicket.updated_at || 'N/A'}</p>
              </div>
            ) : modalType === 'assign' ? (
              <div className="space-y-4">
                <p><strong>Ticket:</strong> {selectedTicket.subject} ({selectedTicket.number})</p>
                <input
                  type="number"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  placeholder="Enter assignee ID"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleSubmitAssign}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                >
                  Assign
                </button>
              </div>
            ) : modalType === 'confirm' && confirmAction ? ( // Added confirm modal content
              <div className="space-y-4">
                <p>
                  Are you sure you want to {confirmAction} the ticket "{selectedTicket.subject}" ({selectedTicket.number})?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleConfirmAction}
                    className={`px-4 py-2 rounded text-white transition-colors ${
                      confirmAction === 'approve'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
            {modalType !== 'confirm' && ( // Conditionally render close button only for non-confirm modals
              <button
                onClick={handleCloseModal}
                className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}