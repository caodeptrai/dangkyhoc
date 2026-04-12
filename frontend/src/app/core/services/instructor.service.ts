import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Instructor } from '../models/instructor.model';

@Injectable({ providedIn: 'root' })
export class InstructorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublicInstructors(): Observable<ApiResponse<Instructor[]>> {
    return this.http.get<ApiResponse<Instructor[]>>(`${this.apiUrl}/instructors`);
  }

  getAllInstructors(): Observable<ApiResponse<Instructor[]>> {
    return this.http.get<ApiResponse<Instructor[]>>(`${this.apiUrl}/admin/instructors`);
  }

  createInstructor(data: Partial<Instructor>): Observable<ApiResponse<Instructor>> {
    return this.http.post<ApiResponse<Instructor>>(`${this.apiUrl}/admin/instructors`, data);
  }

  updateInstructor(id: number, data: Partial<Instructor>): Observable<ApiResponse<Instructor>> {
    return this.http.put<ApiResponse<Instructor>>(`${this.apiUrl}/admin/instructors/${id}`, data);
  }

  deleteInstructor(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/admin/instructors/${id}`);
  }
}
