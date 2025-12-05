import { useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Check,
  X,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { useTickets, type Priority } from '@/contexts/TicketContext';

// Static mock assignees (for demo)
const MOCK_ASSIGNEES = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Williams',
  'David Brown',
  'Eve Davis',
  'Frank Miller',
  'Grace Wilson',
  'Henry Moore',
];

export default function Approval() {
  const { tickets, approveTicket, rejectTicket } = useTickets();

  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal & confirmation state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    ticketId?: number;
    action: 'approve' | 'reject' | null;
  }>({ isOpen: false, action: null });

  const [assignModal, setAssignModal] = useState<{
    isOpen: boolean;
    ticketId?: number;
  }>({ isOpen: false });

  const [selectedAssignee, setSelectedAssignee] = useState<string>('');

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) =>
    ticket.id.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  // Pagination helpers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Confirmation handlers
  const openConfirm = useCallback((ticketId: number, action: 'approve' | 'reject') => {
    setConfirmModal({ isOpen: true, ticketId, action });
  }, []);

  const closeConfirm = () => setConfirmModal({ isOpen: false, action: null, ticketId: undefined });

  const confirmAction = () => {
    if (!confirmModal.ticketId || !confirmModal.action) return;

    if (confirmModal.action === 'approve') {
      approveTicket?.(confirmModal.ticketId);
      console.log('Approved ticket:', confirmModal.ticketId);
    } else if (confirmModal.action === 'reject') {
      rejectTicket?.(confirmModal.ticketId); // This could just mark as deleted/soft-delete
      console.log('Rejected (soft-deleted) ticket:', confirmModal.ticketId);
    }
    closeConfirm();
  };

  // Assign modal handlers
  const openAssign = (ticketId: number) => {
    setSelectedAssignee(MOCK_ASSIGNEES[0]); // default selection
    setAssignModal({ isOpen: true, ticketId });
  };

  const closeAssign = () => {
    setAssignModal({ isOpen: false, ticketId: undefined });
    setSelectedAssignee('');
  };

  const confirmAssign = () => {
    if (assignModal.ticketId && selectedAssignee) {
      console.log(`Assigned ticket ${assignModal.ticketId} to ${selectedAssignee}`);
      // TODO: Call context or API to assign
    }
    closeAssign();
  };

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600 font-semibold';
      case 'Low':
        return 'text-green-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Ticket Approval</h1>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-gray-100 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">Entries</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ticket number..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Assign To
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No tickets found.
                    </td>
                  </tr>
                ) : (
                  currentTickets.map((ticket, index) => (
                    <tr
                      key={ticket.id}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600 underline cursor-pointer hover:text-teal-800">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{ticket.subject}</td>
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
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openConfirm(ticket.id, 'approve')}
                            className="p-2 hover:bg-green-100 rounded-full transition-colors"
                            title="Approve Ticket"
                          >
                            <Check className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => openConfirm(ticket.id, 'reject')}
                            className="p-2 hover:bg-red-100 rounded-full transition-colors"
                            title="Reject Ticket (Soft Delete)"
                          >
                            <X className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => openAssign(ticket.id)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <UserCheck className="w-4 h-4" />
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-4">
            <div className="text-sm text-gray-600">
              Showing {filteredTickets.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} entries
              {searchQuery && ` (filtered from ${tickets.length})`}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={goToFirstPage} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button onClick={goToPrevPage} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={goToLastPage} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50">
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 text-yellow-600 mb-4">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="text-lg font-semibold">
                {confirmModal.action === 'approve' ? 'Approve' : 'Reject'} Ticket #{confirmModal.ticketId}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to <strong>{confirmModal.action === 'approve' ? 'approve' : 'reject'}</strong> this ticket?
              {confirmModal.action === 'reject' && <span className="block text-sm text-orange-600 mt-2">This will soft-delete the ticket.</span>}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  confirmModal.action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {confirmModal.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Assign Ticket #{assignModal.ticketId}
            </h3>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Assignee
              </label>
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {MOCK_ASSIGNEES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeAssign}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                disabled={!selectedAssignee}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}