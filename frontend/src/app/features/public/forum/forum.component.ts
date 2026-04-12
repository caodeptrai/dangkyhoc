import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ForumService } from '../../../core/services/forum.service';
import { ForumPost } from '../../../core/models/post.model';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit {
  posts: ForumPost[] = [];
  loading = true;

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.forumService.getPublishedPosts().subscribe({
      next: res => { this.posts = res.data || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
