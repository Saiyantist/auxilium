// src/contexts/TicketContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export type Priority = "Low" | "Medium" | "High";
export type Status = "In Progress" | "On Hold" | "Closed" | "Pending Approval"; // Consider adding "Resolved" if needed: | "Resolved"

export interface Ticket {
  id: number;
  subject: string;
  status: Status;
  supportBy: string;        // Assigned person/department
  date: string;
  rate: number;
  name: string;
  department: string;
  description: string;
  category: string;
  type: string;
  priority: Priority;
  isDeleted?: boolean;      // Soft delete flag
  assignee?: string;        // Optional: who the ticket is assigned to
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "status" | "supportBy" | "rate" | "isDeleted">) => void;
  approveTicket: (id: number) => void;
  rejectTicket: (id: number) => void;
  assignTicket: (id: number, assignee: string) => void;
  resolveTicket: (id: number) => void; // Added for completeness (sets to "Closed" or "Resolved" if type updated)
  // Optional: restore deleted ticket later
  restoreTicket?: (id: number) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1234,
      subject: "Login issue",
      status: "Pending Approval",
      supportBy: "Unassigned",
      date: "13/08/21",
      rate: 0,
      name: "John Doe",
      department: "IT",
      description: "Cannot access system",
      category: "Technical",
      type: "Incident",
      priority: "High",
    },
    {
      id: 1124,
      subject: "New ticket submission request",
      status: "Pending Approval",
      supportBy: "Unassigned",
      date: "14/08/21",
      rate: 0,
      name: "Jane Smith",
      department: "HR",
      description: "Need new ticket feature",
      category: "Feature",
      type: "Request",
      priority: "Medium",
    },
    {
      id: 1224,
      subject: "Access request",
      status: "Pending Approval",
      supportBy: "Unassigned",
      date: "13/08/21",
      rate: 0,
      name: "Bob Johnson",
      department: "Finance",
      description: "Need database access",
      category: "Access",
      type: "Request",
      priority: "Low",
    },
    {
      id: 1244,
      subject: "Ticket submission",
      status: "Pending Approval",
      supportBy: "Unassigned",
      date: "14/08/21",
      rate: 0,
      name: "Alice Williams",
      department: "Operations",
      description: "Submit new ticket",
      category: "Technical",
      type: "Incident",
      priority: "High",
    },
    {
      id: 1114,
      subject: "Login issue",
      status: "Pending Approval",
      supportBy: "Unassigned",
      date: "9/08/21",
      rate: 0,
      name: "Charlie Brown",
      department: "Marketing",
      description: "Password reset needed",
      category: "Technical",
      type: "Incident",
      priority: "Medium",
    },
  ]);

  const addTicket = (
    ticketData: Omit<Ticket, "id" | "status" | "supportBy" | "rate" | "isDeleted">
  ) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Math.floor(1000 + Math.random() * 9000),
      status: "Pending Approval",
      supportBy: "Unassigned",
      rate: 0,
      isDeleted: false,
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const approveTicket = (id: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "In Progress" as Status, supportBy: "Tech Support" }
          : t
      )
    );
  };

  const rejectTicket = (id: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isDeleted: true, status: "Closed" as Status } : t
      )
    );
  };

  const assignTicket = (id: number, assignee: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, supportBy: assignee, assignee, status: "In Progress" as Status }
          : t
      )
    );
  };

  // Added: Resolve a ticket (update Status type to include "Resolved" if distinct from "Closed")
  const resolveTicket = (id: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Closed" as Status } : t // Or "Resolved" if added to type
      )
    );
  };

  // Optional: restore a soft-deleted ticket
  const restoreTicket = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDeleted: false } : t))
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        approveTicket,
        rejectTicket,
        assignTicket,
        resolveTicket,
        restoreTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets(): TicketContextType {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}