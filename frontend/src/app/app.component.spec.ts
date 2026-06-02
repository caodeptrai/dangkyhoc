import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

class RouterStub {
  events = new Subject<NavigationEnd>();
}

describe('AppComponent', () => {
  it('should create the application shell', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should detect admin routes from router navigation events', () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useClass: RouterStub }
      ]
    });

    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router) as unknown as RouterStub;

    router.events.next(new NavigationEnd(1, '/admin/login', '/admin/login'));
    expect(fixture.componentInstance.isAdminRoute).toBeTrue();
    expect(fixture.componentInstance.isAdminLogin).toBeTrue();

    router.events.next(new NavigationEnd(2, '/courses', '/courses'));
    expect(fixture.componentInstance.isAdminRoute).toBeFalse();
    expect(fixture.componentInstance.isAdminLogin).toBeFalse();
  });

  it('should expose public and admin API routes', () => {
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('courses');
    expect(paths).toContain('register/:courseId');
    expect(paths).toContain('contact');
    expect(paths).toContain('forum/:id');
    expect(paths).toContain('admin/dashboard');
    expect(paths).toContain('admin/courses');
  });
});
