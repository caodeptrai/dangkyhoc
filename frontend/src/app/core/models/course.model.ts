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
  created_at: string;
  updated_at: string;
}
