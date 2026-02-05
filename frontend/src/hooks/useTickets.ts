import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketActivities,
} from '@/services/tickets';
import type { Ticket } from '@/types';
import type { TicketUpdatePayload } from '@/services/tickets';

export const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });
};

export const useTicket = (ticketId: number) => {
  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicket(ticketId),
    enabled: !!ticketId,
  });
};

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
};

export const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TicketUpdatePayload }) =>
      updateTicket(id, payload),
    onSuccess: (_data: Ticket, variables: { id: number; payload: TicketUpdatePayload }) => {
      qc.invalidateQueries({ queryKey: ['ticket', variables.id] });
      qc.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useDeleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
};

export const useTicketActivities = (ticketId: number) =>
  useQuery({
    queryKey: ['ticketActivities', ticketId],
    queryFn: () => getTicketActivities(ticketId),
    enabled: !!ticketId,
  });
