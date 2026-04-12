import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ForumPost } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class ForumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublishedPosts(): Observable<ApiResponse<ForumPost[]>> {
    return this.http.get<ApiResponse<ForumPost[]>>(`${this.apiUrl}/forum`);
  }

  getPostDetail(id: number): Observable<ApiResponse<ForumPost>> {
    return this.http.get<ApiResponse<ForumPost>>(`${this.apiUrl}/forum/${id}`);
  }

  reactToPost(id: number, session_id: string, reaction: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/forum/${id}/react`, { session_id, reaction });
  }

  // Admin
  adminGetAllPosts(): Observable<ApiResponse<ForumPost[]>> {
    return this.http.get<ApiResponse<ForumPost[]>>(`${this.apiUrl}/admin/forum`);
  }

  adminGetPostDetail(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/admin/forum/${id}`);
  }

  createPost(data: Partial<ForumPost>): Observable<ApiResponse<ForumPost>> {
    return this.http.post<ApiResponse<ForumPost>>(`${this.apiUrl}/admin/forum`, data);
  }

  updatePost(id: number, data: Partial<ForumPost>): Observable<ApiResponse<ForumPost>> {
    return this.http.put<ApiResponse<ForumPost>>(`${this.apiUrl}/admin/forum/${id}`, data);
  }

  deletePost(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/admin/forum/${id}`);
  }

  getSessionId(): string {
    let sid = localStorage.getItem('forum_session_id');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('forum_session_id', sid);
    }
    return sid;
  }
}
