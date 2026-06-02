import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact.model';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

@Component({
  selector: 'app-admin-contact-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-contact-management.component.html',
  styleUrl: './admin-contact-management.component.scss'
})
export class AdminContactManagementComponent implements OnInit {
  contacts: Contact[] = [];
  loading = true;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private contactService: ContactService, private feedback: AdminFeedbackService) {}

  ngOnInit(): void { this.loadContacts(); }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (res) => { this.contacts = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; this.feedback.error('Không thể tải danh sách yêu cầu tư vấn.'); }
    });
  }

  toggleStatus(contact: Contact): void {
    const newStatus = contact.status === 'pending' ? 'processed' : 'pending';
    this.contactService.updateStatus(contact.id, newStatus).subscribe({
      next: (res) => { if (res.success) { this.loadContacts(); this.feedback.success('Cập nhật trạng thái tư vấn thành công.'); } },
      error: () => this.feedback.error('Không thể cập nhật trạng thái tư vấn.')
    });
  }

  truncate(text: string, maxLength: number): string { return !text ? '' : text.length <= maxLength ? text : text.slice(0, maxLength) + '...'; }

  get filteredContacts(): Contact[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) return this.contacts;
    return this.contacts.filter(contact => Object.values(contact as any).some(value => String(value ?? '').toLowerCase().includes(keyword)));
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredContacts.length / this.pageSize)); }
  get paginatedContacts(): Contact[] { this.normalizePage(); const start = (this.currentPage - 1) * this.pageSize; return this.filteredContacts.slice(start, start + this.pageSize); }
  get visiblePages(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1).filter(page => page === 1 || page === this.totalPages || Math.abs(page - this.currentPage) <= 1); }
  onSearchChange(): void { this.currentPage = 1; }
  changePage(page: number): void { this.currentPage = Math.min(Math.max(page, 1), this.totalPages); }
  normalizePage(): void { if (this.currentPage > this.totalPages) this.currentPage = this.totalPages; }
}
