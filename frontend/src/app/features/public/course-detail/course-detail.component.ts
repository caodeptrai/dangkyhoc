import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  course: Course | null = null;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const numericId = id ? +id : 0;
    if (!numericId) {
      this.loading = false;
      return;
    }
    this.courseService.getPublicCourseById(numericId).subscribe({
      next: (response) => {
        this.course = response.success && response.data ? response.data : null;
        this.loading = false;
      },
      error: () => {
        this.course = null;
        this.loading = false;
      },
    });
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'upcoming': return 'Sắp khai giảng';
      case 'ongoing': return 'Đang học';
      case 'finished': return 'Kết thúc';
      default: return 'Sắp khai giảng';
    }
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'upcoming': return 'status--upcoming';
      case 'ongoing': return 'status--ongoing';
      case 'finished': return 'status--finished';
      default: return 'status--upcoming';
    }
  }

  isCourseFull(): boolean {
    if (!this.course) return false;
    if (!this.course.max_students || !this.course.enrolled_count) return false;
    return this.course.enrolled_count >= this.course.max_students;
  }

  seatsRemaining(): number | null {
    if (!this.course) return null;
    if (!this.course.max_students || !this.course.enrolled_count) return null;
    return Math.max(0, this.course.max_students - this.course.enrolled_count);
  }

  isRegistrationDisabled(): boolean {
    if (!this.course) return true;
    return this.course.status === 'finished' || this.isCourseFull();
  }

  formatStartDate(dateStr?: string | null): string {
    if (!dateStr) return 'Chưa xác định';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
