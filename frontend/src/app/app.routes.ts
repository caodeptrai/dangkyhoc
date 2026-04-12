import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent) },
  { path: 'courses', loadComponent: () => import('./features/public/course-list/course-list.component').then(m => m.CourseListComponent) },
  { path: 'courses/:id', loadComponent: () => import('./features/public/course-detail/course-detail.component').then(m => m.CourseDetailComponent) },
  { path: 'register', loadComponent: () => import('./features/public/register-course/register-course.component').then(m => m.RegisterCourseComponent) },
  { path: 'register/:courseId', loadComponent: () => import('./features/public/register-course/register-course.component').then(m => m.RegisterCourseComponent) },
  { path: 'contact', loadComponent: () => import('./features/public/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'forum', loadComponent: () => import('./features/public/forum/forum.component').then(m => m.ForumComponent) },
  { path: 'forum/:id', loadComponent: () => import('./features/public/forum-detail/forum-detail.component').then(m => m.ForumDetailComponent) },
  { path: 'admin/login', loadComponent: () => import('./features/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [authGuard] },
  { path: 'admin/courses', loadComponent: () => import('./features/admin/admin-course-management/admin-course-management.component').then(m => m.AdminCourseManagementComponent), canActivate: [authGuard] },
  { path: 'admin/instructors', loadComponent: () => import('./features/admin/admin-instructor-management/admin-instructor-management.component').then(m => m.AdminInstructorManagementComponent), canActivate: [authGuard] },
  { path: 'admin/registrations', loadComponent: () => import('./features/admin/admin-registration-management/admin-registration-management.component').then(m => m.AdminRegistrationManagementComponent), canActivate: [authGuard] },
  { path: 'admin/contacts', loadComponent: () => import('./features/admin/admin-contact-management/admin-contact-management.component').then(m => m.AdminContactManagementComponent), canActivate: [authGuard] },
  { path: 'admin/forum', loadComponent: () => import('./features/admin/admin-forum-management/admin-forum-management.component').then(m => m.AdminForumManagementComponent), canActivate: [authGuard] },
  { path: 'admin/settings', loadComponent: () => import('./features/admin/admin-settings/admin-settings.component').then(m => m.AdminSettingsComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
