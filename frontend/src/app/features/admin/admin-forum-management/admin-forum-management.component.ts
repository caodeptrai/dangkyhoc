import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../core/services/forum.service';
import { ForumPost } from '../../../core/models/post.model';

@Component({
  selector: 'app-admin-forum-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-forum-management.component.html',
  styleUrl: './admin-forum-management.component.scss'
})
export class AdminForumManagementComponent implements OnInit {
  posts: ForumPost[] = [];
  postForm: FormGroup;
  showModal = false;
  editingId: number | null = null;
  loading = false;
  message = '';
  messageType = '';

  constructor(private forumService: ForumService, private fb: FormBuilder) {
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
      next: () => { this.showModal = false; this.loadPosts(); this.showMsg('Lưu thành công!', 'success'); },
      error: () => { this.showMsg('Có lỗi xảy ra!', 'error'); }
    });
  }

  delete(id: number) {
    if (!confirm('Xóa bài viết này?')) return;
    this.forumService.deletePost(id).subscribe({
      next: () => { this.loadPosts(); this.showMsg('Đã xóa!', 'success'); },
      error: () => { this.showMsg('Có lỗi xảy ra!', 'error'); }
    });
  }

  togglePublish(post: ForumPost) {
    this.forumService.updatePost(post.id, { is_published: !post.is_published }).subscribe({
      next: () => this.loadPosts(),
      error: () => {}
    });
  }

  showMsg(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }
}
