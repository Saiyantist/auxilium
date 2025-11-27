// TicketContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

export type Priority = "Low" | "Medium" | "High";

export interface Ticket {
  id: number;
  number: string; // Added to match schema and usage in Approval component
  subject: string;
  status: string;
  supportBy: string;
  date: string;
  rate: number;
  name: string;
  department: string;
  description: string;
  category: string;
  type: string;
  priority: Priority;
  assignee_id: number | null; // Added to match schema and enable assignment
  // Optional schema fields added for completeness in details modal
  severity?: string;
  ticket_type?: string;
  category_id?: number;
  project_id?: number;
  creator_id?: number;
  due_date?: string | null;
  closed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "status" | "supportBy" | "rate" | "number" | "assignee_id">) => void;
  updateTicket: (id: number, updates: Partial<Ticket>) => void; // Added to enable updates like approval, rejection, and assignment
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1234,
      number: "TICKET-1234", // Added ticket number
      subject: "Login issue",
      status: "pending", // Changed to 'pending' to match approval logic
      supportBy: "Tech support",
      date: "13/08/21",
      rate: 0,
      name: "John Doe",
      department: "IT",
      description: "Cannot access system",
      category: "Technical",
      type: "Incident",
      priority: "High",
      assignee_id: null, // Added
      created_at: "2021-08-13T00:00:00Z", // Added for schema completeness
    },
    {
      id: 1124,
      number: "TICKET-1124", // Added ticket number
      subject: "New ticket submission request",
      status: "pending", // Changed to 'pending' to match approval logic
      supportBy: "Operation support",
      date: "14/08/21",
      rate: 0,
      name: "Jane Smith",
      department: "HR",
      description: "Need new ticket feature",
      category: "Feature",
      type: "Request",
      priority: "Medium",
      assignee_id: null, // Added
      created_at: "2021-08-14T00:00:00Z", // Added for schema completeness
    },
    {
      id: 1224,
      number: "TICKET-1224", // Added ticket number
      subject: "Access request",
      status: "Closed",
      supportBy: "Tech support",
      date: "13/08/21",
      rate: 4,
      name: "Bob Johnson",
      department: "Finance",
      description: "Need database access",
      category: "Access",
      type: "Request",
      priority: "Low",
      assignee_id: null, // Added
      created_at: "2021-08-13T00:00:00Z", // Added for schema completeness
    },
    {
      id: 1244,
      number: "TICKET-1244", // Added ticket number
      subject: "Ticket submission",
      status: "In Progress",
      supportBy: "Operation support",
      date: "14/08/21",
      rate: 0,
      name: "Alice Williams",
      department: "Operations",
      description: "Submit new ticket",
      category: "Technical",
      type: "Incident",
      priority: "High",
      assignee_id: null, // Added
      created_at: "2021-08-14T00:00:00Z", // Added for schema completeness
    },
    {
      id: 1114,
      number: "TICKET-1114", // Added ticket number
      subject: "Login issue",
      status: "In Progress",
      supportBy: "Tech support",
      date: "9/08/21",
      rate: 0,
      name: "Charlie Brown",
      department: "Marketing",
      description: "Password reset needed",
      category: "Technical",
      type: "Incident",
      priority: "Medium",
      assignee_id: null, // Added
      created_at: "2021-08-09T00:00:00Z", // Added for schema completeness
    },
  ]);

  const addTicket = (
    ticketData: Omit<Ticket, "id" | "status" | "supportBy" | "rate" | "number" | "assignee_id">
  ) => {
    const newId = Math.floor(1000 + Math.random() * 9000);
    const newTicket: Ticket = {
      id: newId,
      number: `TICKET-${newId}`, // Generate ticket number
      ...ticketData,
      status: "pending", // Default to 'pending' for new tickets in approval flow
      supportBy: "Tech support",
      rate: 0,
      assignee_id: null,
    };

    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicket = (id: number, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets(): TicketContextType {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}