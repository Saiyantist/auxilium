import api from './api';
import type { Comment } from '@/types';

export const getTicketComments = async (ticketId: number) => {
  const { data } = await api.get<Comment[]>(`/tickets/${ticketId}/comments`);
  return data;
};

export const addTicketComment = async (
  ticketId: number,
  payload: { content: string; internal?: boolean }
) => {
  const { data } = await api.post<Comment>(
    `/tickets/${ticketId}/comments`,
    payload
  );
  return data;
};

export const updateTicketComment = async (
  ticketId: number,
  commentId: number,
  payload: { content: string; internal?: boolean }
) => {
  const { data } = await api.put<Comment>(
    `/tickets/${ticketId}/comments/${commentId}`,
    payload
  );
  return data;
};

export const deleteTicketComment = async (ticketId: number, commentId: number) => {
  await api.delete(`/tickets/${ticketId}/comments/${commentId}`);
  return true;
};