import api from './api';
import type { Ticket, Activity } from '@/types';

export const getTickets = async () => {
  const { data } = await api.get<Ticket[]>("/tickets");
  return data;
};

export const getTicket = async (ticketId: number) => {
  const { data } = await api.get<Ticket>(`/tickets/${ticketId}`);
  return data;
};

export const createTicket = async (payload: Partial<Ticket>) => {
  const { data } = await api.post<Ticket>("/tickets", payload);
  return data;
};

export const updateTicket = async (ticketId: number, payload: Partial<Ticket>) => {
  const { data } = await api.put<Ticket>(`/tickets/${ticketId}`, payload);
  return data;
};

export const deleteTicket = async (ticketId: number) => {
  await api.delete(`/tickets/${ticketId}`);
  return true;
};


//
// ─── ACTIVITIES ──────────────────────────────────────────
//

export const getTicketActivities = async (ticketId: number) => {
  const { data } = await api.get<Activity[]>(
    `/tickets/${ticketId}/activities`
  );
  return data;
};

