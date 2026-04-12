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
}
