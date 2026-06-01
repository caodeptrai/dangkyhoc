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
  course_max_students?: number | null;
  course_status?: 'upcoming' | 'ongoing' | 'finished';
  enrolled_count?: number;
  note: string;
  status: 'new' | 'consulted' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}
