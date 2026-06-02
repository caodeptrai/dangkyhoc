import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AdminToastType = 'success' | 'error' | 'info' | 'warning';

export interface AdminToast {
  id: number;
  message: string;
  type: AdminToastType;
}

export interface AdminConfirmState {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  danger: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminFeedbackService {
  private toastId = 0;
  private toastsSubject = new BehaviorSubject<AdminToast[]>([]);
  private confirmSubject = new BehaviorSubject<AdminConfirmState | null>(null);
  private confirmResolver: ((value: boolean) => void) | null = null;

  toasts$ = this.toastsSubject.asObservable();
  confirm$ = this.confirmSubject.asObservable();

  notify(message: string, type: AdminToastType = 'success', duration = 3200): void {
    const toast: AdminToast = { id: ++this.toastId, message, type };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    window.setTimeout(() => this.dismiss(toast.id), duration);
  }

  success(message: string): void {
    this.notify(message, 'success');
  }

  error(message: string): void {
    this.notify(message, 'error');
  }

  warning(message: string): void {
    this.notify(message, 'warning');
  }

  dismiss(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter(toast => toast.id !== id));
  }

  confirm(options: Partial<AdminConfirmState>): Promise<boolean> {
    if (this.confirmResolver) {
      this.resolveConfirm(false);
    }

    const state: AdminConfirmState = {
      title: options.title || 'Xác nhận thao tác',
      message: options.message || 'Bạn có chắc muốn tiếp tục?',
      confirmText: options.confirmText || 'Xác nhận',
      cancelText: options.cancelText || 'Hủy',
      danger: options.danger ?? false
    };

    this.confirmSubject.next(state);
    return new Promise<boolean>((resolve) => {
      this.confirmResolver = resolve;
    });
  }

  resolveConfirm(value: boolean): void {
    if (this.confirmResolver) {
      this.confirmResolver(value);
      this.confirmResolver = null;
    }
    this.confirmSubject.next(null);
  }
}
