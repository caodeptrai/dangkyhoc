import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../core/services/instructor.service';
import { Instructor } from '../../../core/models/instructor.model';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

@Component({
  selector: 'app-admin-instructor-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-instructor-management.component.html',
  styleUrl: './admin-instructor-management.component.scss'
})
export class AdminInstructorManagementComponent implements OnInit {
  instructors: Instructor[] = [];
  instructorForm: FormGroup;
  showModal = false;
  editingId: number | null = null;
  loading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private instructorService: InstructorService, private fb: FormBuilder, private feedback: AdminFeedbackService) {
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
      next: () => { this.showModal = false; this.loadInstructors(); this.feedback.success(this.editingId ? 'Cập nhật giảng viên thành công.' : 'Thêm giảng viên thành công.'); },
      error: () => { this.feedback.error('Không thể lưu giảng viên.'); }
    });
  }

  async delete(inst: Instructor): Promise<void> {
    const accepted = await this.feedback.confirm({
      title: 'Xóa giảng viên?',
      message: `Giảng viên "${inst.full_name}" sẽ bị xóa khỏi danh sách.`,
      confirmText: 'Xóa giảng viên',
      danger: true
    });
    if (!accepted) return;

    this.instructorService.deleteInstructor(inst.id).subscribe({
      next: () => { this.loadInstructors(); this.feedback.success('Xóa giảng viên thành công.'); },
      error: () => { this.feedback.error('Không thể xóa giảng viên.'); }
    });
  }

  get filteredInstructors(): Instructor[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) return this.instructors;
    return this.instructors.filter(inst => Object.values(inst as any).some(value => String(value ?? '').toLowerCase().includes(keyword)));
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredInstructors.length / this.pageSize)); }
  get paginatedInstructors(): Instructor[] { this.normalizePage(); const start = (this.currentPage - 1) * this.pageSize; return this.filteredInstructors.slice(start, start + this.pageSize); }
  get visiblePages(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1).filter(page => page === 1 || page === this.totalPages || Math.abs(page - this.currentPage) <= 1); }
  onSearchChange(): void { this.currentPage = 1; }
  changePage(page: number): void { this.currentPage = Math.min(Math.max(page, 1), this.totalPages); }
  normalizePage(): void { if (this.currentPage > this.totalPages) this.currentPage = this.totalPages; }
}
