import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface DashboardStats {
  totalCourses: number;
  totalRegistrations: number;
  totalContacts: number;
  totalChatLogs: number;
  totalInstructors: number;
  totalPosts: number;
  newRegistrations: number;
  pendingContacts: number;
  confirmedRegistrations: number;
  totalRevenue: number;
  dealCloseRate: number;
  registrationsByDay: { date: string; count: number }[];
  registrationsByCourse: { title: string; count: number }[];
  revenueByCourse: { title: string; revenue: number; count: number }[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiUrl}/admin/dashboard`);
  }
}
