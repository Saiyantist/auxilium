import { useQuery } from '@tanstack/react-query';
import { getAssignableUsers } from '@/services/users';

export const useAssignableUsers = (enabled: boolean) => {
  return useQuery({
    queryKey: ['users', 'assignables'],
    queryFn: getAssignableUsers,
    enabled,
  });
};
