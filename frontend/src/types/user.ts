export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status?: string;
  last_sign_in_at?: string | null;
  created_at?: string;
  updated_at?: string;
}