'use client';

import { useState } from 'react';
import type { Comment, Ticket } from '@/types';
import { useAddComment, useDeleteComment, useUpdateComment } from '@/hooks/useComments';
import { useUpdateTicket } from '@/hooks/useTickets';
import { useAssignableUsers } from '@/hooks/useUsers';
import { useAuth } from '@/hooks/use-auth';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { MoreHorizontal, Calendar as CalendarIcon } from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'pending', label: 'Pending' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const SEVERITY_OPTIONS = [
  { value: 'minor', label: 'Minor' },
  { value: 'major', label: 'Major' },
  { value: 'critical', label: 'Critical' },
];

const TICKET_TYPE_OPTIONS = [
  { value: 'issue', label: 'Issue' },
  { value: 'question', label: 'Question' },
  { value: 'task', label: 'Task' },
];

function normalizeEnum(value: string | number | undefined): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value.toLowerCase();
  const num = Number(value);
  const maps: Record<string, string[]> = {
    status: ['open', 'pending', 'on_hold', 'resolved', 'closed'],
    priority: ['low', 'medium', 'high', 'urgent'],
    severity: ['minor', 'major', 'critical'],
    ticket_type: ['issue', 'question', 'task'],
  };
  for (const keys of Object.values(maps)) {
    if (num >= 0 && num < keys.length) return keys[num];
  }
  return '';
}

