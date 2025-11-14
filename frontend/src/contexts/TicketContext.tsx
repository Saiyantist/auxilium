// TicketContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Ticket {
  id: number;
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
  priority: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'supportBy' | 'rate'>) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1234,
      subject: "Login issue",
      status: "In Progress",
      supportBy: "Tech support",
      date: "13/08/21",
      rate: 0,
      name: "John Doe",
      department: "IT",
      description: "Cannot access system",
      category: "Technical",
      type: "Incident",
      priority: "High"
    },
    {
      id: 1124,
      subject: "New ticket submission request",
      status: "On Hold",
      supportBy: "Operation support",
      date: "14/08/21",
      rate: 0,
      name: "Jane Smith",
      department: "HR",
      description: "Need new ticket feature",
      category: "Feature",
      type: "Request",
      priority: "Medium"
    },
    {
      id: 1224,
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
      priority: "Low"
    },
    {
      id: 1244,
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
      priority: "High"
    },
    {
      id: 1114,
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
      priority: "Medium"
    }
  ]);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'status' | 'supportBy' | 'rate'>) => {
    const newTicket: Ticket = {
      id: Math.floor(1000 + Math.random() * 9000),
      ...ticketData,
      status: "In Progress",
      supportBy: "Tech support",
      rate: 0,
    };
    
    setTickets(prev => [newTicket, ...prev]);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}