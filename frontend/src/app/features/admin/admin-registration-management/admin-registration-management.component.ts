import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../../core/services/registration.service';
import { CourseService } from '../../../core/services/course.service';
import { Registration } from '../../../core/models/registration.model';
import { Course } from '../../../core/models/course.model';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

@Component({
  selector: 'app-admin-registration-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-registration-management.component.html',
  styleUrl: './admin-registration-management.component.scss'
})
export class AdminRegistrationManagementComponent implements OnInit {
  registrations: Registration[] = [];
  courses: Course[] = [];
  loading = true;
  searchTerm = '';
  filterCourseId: number | null = null;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    private registrationService: RegistrationService,
    private courseService: CourseService,
    private feedback: AdminFeedbackService
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.registrationService.getAllRegistrations(undefined, this.filterCourseId ?? undefined).subscribe({
      next: (res) => { this.registrations = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; this.feedback.error('Không thể tải danh sách đăng ký.'); }
    });
    this.courseService.getAllCourses().subscribe({ next: (res) => { this.courses = res.data ?? []; } });
  }

  onSearch(): void { this.currentPage = 1; }

  onCourseFilterChange(): void {
    this.currentPage = 1;
    this.loadData();
  }

  updateStatus(reg: Registration, status: string): void {
    this.registrationService.updateStatus(reg.id, status).subscribe({
      next: (res) => { if (res.success) { this.loadData(); this.feedback.success('Cập nhật trạng thái đăng ký thành công.'); } },
      error: () => this.feedback.error('Không thể cập nhật trạng thái đăng ký.')
    });
  }

  get filteredRegistrations(): Registration[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) return this.registrations;
    return this.registrations.filter(reg => Object.values(reg as any).some(value => String(value ?? '').toLowerCase().includes(keyword)));
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredRegistrations.length / this.pageSize)); }
  get paginatedRegistrations(): Registration[] { this.normalizePage(); const start = (this.currentPage - 1) * this.pageSize; return this.filteredRegistrations.slice(start, start + this.pageSize); }
  get visiblePages(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1).filter(page => page === 1 || page === this.totalPages || Math.abs(page - this.currentPage) <= 1); }
  changePage(page: number): void { this.currentPage = Math.min(Math.max(page, 1), this.totalPages); }
  normalizePage(): void { if (this.currentPage > this.totalPages) this.currentPage = this.totalPages; }
}
