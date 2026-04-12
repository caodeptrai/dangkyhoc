import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact.model';

@Component({
  selector: 'app-admin-contact-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact-management.component.html',
  styleUrl: './admin-contact-management.component.scss'
})
export class AdminContactManagementComponent implements OnInit {
  contacts: Contact[] = [];
  loading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (res) => {
        this.contacts = res.data ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleStatus(contact: Contact): void {
    const newStatus = contact.status === 'pending' ? 'processed' : 'pending';
    this.contactService.updateStatus(contact.id, newStatus).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadContacts();
        }
      }
    });
  }

  truncate(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  }
}
