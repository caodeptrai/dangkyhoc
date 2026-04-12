import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../../core/services/registration.service';
import { CourseService } from '../../../core/services/course.service';
import { Registration } from '../../../core/models/registration.model';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-admin-registration-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-registration-management.component.html',
  styleUrl: './admin-registration-management.component.scss'
})
export class AdminRegistrationManagementComponent implements OnInit {
  registrations: Registration[] = [];
  courses: Course[] = [];
  loading = true;
  searchTerm = '';
  filterCourseId: number | null = null;

  constructor(
    private registrationService: RegistrationService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.registrationService.getAllRegistrations(this.searchTerm || undefined, this.filterCourseId ?? undefined).subscribe({
      next: (res) => {
        this.registrations = res.data ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res.data ?? [];
      }
    });
  }

  onSearch(): void {
    this.loadData();
  }

  updateStatus(reg: Registration, status: string): void {
    this.registrationService.updateStatus(reg.id, status).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadData();
        }
      }
    });
  }
}
