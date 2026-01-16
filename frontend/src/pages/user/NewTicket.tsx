import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import { Loader2, AlertCircle } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/hooks/use-auth';

interface TicketFormData {
  subject: string;
  description: string;
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

  // Check if user is admin or agent
  const isAdminOrAgent = user?.role === 'admin' || user?.role === 'agent';

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
      priority: '',
      status: isAdminOrAgent ? 'open' : undefined,
      severity: '',
      ticket_type: isAdminOrAgent ? 'issue' : undefined,
      due_date: '',
    },
  });

  const description = watch('description') || '';
  const priority = watch('priority');
  const status = watch('status');
  const severity = watch('severity');
  const ticketType = watch('ticket_type');
  const dueDate = watch('due_date');

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Prepare payload with only required fields
      const payload: any = {
        ticket: {
          subject: data.subject,
          description: data.description,
        },
      };

      // Add optional fields if present (for admins/agents)
      if (isAdminOrAgent) {
        if (data.priority) {
          payload.ticket.priority = data.priority.toLowerCase();
        }
        if (data.status) {
          payload.ticket.status = data.status.toLowerCase();
        }
        if (data.severity) {
          payload.ticket.severity = data.severity.toLowerCase();
        }
        if (data.ticket_type) {
          payload.ticket.ticket_type = data.ticket_type.toLowerCase();
        }
        if (data.due_date) {
          payload.ticket.due_date = data.due_date;
        }
      }

      const response = await api.post('/tickets', payload);

      // Navigate to the created ticket's detail page
      navigate(`/tickets/${response.data.id}`);
    } catch (error: any) {
      console.error('Error creating ticket:', error);

      // Handle validation errors from Rails
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        setErrorMessage(
          Array.isArray(errors) ? errors.join(', ') : 'Failed to create ticket'
        );
      } else {
        setErrorMessage(
          error.response?.data?.message || 'An error occurred while creating the ticket'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    reset({
      subject: '',
      description: '',
      priority: '',
      status: isAdminOrAgent ? 'open' : undefined,
      severity: '',
      ticket_type: isAdminOrAgent ? 'issue' : undefined,
      due_date: '',
    });
    setErrorMessage(null);
  };

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
                {...register('subject', {
                  required: 'Subject is required',
                  minLength: {
                    value: 3,
                    message: 'Subject must be at least 3 characters',
                  },
                })}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Description - Required */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about your issue or request..."
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters',
                  },
                })}
                rows={6}
                disabled={isSubmitting}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {description.length} characters
                </p>
              </div>
            </div>

            {/* Admin/Agent Only Fields */}
            {isAdminOrAgent && (
              <>
                {/* Row: Status and Ticket Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Row: Priority and Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    value={dueDate ? dueDate.toString().split('T')[0] : ''}
                    id="due_date"
                    type="date"
                    {...register('due_date')}
                    disabled={isSubmitting}
                  />
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
