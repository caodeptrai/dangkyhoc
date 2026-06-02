import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

interface Setting {
  id: number;
  setting_key: string;
  setting_value: string;
  updated_at: string;
}

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent implements OnInit {
  settings: Setting[] = [];
  loading = false;
  saving = false;
  imageUrls: string[] = [];
  newImageUrl = '';

  requiredSettingKeys = [
    'website_name',
    'center_name',
    'center_phone',
    'center_email',
    'center_address',
    'contact_hotline',
    'contact_facebook',
    'contact_zalo',
    'contact_working_hours',
    'intro_images'
  ];

  settingLabels: Record<string, string> = {
    website_name: 'Tên website',
    center_name: 'Tên trung tâm',
    center_phone: 'Số điện thoại trung tâm',
    center_email: 'Email liên hệ',
    center_address: 'Địa chỉ',
    contact_hotline: 'Hotline tư vấn',
    contact_facebook: 'Facebook/Zalo OA',
    contact_zalo: 'Số Zalo tư vấn',
    contact_working_hours: 'Giờ làm việc',
    intro_images: 'Hình ảnh giới thiệu'
  };

  settingHints: Record<string, string> = {
    website_name: 'Tên hiển thị trên hệ thống, tiêu đề website hoặc sidebar admin.',
    center_address: 'Địa chỉ đầy đủ để hiển thị ở footer và trang liên hệ.',
    contact_facebook: 'Dán URL fanpage hoặc Zalo Official Account nếu có.',
    intro_images: 'Quản lý các URL ảnh giới thiệu ở trang chủ.'
  };

  constructor(private settingsService: SettingsService, private feedback: AdminFeedbackService) {}

  ngOnInit() { this.loadSettings(); }

  loadSettings() {
    this.loading = true;
    this.settingsService.getAllSettings().subscribe({
      next: res => {
        const loaded = (res.data || []) as Setting[];
        this.settings = this.mergeRequiredSettings(loaded);
        const imgSetting = this.settings.find(s => s.setting_key === 'intro_images');
        if (imgSetting && imgSetting.setting_value) {
          try { this.imageUrls = JSON.parse(imgSetting.setting_value); } catch { this.imageUrls = []; }
        }
        this.loading = false;
      },
      error: () => { this.loading = false; this.feedback.error('Không thể tải cài đặt hệ thống.'); }
    });
  }

  mergeRequiredSettings(loaded: Setting[]): Setting[] {
    const map = new Map(loaded.map(setting => [setting.setting_key, setting]));
    this.requiredSettingKeys.forEach(key => {
      if (!map.has(key)) {
        map.set(key, { id: 0, setting_key: key, setting_value: key === 'intro_images' ? '[]' : '', updated_at: '' });
      }
    });
    return Array.from(map.values()).sort((a, b) => this.getOrder(a.setting_key) - this.getOrder(b.setting_key));
  }

  getOrder(key: string): number {
    const index = this.requiredSettingKeys.indexOf(key);
    return index === -1 ? this.requiredSettingKeys.length + key.localeCompare('zzzz') : index;
  }

  getLabel(key: string): string { return this.settingLabels[key] || key; }
  getHint(key: string): string { return this.settingHints[key] || ''; }
  isImageSetting(key: string): boolean { return key === 'intro_images'; }

  addImage() {
    const url = this.newImageUrl.trim();
    if (!url) return;
    this.imageUrls.push(url);
    this.newImageUrl = '';
    this.feedback.success('Đã thêm ảnh vào danh sách. Nhấn Lưu thay đổi để áp dụng.');
  }

  removeImage(index: number) { this.imageUrls.splice(index, 1); }

  async save() {
    const accepted = await this.feedback.confirm({
      title: 'Lưu cài đặt hệ thống?',
      message: 'Các thông tin liên hệ, địa chỉ, tên website và hình ảnh giới thiệu sẽ được cập nhật cho toàn hệ thống.',
      confirmText: 'Lưu thay đổi'
    });
    if (!accepted) return;

    this.saving = true;
    const payload = this.settings.map(s => {
      if (s.setting_key === 'intro_images') return { key: s.setting_key, value: JSON.stringify(this.imageUrls) };
      return { key: s.setting_key, value: s.setting_value };
    });
    this.settingsService.updateSettings(payload).subscribe({
      next: () => { this.saving = false; this.feedback.success('Đã lưu cài đặt hệ thống thành công.'); },
      error: () => { this.saving = false; this.feedback.error('Không thể lưu cài đặt hệ thống.'); }
    });
  }
}
