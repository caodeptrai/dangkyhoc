import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ForumService } from '../../../core/services/forum.service';
import { ForumPost } from '../../../core/models/post.model';

@Component({
  selector: 'app-forum-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forum-detail.component.html',
  styleUrl: './forum-detail.component.scss'
})
export class ForumDetailComponent implements OnInit {
  post: ForumPost | null = null;
  loading = true;
  reacting = false;
  userReaction: string | null = null;

  constructor(private route: ActivatedRoute, private forumService: ForumService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.forumService.getPostDetail(id).subscribe({
      next: res => { this.post = res.data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  react(type: 'like' | 'dislike') {
    if (!this.post || this.reacting) return;
    this.reacting = true;
    const sid = this.forumService.getSessionId();
    this.forumService.reactToPost(this.post.id, sid, type).subscribe({
      next: res => {
        if (this.post) {
          this.post.likes = res.data?.likes ?? this.post.likes;
          this.post.dislikes = res.data?.dislikes ?? this.post.dislikes;
        }
        this.userReaction = type;
        this.reacting = false;
      },
      error: () => { this.reacting = false; }
    });
  }
}
