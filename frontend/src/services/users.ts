import api from './api';

export interface AssignableUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export const getAssignableUsers = async (): Promise<AssignableUser[]> => {
  const { data } = await api.get<AssignableUser[]>('/users/assignables');
  return Array.isArray(data) ? data : [];
};
