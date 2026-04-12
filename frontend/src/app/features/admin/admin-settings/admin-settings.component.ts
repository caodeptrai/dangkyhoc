import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';

interface Setting {
  id: number;
  setting_key: string;
  setting_value: string;
  updated_at: string;
}

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent implements OnInit {
  settings: Setting[] = [];
  loading = false;
  saving = false;
  message = '';
  messageType = '';
  imageUrls: string[] = [];
  newImageUrl = '';

  settingLabels: Record<string, string> = {
    center_name: 'Tên trung tâm',
    center_phone: 'Số điện thoại',
    center_email: 'Email liên hệ',
    center_address: 'Địa chỉ',
    intro_images: 'Hình ảnh giới thiệu'
  };

  constructor(private settingsService: SettingsService) {}

  ngOnInit() { this.loadSettings(); }

  loadSettings() {
    this.loading = true;
    this.settingsService.getAllSettings().subscribe({
      next: res => {
        this.settings = (res.data || []) as Setting[];
        const imgSetting = this.settings.find(s => s.setting_key === 'intro_images');
        if (imgSetting && imgSetting.setting_value) {
          try { this.imageUrls = JSON.parse(imgSetting.setting_value); } catch { this.imageUrls = []; }
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getLabel(key: string): string {
    return this.settingLabels[key] || key;
  }

  isImageSetting(key: string): boolean {
    return key === 'intro_images';
  }

  addImage() {
    const url = this.newImageUrl.trim();
    if (!url) return;
    this.imageUrls.push(url);
    this.newImageUrl = '';
  }

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

  save() {
    this.saving = true;
    const payload = this.settings.map(s => {
      if (s.setting_key === 'intro_images') {
        return { key: s.setting_key, value: JSON.stringify(this.imageUrls) };
      }
      return { key: s.setting_key, value: s.setting_value };
    });
    this.settingsService.updateSettings(payload).subscribe({
      next: () => { this.saving = false; this.showMsg('Đã lưu cài đặt!', 'success'); },
      error: () => { this.saving = false; this.showMsg('Có lỗi xảy ra!', 'error'); }
    });
  }

  showMsg(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }
}
