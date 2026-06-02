import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.scss'
})
export class AdminFeedbackComponent {
  toasts$ = this.feedback.toasts$;
  confirm$ = this.feedback.confirm$;

  constructor(private feedback: AdminFeedbackService) {}

  dismiss(id: number): void {
    this.feedback.dismiss(id);
  }

  resolve(value: boolean): void {
    this.feedback.resolveConfirm(value);
  }
}
