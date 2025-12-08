'use client';

import { Link } from 'react-router-dom';
import type { Ticket } from '@/types';
import type { DataTableColumn } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { getBadgeProps } from '@/utils/badge';

const HIDDEN_FOR_CLIENT_COLUMNS = new Set([
  'priority',
  'severity',
  'due_date',
  'assignee',
  'ticket_type',
]);

const ticketColumns: DataTableColumn<Ticket>[] = [
  {
    key: 'number',
    label: 'Ticket #',
    sortable: true,
    render: (_value, row) => (
      <Link className='text-blue-600 underline' to={`/tickets/${row.id}`}>
        {row.number}
      </Link>
    ),
  },
  {
    key: 'subject',
    label: 'Subject',
    sortable: false,
    render: (value) => (
      <span
        className='block max-w-[260px] truncate'
        title={value ? String(value) : ''}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'priority',
    label: 'Priority',
    sortable: true,
    render: (value) => {
      const { label, className, variant } = getBadgeProps('priority', value);
      return (
        <Badge variant={variant} className={className}>
          {label}
        </Badge>
      );
    },
  },
  {
    key: 'severity',
    label: 'Severity',
    sortable: true,
    render: (value) => {
      const { label, className, variant } = getBadgeProps('severity', value);
      return (
        <Badge variant={variant} className={className}>
          {label}
        </Badge>
      );
    },
  },
  {
    key: 'due_date',
    label: 'Due Date',
    sortable: true,
    render: (value) => new Date(value as string).toLocaleString(),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: false,
    render: (value) => {
      const { label, className, variant } = getBadgeProps('status', value);
      return (
        <Badge variant={variant} className={className}>
          {label}
        </Badge>
      );
    },
  },
  {
    key: 'assignee',
    label: 'Assignee',
    render: (_value, row) => {
      const firstName = row.assignee?.first_name ?? '';
      const lastName = row.assignee?.last_name ?? '';
      const fullName = `${firstName} ${lastName}`.trim();
      return fullName || 'Unassigned';
    },
    sortable: false,
  },
  {
    key: 'ticket_type',
    label: 'Ticket Type',
    render: (value) => {
      const { label, className, variant } = getBadgeProps('ticket_type', value);
      return (
        <Badge variant={variant} className={className}>
          {label}
        </Badge>
      );
    },
    sortable: false,
  },
  {
    key: 'created_at',
    label: 'Created',
    sortable: true,
    render: (value) => new Date(value as string).toLocaleString(),
  },
  {
    key: 'updated_at',
    label: 'Updated',
    sortable: true,
    render: (value) => new Date(value as string).toLocaleString(),
  },
];

export const adminTicketColumns = ticketColumns;

export const clientTicketColumns = ticketColumns.filter(
  (column) => !HIDDEN_FOR_CLIENT_COLUMNS.has(String(column.key))
);
