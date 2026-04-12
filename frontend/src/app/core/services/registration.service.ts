import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Registration } from '../models/registration.model';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createRegistration(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/registrations`, data);
  }

  getAllRegistrations(search?: string, courseId?: number): Observable<ApiResponse<Registration[]>> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (courseId) params = params.set('course_id', courseId.toString());
    return this.http.get<ApiResponse<Registration[]>>(`${this.apiUrl}/admin/registrations`, { params });
  }

  updateStatus(id: number, status: string): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/admin/registrations/${id}/status`, { status });
  }
}
