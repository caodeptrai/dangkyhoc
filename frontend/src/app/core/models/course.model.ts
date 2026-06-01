export interface Course {
  id: number;
  title: string;
  language: string;
  level: string;
  tuition_fee: number;
  duration: string;
  schedule: string;
  short_description: string;
  description: string;
  instructor_id?: number;
  instructor_name?: string;
  image_url: string;
  is_active: boolean;
  max_students?: number | null;
  status?: 'upcoming' | 'ongoing' | 'finished';
  start_date?: string | null;
  enrolled_count?: number;
  created_at: string;
  updated_at: string;
}
