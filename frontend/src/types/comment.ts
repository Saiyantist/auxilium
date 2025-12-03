// import type { User } from './user';

export interface Comment {
  id: number;
  ticket_id: number;
  user_id: number;
  // user?: User;           // preload user for UI
  parent_id: number | null;
  content: string;
  internal: boolean;
  created_at: string;
  updated_at: string;
}
