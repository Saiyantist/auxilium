import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Calendar as CalendarIcon } from 'lucide-react';
import { Loader2, AlertCircle } from 'lucide-react';

import api from '@/services/api';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { format, addDays, startOfToday } from 'date-fns';

interface ClientUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface TicketFormData {
  subject: string;
  description: string;
  creator_id?: number;
  priority?: string;
  status?: string;
  severity?: string;
  ticket_type?: string;
  due_date?: string;
  assignee_id?: number;
  project_id?: number;
  category_id?: number;
}

export default function NewTicket() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user with role
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);

  // Check if user is admin or agent
  const isAdminOrAgent = user?.role === 'admin' || user?.role === 'agent';

  // Fetch active clients for "Create for Client" dropdown (agent/admin only)
  useEffect(() => {
    if (!isAdminOrAgent) return;
    let cancelled = false;
    setClientsLoading(true);

    // Will be refactored into a service
    api
      .get<ClientUser[]>('/users/clients')
      .then((res) => {
        if (!cancelled) setClients(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (!cancelled) setClients([]);
      })
      .finally(() => {
        if (!cancelled) setClientsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isAdminOrAgent]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TicketFormData>({
    defaultValues: {
      subject: '',
      description: '',
      creator_id: undefined,
      priority: '',
      status: isAdminOrAgent ? 'open' : undefined,
      severity: '',
      ticket_type: isAdminOrAgent ? 'issue' : undefined,
      due_date: '',
    },
  });

  const subject = watch('subject') || '';
  const description = watch('description') || '';
  const creatorId = watch('creator_id');
  const priority = watch('priority');
  const status = watch('status');
  const severity = watch('severity');
  const ticketType = watch('ticket_type');
  const dueDate = watch('due_date');

  const onSubmit = async (data: TicketFormData) => {
    if (isAdminOrAgent && data.creator_id == null) {
      setErrorMessage('Create for Client is required.');
      toast({
        variant: 'destructive',
        title: 'Validation',
        description: 'Please select a client in "Create for Client".',
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Build payload aligned with backend strong params (subject, description, priority, ticket_type required)
      const payload: Record<string, unknown> = {
        ticket: {
          subject: data.subject.trim(),
          description: data.description.trim(),
          // Backend requires priority and ticket_type; use defaults for regular users
          priority: (data.priority || 'medium').toLowerCase(),
          ticket_type: (data.ticket_type || 'issue').toLowerCase(),
        },
      };

      const ticket = payload.ticket as Record<string, unknown>;

      if (isAdminOrAgent) {
        if (data.creator_id != null) ticket.creator_id = data.creator_id;
        if (data.status) ticket.status = data.status.toLowerCase();
        if (data.severity) ticket.severity = data.severity.toLowerCase();
        // due_date: send YYYY-MM-DD (Rails accepts ISO date/datetime)
        if (data.due_date) {
          const dateStr =
            typeof data.due_date === 'string' ? data.due_date.split('T')[0] : '';
          if (dateStr) ticket.due_date = dateStr;
        }
      }

      const response = await api.post('/tickets', payload);

      toast({
        title: 'Ticket created',
        description: 'Your support ticket has been submitted successfully.',
      });
      navigate(`/tickets/${response.data.id}`);
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { errors?: string[] }; status?: number };
      };
      console.error('Error creating ticket:', err);

      const messages = err.response?.data?.errors;
      const message = Array.isArray(messages)
        ? messages.join(' ')
        : err.response?.data &&
            typeof err.response.data === 'object' &&
            'message' in err.response.data
          ? String((err.response.data as { message?: string }).message)
          : 'An error occurred while creating the ticket';

      setErrorMessage(message);
      toast({
        variant: 'destructive',
        title: 'Failed to create ticket',
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    reset({
      subject: '',
      description: '',
      creator_id: undefined,
      priority: '',
      status: isAdminOrAgent ? 'open' : undefined,
      severity: '',
      ticket_type: isAdminOrAgent ? 'issue' : undefined,
      due_date: '',
    });
    setErrorMessage(null);
  };

  // Calculate the date 3 days from today
  const threeDaysFromNow = addDays(startOfToday(), 3);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Ticket</h1>
      <Card className="shadow mt-6 border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 border-b border-purple-100 rounded-t-lg">
          <CardDescription className="font-bold text-white">
            Fill out the form below to submit a new support ticket
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Subject - Required */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                placeholder="Brief description of the issue"
                maxLength={255}
                {...register('subject', {
                  required: 'Subject is required',
                  minLength: {
                    value: 3,
                    message: 'Subject must be at least 3 characters',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Subject must be at most 255 characters',
                  },
                })}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center gap-2 flex-wrap">
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject.message}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">{subject.length} / 255</p>
              </div>
            </div>

            {/* Description - Required */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about your issue or request..."
                maxLength={16000}
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters',
                  },
                  maxLength: {
                    value: 16000,
                    message: 'Description must be at most 16,000 characters',
                  },
                })}
                rows={6}
                disabled={isSubmitting}
                className="resize-none"
              />
              <div className="flex justify-between items-center gap-2 flex-wrap">
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {description.length} / 16,000 characters
                </p>
              </div>
            </div>

            {/* Admin/Agent Only Fields */}
            {isAdminOrAgent && (
              <>
                {/* Row: Create for Client, Status, and Ticket Type  */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Create for Client: required when agent/admin creates on behalf of a client */}
                  <div className="space-y-2">
                    <Label htmlFor="creator_id">
                      Create for Client<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={creatorId != null ? String(creatorId) : ''}
                      onValueChange={(value) =>
                        setValue('creator_id', value ? Number(value) : undefined)
                      }
                      disabled={isSubmitting || clientsLoading}
                      required
                      {...register('creator_id', {
                        required: 'Create for Client is required.',
                      })}
                    >
                      <SelectTrigger id="creator_id">
                        <SelectValue
                          placeholder={
                            clientsLoading ? 'Loading clients...' : 'Select client'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.first_name} {c.last_name} ({c.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.creator_id && (
                      <p className="text-sm text-red-500">{errors.creator_id.message}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={status}
                      onValueChange={(value) => setValue('status', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ticket Type */}
                  <div className="space-y-2">
                    <Label htmlFor="ticket_type">Ticket Type</Label>
                    <Select
                      value={ticketType}
                      onValueChange={(value) => setValue('ticket_type', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="ticket_type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="issue">Issue</SelectItem>
                        <SelectItem value="question">Question</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row: Priority, Severity, and Due Date */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={priority}
                      onValueChange={(value) => setValue('priority', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Severity */}
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select
                      value={severity}
                      onValueChange={(value) => setValue('severity', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="severity">
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Due Date - min today so backend "not in past" validation is satisfied */}
                  <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!dueDate}
                          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {dueDate ? (
                            format(new Date(dueDate), 'yyyy-MM-dd')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 mt-2 rounded-lg shadow-lg max-w-[320px] z-10">
                        <Calendar
                          mode="single"
                          selected={dueDate ? new Date(dueDate) : undefined}
                          defaultMonth={dueDate ? new Date(dueDate) : threeDaysFromNow}
                          disabled={(date) => date < threeDaysFromNow}
                          onSelect={(date) => {
                            setValue('due_date', date ? format(date, 'yyyy-MM-dd') : ''); // Format date as "yyyy-MM-dd"
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.due_date && (
                      <p className="text-sm text-red-500">{errors.due_date.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
