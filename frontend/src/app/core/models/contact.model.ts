export interface Contact {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  message: string;
  status: 'pending' | 'processed';
  created_at: string;
  updated_at: string;
}
