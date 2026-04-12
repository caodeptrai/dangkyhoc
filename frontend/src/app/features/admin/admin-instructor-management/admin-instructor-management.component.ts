import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../core/services/instructor.service';
import { Instructor } from '../../../core/models/instructor.model';

@Component({
  selector: 'app-admin-instructor-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-instructor-management.component.html',
  styleUrl: './admin-instructor-management.component.scss'
})
export class AdminInstructorManagementComponent implements OnInit {
  instructors: Instructor[] = [];
  instructorForm: FormGroup;
  showModal = false;
  editingId: number | null = null;
  loading = false;
  message = '';
  messageType = '';

  constructor(private instructorService: InstructorService, private fb: FormBuilder) {
    this.instructorForm = this.fb.group({
      full_name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      specialization: [''],
      bio: [''],
      avatar_url: [''],
      is_active: [true]
    });
  }

  ngOnInit() { this.loadInstructors(); }

  loadInstructors() {
    this.loading = true;
    this.instructorService.getAllInstructors().subscribe({
      next: res => { this.instructors = res.data || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openAdd() {
    this.editingId = null;
    this.instructorForm.reset({ is_active: true });
    this.showModal = true;
  }

  openEdit(inst: Instructor) {
    this.editingId = inst.id;
    this.instructorForm.patchValue(inst);
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  save() {
    if (this.instructorForm.invalid) return;
    const data = this.instructorForm.value;
    const obs = this.editingId 
      ? this.instructorService.updateInstructor(this.editingId, data) 
      : this.instructorService.createInstructor(data);
    obs.subscribe({
      next: () => { this.showModal = false; this.loadInstructors(); this.showMsg('Lưu thành công!', 'success'); },
      error: () => { this.showMsg('Có lỗi xảy ra!', 'error'); }
    });
  }

  delete(id: number) {
    if (!confirm('Xóa giảng viên này?')) return;
    this.instructorService.deleteInstructor(id).subscribe({
      next: () => { this.loadInstructors(); this.showMsg('Đã xóa!', 'success'); },
      error: () => { this.showMsg('Có lỗi xảy ra!', 'error'); }
    });
  }

  showMsg(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }
}
