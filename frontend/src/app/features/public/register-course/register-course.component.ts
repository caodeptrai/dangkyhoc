import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { RegistrationService } from '../../../core/services/registration.service';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-register-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss'],
})
export class RegisterCourseComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private courseService = inject(CourseService);
  private registrationService = inject(RegistrationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  registerForm!: FormGroup;
  courses: Course[] = [];
  submitted = false;
  loading = false;
  successMessage = '';

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: [''],
      gender: [''],
      address: [''],
      course_id: ['', Validators.required],
      note: [''],
    });

    this.loadCourses();

    this.route.params.subscribe((params) => {
      const courseId = params['courseId'];
      if (courseId) {
        this.registerForm.patchValue({ course_id: courseId });
      }
    });
  }

  loadCourses(): void {
    this.courseService.getPublicCourses().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.courses = response.data;
        }
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.registrationService.createRegistration(this.registerForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message || 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.';
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.loading = false;
        this.successMessage = err.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      },
    });
  }

  isCourseFull(course: Course): boolean {
    if (!course.max_students || !course.enrolled_count) return false;
    return course.enrolled_count >= course.max_students;
  }

  isCourseDisabled(course: Course): boolean {
    return course.status === 'finished' || this.isCourseFull(course);
  }

  getCourseOptionLabel(course: Course): string {
    let label = course.title;
    if (course.status === 'finished') {
      label += ' (Đã kết thúc)';
    } else if (this.isCourseFull(course)) {
      label += ' (Hết chỗ)';
    }
    return label;
  }
}
