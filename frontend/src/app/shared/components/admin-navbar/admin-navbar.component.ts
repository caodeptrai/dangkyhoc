import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  adminName: string;

  constructor(private authService: AuthService, private router: Router) {
    const info = this.authService.getAdminInfo();
    this.adminName = info?.full_name || 'Admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
