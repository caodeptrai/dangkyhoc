import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm: FormGroup = this.formBuilder.group({
    full_name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  submitted = false;
  loading = false;
  successMessage = '';
  isError = false;

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.isError = false;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    this.contactService.createContact(this.contactForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.isError = false;
        this.successMessage = response.message || 'Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm.';
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.successMessage = err.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      },
    });
  }
}
