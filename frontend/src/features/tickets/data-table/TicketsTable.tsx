import { Link } from 'react-router-dom';
import { DataTable } from '@/components/data-table';
import { clientTicketColumns, adminTicketColumns } from './columns';
import {
  clientTicketFilterConfig,
  ticketFilterConfig,
  adminTicketSearchKeys,
  ticketSearchKeys,
} from './config';
import type { Ticket } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface TicketsTableProps {
  tickets: Ticket[];
  isLoading?: boolean;
}

export function TicketsTable({
  tickets,
  isLoading = false,
}: TicketsTableProps) {
  const { user } = useAuth();
  const isClient = user?.role === 'client';
  const columns = isClient ? clientTicketColumns : adminTicketColumns;
  const filterConfig = isClient ? clientTicketFilterConfig : ticketFilterConfig;
  const sortedTickets = tickets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5) || []

  if (!isLoading && tickets.length === 0) {
    return (
      <div className='w-full rounded-md border bg-white p-8 text-center'>
        <p className='text-lg font-medium text-gray-800 mb-2'>No tickets yet</p>
        <p className='text-sm text-gray-600 mb-6'>
          Create a new ticket to get help from our team.
        </p>
        <Link
          to='/new-ticket'
          className='inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700'
        >
          Create Ticket
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='w-full space-y-4'>
        <div className='rounded-md border bg-white'>
          <Table>
            <TableHeader className='bg-gray-50'>
              <TableRow>
                <TableHead className='p-4'>
                  <Skeleton className='h-4 w-4' />
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={String(column.key)} className='p-4'>
                    <Skeleton className='h-4 w-20' />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='p-4'>
                    <Skeleton className='h-4 w-4' />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className='p-4'>
                      <Skeleton className='h-4 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={sortedTickets}
      searchKeys={isClient ? ticketSearchKeys : adminTicketSearchKeys}
      filterConfig={filterConfig}
      initialPageSize={5}
      initialColumnVisibility={{
        created_at: false,
        updated_at: false,
      }}
    />
  );
}
