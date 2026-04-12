export interface ForumPost {
  id: number;
  title: string;
  content: string;
  image_url: string;
  admin_id: number;
  author_name?: string;
  views: number;
  likes: number;
  dislikes: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
