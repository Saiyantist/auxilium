import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTicketComments,
  addTicketComment,
  updateTicketComment,
  deleteTicketComment,
} from "@/services/comments";

export const useTicketComments = (ticketId: number) =>
  useQuery({
    queryKey: ["ticketComments", ticketId],
    queryFn: () => getTicketComments(ticketId),
    enabled: !!ticketId,
  });

export const useAddComment = (ticketId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { content: string; internal?: boolean }) =>
      addTicketComment(ticketId, payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["ticketComments", ticketId] }),
  });
};

export const useUpdateComment = (ticketId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      payload,
    }: {
      commentId: number;
      payload: { content: string; internal?: boolean };
    }) => updateTicketComment(ticketId, commentId, payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["ticketComments", ticketId] }),
  });
};

export const useDeleteComment = (ticketId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) =>
      deleteTicketComment(ticketId, commentId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["ticketComments", ticketId] }),
  });
};