export default function TicketDetailsSection({
  ticket,
  comments,
}: {
  ticket: Ticket;
  comments: any;
}) {
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const addComment = useAddComment(ticket.id);
  const deleteComment = useDeleteComment(ticket.id);
  const editComment = useUpdateComment(ticket.id);
  const updateTicket = useUpdateTicket();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';
  const canEditTicket = isAdmin || isAgent;
  const canEditAssignee = isAdmin;

  const assignables = useAssignableUsers(canEditAssignee);
  const assignableUsers = assignables.data ?? [];

  const handleSubmit = () => {
    if (!content.trim()) return;
    addComment.mutate({ content });
    setContent('');
  };

  const handleFieldChange = (field: string, value: string | number | null) => {
    // Validate only the specific field being changed
    if (field === 'due_date') {
      const dateStr =
        value == null
          ? null
          : typeof value === 'string'
            ? value
            : format(new Date(value as number), 'yyyy-MM-dd');
      const d = dateStr ? new Date(dateStr) : null;
      if (d && isBefore(d, startOfDay(new Date()))) {
        toast({
          variant: 'destructive',
          title: 'Invalid due date',
          description: 'Due date cannot be in the past.',
        });
        return;
      }
      // Send only the due_date field to the API
      updateTicket.mutate(
        { id: ticket.id, payload: { due_date: dateStr } as any },
        {
          onSuccess: () => {
            toast({
              title: 'Ticket updated',
              description: `${field.replace(/_/g, ' ')} updated.`,
            });
          },
          onError: (err: unknown) => {
            const ax = err as {
              response?: { data?: { errors?: string[] }; status?: number };
            };
            const messages = ax.response?.data?.errors;
            toast({
              variant: 'destructive',
              title: 'Update failed',
              description: Array.isArray(messages)
                ? messages.join(' ')
                : err instanceof Error
                  ? err.message
                  : 'Something went wrong.',
            });
          },
        },
      );
    } else {
      // For all other fields, send only that field without additional validation
      updateTicket.mutate(
        { id: ticket.id, payload: { [field]: value } as any },
        {
          onSuccess: () => {
            toast({
              title: 'Ticket updated',
              description: `${field.replace(/_/g, ' ')} updated.`,
            });
          },
          onError: (err: unknown) => {
            const ax = err as {
              response?: { data?: { errors?: string[] }; status?: number };
            };
            const messages = ax.response?.data?.errors;
            toast({
              variant: 'destructive',
              title: 'Update failed',
              description: Array.isArray(messages)
                ? messages.join(' ')
                : err instanceof Error
                  ? err.message
                  : 'Something went wrong.',
            });
          },
        },
      );
    }
  };

  const assigneeDisplay =
    ticket.assignee != null
      ? `${ticket.assignee.first_name ?? ''} ${ticket.assignee.last_name ?? ''}`.trim()
      : 'Unassigned';

  const statusVal = normalizeEnum(ticket.status);
  const priorityVal = normalizeEnum(ticket.priority);
  const severityVal = normalizeEnum(ticket.severity);
  const ticketTypeVal = normalizeEnum(String(ticket.ticket_type));
  const dueDateVal = ticket.due_date ? new Date(ticket.due_date) : null;

  return (
    <div className="space-y-6">
      {/* Description Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg text-purple-800 font-semibold mb-3">Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {ticket.description}
        </p>
      </div>

      {/* Details Grid: Priority, Severity, Ticket Type, Status, Assignee, Due Date */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg text-purple-800 font-semibold mb-4">Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Priority</h3>
            {canEditTicket ? (
              <Select
                value={priorityVal || 'medium'}
                onValueChange={(v) => handleFieldChange('priority', v)}
                disabled={updateTicket.isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-base font-medium capitalize">{priorityVal || '—'}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Severity</h3>
            {canEditTicket ? (
              <Select
                value={severityVal || 'minor'}
                onValueChange={(v) => handleFieldChange('severity', v)}
                disabled={updateTicket.isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SEVERITY_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-base font-medium capitalize">{severityVal || '—'}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Ticket type</h3>
            {canEditTicket ? (
              <Select
                value={ticketTypeVal || 'issue'}
                onValueChange={(v) => handleFieldChange('ticket_type', v)}
                disabled={updateTicket.isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_TYPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-base font-medium capitalize">{ticketTypeVal || '—'}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Status</h3>
            {canEditTicket ? (
              <Select
                value={statusVal || 'open'}
                onValueChange={(v) => handleFieldChange('status', v)}
                disabled={updateTicket.isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-base font-medium capitalize">{statusVal || '—'}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Assignee</h3>
            {canEditAssignee ? (
              <Select
                value={ticket.assignee_id?.toString() ?? 'unassigned'}
                onValueChange={(v) =>
                  handleFieldChange('assignee_id', v === 'unassigned' ? null : Number(v))
                }
                disabled={updateTicket.isPending || assignables.isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {assignableUsers.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.first_name} {u.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-base font-medium">{assigneeDisplay}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Due date</h3>
            {canEditTicket ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dueDateVal && 'text-muted-foreground',
                    )}
                    disabled={updateTicket.isPending}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDateVal ? format(dueDateVal, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDateVal ?? undefined}
                    onSelect={(d) =>
                      handleFieldChange('due_date', d ? format(d, 'yyyy-MM-dd') : null)
                    }
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <p className="text-base font-medium">
                {ticket.due_date
                  ? new Date(ticket.due_date).toLocaleDateString()
                  : 'No due date'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg text-purple-800 font-semibold mb-4">Comments</h2>

        <div className="space-y-3 mb-6">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-24"
          />
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            Post Comment
          </Button>
        </div>

        <div className="space-y-4">
          {comments.isLoading && <p className="text-gray-500">Loading comments...</p>}

          {comments.data?.length === 0 && !comments.isLoading && (
            <p className="text-gray-500 text-center py-4">No comments yet.</p>
          )}

          {comments.data?.map((c: Comment) => {
            const isOwnComment = c.user?.id === user?.id;
            return (
              <div
                key={c.id}
                className={cn(
                  'border rounded-lg p-4 transition-colors',
                  isOwnComment
                    ? 'bg-purple-100 hover:bg-purple-200'
                    : 'bg-gray-50 hover:bg-gray-100',
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div
                      className={cn(
                        'font-medium text-sm',
                        isOwnComment && 'text-purple-800',
                      )}
                    >
                      {c.user?.first_name} {c.user?.last_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(c.created_at).toLocaleString()}
                    </div>
                  </div>
                  {isOwnComment && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <MoreHorizontal size={18} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => {
                              setEditingId(c.id);
                              setEditContent(c.content);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-600"
                            onClick={() => deleteComment.mutate(c.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                {editingId === c.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          if (!editContent.trim()) return;
                          editComment.mutate({
                            commentId: c.id,
                            payload: { content: editContent },
                          });
                          setEditingId(null);
                        }}
                        disabled={!editContent.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed">{c.content}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
