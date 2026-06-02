import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../core/services/forum.service';
import { ForumPost } from '../../../core/models/post.model';
import { AdminFeedbackService } from '../../../core/services/admin-feedback.service';
import { AdminFeedbackComponent } from '../../../shared/components/admin-feedback/admin-feedback.component';

@Component({
  selector: 'app-admin-forum-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AdminFeedbackComponent],
  templateUrl: './admin-forum-management.component.html',
  styleUrl: './admin-forum-management.component.scss'
})
export class AdminForumManagementComponent implements OnInit {
  posts: ForumPost[] = [];
  postForm: FormGroup;
  showModal = false;
  editingId: number | null = null;
  loading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private forumService: ForumService, private fb: FormBuilder, private feedback: AdminFeedbackService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image_url: [''],
      is_published: [true]
    });
  }

  ngOnInit() { this.loadPosts(); }

  loadPosts() {
    this.loading = true;
    this.forumService.adminGetAllPosts().subscribe({
      next: res => { this.posts = res.data || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openAdd() {
    this.editingId = null;
    this.postForm.reset({ is_published: true });
    this.showModal = true;
  }

  openEdit(post: ForumPost) {
    this.editingId = post.id;
    this.postForm.patchValue(post);
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  save() {
    if (this.postForm.invalid) return;
    const data = this.postForm.value;
    const obs = this.editingId
      ? this.forumService.updatePost(this.editingId, data)
      : this.forumService.createPost(data);
    obs.subscribe({
      next: () => { this.showModal = false; this.loadPosts(); this.feedback.success(this.editingId ? 'Cập nhật bài viết thành công.' : 'Thêm bài viết thành công.'); },
      error: () => { this.feedback.error('Không thể lưu bài viết.'); }
    });
  }

  async delete(post: ForumPost): Promise<void> {
    const accepted = await this.feedback.confirm({
      title: 'Xóa bài viết?',
      message: `Bài viết "${post.title}" sẽ bị xóa vĩnh viễn.`,
      confirmText: 'Xóa bài viết',
      danger: true
    });
    if (!accepted) return;

    this.forumService.deletePost(post.id).subscribe({
      next: () => { this.loadPosts(); this.feedback.success('Xóa bài viết thành công.'); },
      error: () => { this.feedback.error('Không thể xóa bài viết.'); }
    });
  }

  togglePublish(post: ForumPost) {
    this.forumService.updatePost(post.id, { is_published: !post.is_published }).subscribe({
      next: () => { this.loadPosts(); this.feedback.success('Cập nhật trạng thái bài viết thành công.'); },
      error: () => { this.feedback.error('Không thể cập nhật trạng thái bài viết.'); }
    });
  }

  get filteredPosts(): ForumPost[] {
    const keyword = this.searchTerm.trim().toLowerCase();
    if (!keyword) return this.posts;
    return this.posts.filter(post => Object.values(post as any).some(value => String(value ?? '').toLowerCase().includes(keyword)));
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredPosts.length / this.pageSize)); }
  get paginatedPosts(): ForumPost[] { this.normalizePage(); const start = (this.currentPage - 1) * this.pageSize; return this.filteredPosts.slice(start, start + this.pageSize); }
  get visiblePages(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1).filter(page => page === 1 || page === this.totalPages || Math.abs(page - this.currentPage) <= 1); }
  onSearchChange(): void { this.currentPage = 1; }
  changePage(page: number): void { this.currentPage = Math.min(Math.max(page, 1), this.totalPages); }
  normalizePage(): void { if (this.currentPage > this.totalPages) this.currentPage = this.totalPages; }
}
