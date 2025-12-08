import { TicketsTable } from '@/features/tickets/data-table/TicketsTable';
import { useAuth } from '@/hooks/use-auth';
import { useTickets } from '@/hooks/useTickets';

export default function TicketsPage() {
  const { data: tickets, isLoading } = useTickets();
  const { user } = useAuth();
  const isClient = user?.role === 'client';
  const isAgent = user?.role === 'agent';
  const isAdmin = user?.role === 'admin';

  return (
    <div className='p-6'>
      
      {isClient && 
        <h1 className='text-2xl font-bold mb-6'>My Tickets</h1>
      }
      {isAgent && 
        <h1 className='text-2xl font-bold mb-6'>Tickets</h1>
      }
      {isAdmin && 
        <h1 className='text-2xl font-bold mb-6'>All Tickets</h1>
      }
      <TicketsTable tickets={tickets || []} isLoading={isLoading} />
    </div>
  );
}
