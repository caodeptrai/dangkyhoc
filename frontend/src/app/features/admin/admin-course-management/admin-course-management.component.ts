import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { InstructorService } from '../../../core/services/instructor.service';
import { Course } from '../../../core/models/course.model';
import { Instructor } from '../../../core/models/instructor.model';

@Component({
  selector: 'app-admin-course-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private fb: FormBuilder
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
          }
          this.formLoading = false;
        },
        error: () => {
          this.formLoading = false;
        }
      });
    } else {
      this.courseService.createCourse(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadCourses();
            this.closeForm();
          }
          this.formLoading = false;
        },
        error: () => {
          this.formLoading = false;
        }
      });
    }
  }

  onDelete(course: Course): void {
    if (window.confirm(`Bạn có chắc muốn xóa khóa học "${course.title}"?`)) {
      this.courseService.deleteCourse(course.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadCourses();
          }
        }
      });
    }
  }
}
