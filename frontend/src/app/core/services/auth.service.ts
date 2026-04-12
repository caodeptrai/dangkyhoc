import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  login(username: string, password: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/admin/login`, { username, password })
      .pipe(tap(res => {
        if (res.success && res.data?.token) {
          localStorage.setItem('admin_token', res.data.token);
          localStorage.setItem('admin_info', JSON.stringify(res.data.admin));
          this.loggedIn.next(true);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  getAdminInfo(): any {
    const info = localStorage.getItem('admin_info');
    return info ? JSON.parse(info) : null;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
