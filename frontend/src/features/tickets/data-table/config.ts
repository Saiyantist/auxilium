import type { Ticket } from '@/types';
import type { FilterConfig } from '@/components/data-table';

export const ticketSearchKeys: Array<keyof Ticket | string> = [
  'subject',
  'number',
  // for future: add email
];

export const adminTicketSearchKeys: Array<keyof Ticket | string> = [
  ...ticketSearchKeys,
  'assignee',
];

const baseTicketFilterConfig: FilterConfig<Ticket> = {
  status: {
    label: 'Status',
    options: ['open', 'pending', 'on_hold', 'resolved', 'closed'],
  },
  priority: {
    label: 'Priority',
    options: ['low', 'medium', 'high', 'urgent'],
  },
  severity: {
    label: 'Severity',
    options: ['minor', 'major', 'critical'],
  },
  ticket_type: {
    label: 'Type',
    options: ['issue', 'question', 'task'],
  },
};

export const ticketFilterConfig = baseTicketFilterConfig;

export const clientTicketFilterConfig: FilterConfig<Ticket> = {
  status: baseTicketFilterConfig.status,
};
