import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../../core/services/dashboard.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, AfterViewChecked {
  stats: DashboardStats | null = null;
  loading = true;
  errorMsg = '';
  private chartsRendered = false;

  @ViewChild('registrationChart') registrationChartEl!: ElementRef;
  @ViewChild('courseChart') courseChartEl!: ElementRef;
  @ViewChild('revenueChart') revenueChartEl!: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        console.log('Dashboard API response:', res);
        if (res.success) {
          this.stats = res.data;
        } else {
          this.errorMsg = res.message || 'Lỗi tải dữ liệu';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Dashboard API error:', err);
        this.errorMsg = err.error?.message || 'Không thể kết nối API';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.stats && !this.chartsRendered && this.registrationChartEl?.nativeElement) {
      this.chartsRendered = true;
      setTimeout(() => this.renderCharts(), 50);
    }
  }

  formatCurrency(value: number): string {
    if (!value && value !== 0) return '0đ';
    return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
  }

  private renderCharts(): void {
    if (!this.stats) return;
    this.renderRegistrationByDayChart();
    this.renderRegistrationByCourseChart();
    this.renderRevenueByCourseChart();
  }

  private renderRegistrationByDayChart(): void {
    const el = this.registrationChartEl?.nativeElement;
    const data = this.stats?.registrationsByDay;
    if (!el || !data || data.length === 0) return;

    Highcharts.chart(el, {
      chart: { type: 'area', height: 320 },
      title: { text: 'Đăng ký theo ngày (7 ngày gần nhất)', style: { fontSize: '14px', fontWeight: '600' } },
      xAxis: {
        categories: data.map(d => {
          const dt = new Date(d.date);
          return dt.getDate() + '/' + (dt.getMonth() + 1);
        }),
        labels: { style: { fontSize: '11px' } }
      },
      yAxis: { title: { text: 'Số lượng' }, allowDecimals: false, min: 0 },
      series: [{
        name: 'Đăng ký',
        data: data.map(d => Number(d.count)),
        type: 'area',
        color: '#42a5f5',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(66,165,245,0.4)'], [1, 'rgba(66,165,245,0.02)']]
        },
        marker: { radius: 5 }
      }],
      legend: { enabled: false },
      credits: { enabled: false }
    });
  }

  private renderRegistrationByCourseChart(): void {
    const el = this.courseChartEl?.nativeElement;
    const data = this.stats?.registrationsByCourse;
    if (!el || !data || data.length === 0) return;

    Highcharts.chart(el, {
      chart: { type: 'pie', height: 320 },
      title: { text: 'Tỷ lệ đăng ký theo khóa học', style: { fontSize: '14px', fontWeight: '600' } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
            style: { fontSize: '11px' }
          }
        }
      },
      series: [{
        name: 'Đăng ký',
        type: 'pie',
        data: data.map(d => ({
          name: d.title.length > 25 ? d.title.substring(0, 25) + '...' : d.title,
          y: Number(d.count)
        }))
      }],
      credits: { enabled: false }
    });
  }

  private renderRevenueByCourseChart(): void {
    const el = this.revenueChartEl?.nativeElement;
    const data = this.stats?.revenueByCourse;
    if (!el || !data || data.length === 0) return;

    Highcharts.chart(el, {
      chart: { type: 'column', height: 320 },
      title: { text: 'Doanh thu theo khóa học', style: { fontSize: '14px', fontWeight: '600' } },
      xAxis: {
        categories: data.map(d => d.title.length > 18 ? d.title.substring(0, 18) + '...' : d.title),
        labels: { rotation: -30, style: { fontSize: '10px' } }
      },
      yAxis: { title: { text: 'Doanh thu (VNĐ)' }, min: 0 },
      series: [{
        name: 'Doanh thu',
        type: 'column',
        data: data.map(d => Number(d.revenue)),
        color: '#66bb6a'
      }],
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>Doanh thu: ' +
            Highcharts.numberFormat(this.y as number, 0, ',', '.') + 'đ';
        }
      },
      legend: { enabled: false },
      credits: { enabled: false }
    });
  }
}
