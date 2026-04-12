import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  settings: any = {};

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getPublicSettings().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.settings = res.data;
        }
      },
      error: (err) => console.error('Lỗi khi tải cài đặt:', err)
    });
  }

  get addressLines(): string[] {
    const address = this.settings?.center_address;
    if (!address) {
      return ['123 Nguyễn Văn Linh, Quận 7, TP.HCM'];
    }
    if (address.includes('\n')) {
      return address.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0);
    } else {
      // Split by "CS1:", "S2:", "CS 2:", etc., using a lookahead regex so the matched "CS1:" is kept as part of the split string
      const parts = address.split(/(?=\bCS\s*\d+:|\bS\s*\d+:)/i);
      return parts.map((line: string) => line.trim()).filter((line: string) => line.length > 0);
    }
  }
}
