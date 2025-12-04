import type { User } from './user';
// import type { Category } from './category';
// import type { Project } from './project';

export interface Ticket {
  id: number;
  number: string;
  subject: string;
  description: string | null;
  status: number;
  priority: number;
  severity: number;
  ticket_type: number;
  category_id: number | null;
  project_id: number | null;
  creator_id: number;
  assignee_id: number | null;
  due_date: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  
  creator?: User;
  assignee?: User | null;
}
