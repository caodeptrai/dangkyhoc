export interface Registration {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  gender: string;
  address: string;
  course_id: number;
  course_title?: string;
  note: string;
  status: 'new' | 'consulted' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}
