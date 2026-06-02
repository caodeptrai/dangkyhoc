import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { InstructorService } from '../../../core/services/instructor.service';
import { Course } from '../../../core/models/course.model';
import { Instructor } from '../../../core/models/instructor.model';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

@Component({
  selector: 'app-admin-course-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-course-management.component.html',
  styleUrl: './admin-course-management.component.scss'
})
export class AdminCourseManagementComponent implements OnInit {
  courses: Course[] = [];
  instructors: Instructor[] = [];
  loading = true;
  showForm = false;
  editingCourse: Course | null = null;
  courseForm: FormGroup;
  formLoading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private feedback: AdminFeedbackService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      level: ['', Validators.required],
      tuition_fee: ['', Validators.required],
      duration: ['', Validators.required],
      schedule: ['', Validators.required],
      short_description: [''],
      description: [''],
      instructor_id: [null],
      image_url: [''],
      is_active: [1],
      max_students: [null],
      status: ['upcoming'],
      start_date: ['']
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.instructorService.getAllInstructors().subscribe({
      next: (res) => { this.instructors = res.data ?? []; },
      error: () => {}
    });
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res.data ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openCreate(): void {
    this.courseForm.reset({
      title: '',
      language: '',
      level: '',
      tuition_fee: '',
      duration: '',
      schedule: '',
      short_description: '',
      description: '',
      instructor_id: null,
      image_url: '',
      is_active: 1,
      max_students: null,
      status: 'upcoming',
      start_date: ''
    });
    this.showForm = true;
    this.editingCourse = null;
  }

  openEdit(course: Course): void {
    const startDate = course.start_date ? course.start_date.split('T')[0] : '';
    this.courseForm.patchValue({
      title: course.title,
      language: course.language,
      level: course.level,
      tuition_fee: course.tuition_fee,
      duration: course.duration,
      schedule: course.schedule,
      short_description: course.short_description ?? '',
      description: course.description ?? '',
      instructor_id: (course as any).instructor_id ?? null,
      image_url: course.image_url ?? '',
      is_active: course.is_active ? 1 : 0,
      max_students: course.max_students ?? null,
      status: course.status ?? 'upcoming',
      start_date: startDate
    });
    this.showForm = true;
    this.editingCourse = course;
  }

  closeForm(): void {
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;

    this.formLoading = true;
    const formValue = this.courseForm.value;
    const payload = {
      ...formValue,
      is_active: formValue.is_active ? 1 : 0
    };

    if (this.editingCourse) {
      this.courseService.updateCourse(this.editingCourse.id, payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadCourses();
            this.closeForm();
            this.feedback.success('Cập nhật khóa học thành công.');
          }
          this.formLoading = false;
        },
        error: () => {
          this.feedback.error('Không thể lưu khóa học.');
          this.formLoading = false;
        }
      });
    } else {
      this.courseService.createCourse(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadCourses();
            this.closeForm();
            this.feedback.success('Thêm khóa học thành công.');
          }
          this.formLoading = false;
        },
        error: () => {
          this.feedback.error('Không thể thêm khóa học.');
          this.formLoading = false;
        }
      });
    }
  }

  async onDelete(course: Course): Promise<void> {
    const accepted = await this.feedback.confirm({
      title: 'Xóa khóa học?',
      message: `Khóa học "${course.title}" sẽ bị xóa khỏi hệ thống. Thao tác này không thể hoàn tác.`,
      confirmText: 'Xóa khóa học',
      danger: true
    });
    if (!accepted) return;

    this.courseService.deleteCourse(course.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadCourses();
          this.feedback.success('Xóa khóa học thành công.');
        }
      },
      error: () => this.feedback.error('Không thể xóa khóa học.')
    });
  }

  get filteredCourses(): Course[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) return this.courses;
    return this.courses.filter(course => [
      course.id,
      course.title,
      course.language,
      course.level,
      course.tuition_fee,
      course.instructor_name,
      course.max_students,
      course.enrolled_count,
      course.status,
      course.schedule,
      course.duration
    ].some(value => String(value ?? '').toLowerCase().includes(keyword)));
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCourses.length / this.pageSize));
  }

  get paginatedCourses(): Course[] {
    this.normalizePage();
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCourses.slice(start, start + this.pageSize);
  }

  get visiblePages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1)
      .filter(page => page === 1 || page === this.totalPages || Math.abs(page - this.currentPage) <= 1);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  changePage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  normalizePage(): void {
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }
}
