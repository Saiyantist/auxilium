import type { User } from "./user";

export interface Activity {
  id: number;
  // user_id: number;
  user?: User;
  ticket_id: number;
  action: string;
  metadata: any;
  created_at: string;
}