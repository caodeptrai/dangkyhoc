import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  loading = true;
  searchTerm = '';
  filterLanguage = '';
  filterLevel = '';
  filterMinFee: number | null = null;
  filterMaxFee: number | null = null;
  languages: string[] = [];
  levels: string[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getPublicCourses().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.courses = response.data;
          this.extractFilterOptions();
          this.applyFilters();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  extractFilterOptions(): void {
    const langSet = new Set<string>();
    const levelSet = new Set<string>();
    this.courses.forEach((c) => {
      if (c.language) langSet.add(c.language);
      if (c.level) levelSet.add(c.level);
    });
    this.languages = Array.from(langSet).sort();
    this.levels = Array.from(levelSet).sort();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        !this.searchTerm ||
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLanguage =
        !this.filterLanguage || course.language === this.filterLanguage;
      const matchesLevel =
        !this.filterLevel || course.level === this.filterLevel;
      const matchesMinFee =
        this.filterMinFee == null || course.tuition_fee >= this.filterMinFee;
      const matchesMaxFee =
        this.filterMaxFee == null || course.tuition_fee <= this.filterMaxFee;

      return (
        matchesSearch &&
        matchesLanguage &&
        matchesLevel &&
        matchesMinFee &&
        matchesMaxFee
      );
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterLanguage = '';
    this.filterLevel = '';
    this.filterMinFee = null;
    this.filterMaxFee = null;
    this.applyFilters();
  }

  truncate(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trim() + '...';
  }

  formatFee(fee: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(fee);
  }
}
