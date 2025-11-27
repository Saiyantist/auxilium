import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

// Helper hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
