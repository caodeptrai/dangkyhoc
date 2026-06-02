# Hà Ninh - Hệ thống Đăng ký Khóa học Trung tâm Ngoại ngữ

Website đăng ký khóa học cho trung tâm ngoại ngữ, tích hợp chatbot AI tư vấn.

## Tech Stack

- **Frontend**: Angular 17 (Standalone Components, SCSS)
- **Backend**: Node.js + Express.js
- **Database**: MySQL (XAMPP)
- **Authentication**: JWT + bcryptjs

## Cấu trúc dự án

```
Dangkyhoc/
├── database/
│   └── language_center_db.sql     # SQL schema + seed data
├── backend/
│   ├── src/
│   │   ├── config/db.js           # MySQL connection
│   │   ├── controllers/           # Route handlers
│   │   ├── middleware/            # Auth, error handling
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── app.js                 # Express app
│   │   └── server.js              # Entry point
│   ├── .env                       # Environment config
│   └── package.json
├── frontend/
│   ├── src/app/
│   │   ├── core/                  # Guards, interceptors, services, models
│   │   ├── shared/                # Navbar, footer
│   │   ├── features/
│   │   │   ├── public/            # Home, courses, register, contact
│   │   │   ├── admin/             # Login, dashboard, CRUD management
│   │   │   └── chatbot/           # Chatbot widget
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   └── package.json
└── README.md
```

## Hướng dẫn Cài đặt & Chạy

### Bước 1: Chuẩn bị MySQL (XAMPP)

1. Khởi động **XAMPP Control Panel**
2. Start **Apache** và **MySQL**
3. Mở **phpMyAdmin**: http://localhost/phpmyadmin
4. Click tab **Import** hoặc chọn **SQL**
5. Copy toàn bộ nội dung file `database/language_center_db.sql`
6. Paste vào ô SQL và click **Go** (Thực thi)
7. Database `language_center_db` sẽ được tạo với đầy đủ bảng và dữ liệu mẫu

### Bước 2: Cấu hình Backend

1. Vào thư mục `backend/`
2. Kiểm tra file `.env` (đã có sẵn cấu hình cho XAMPP mặc định):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=language_center_db
JWT_SECRET=language_center_jwt_secret_2024_very_secure
JWT_EXPIRES_IN=24h
PORT=3000
```

3. Nếu MySQL có mật khẩu, cập nhật `DB_PASSWORD`

### Bước 3: Chạy Backend

```bash
cd backend
npm install
npm run dev
```

Backend chạy tại: http://localhost:3000
Health check: http://localhost:3000/api/health

### Bước 4: Chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm install
ng serve
```

Frontend chạy tại: http://localhost:4200

## Tài khoản Admin mẫu

| Username | Password  |
|----------|-----------|
| admin    | admin123  |

Đăng nhập tại: http://localhost:4200/admin/login

## API Endpoints

### Public
| Method | Endpoint                | Mô tả                    |
|--------|-------------------------|---------------------------|
| GET    | /api/courses            | Danh sách khóa học        |
| GET    | /api/courses/:id        | Chi tiết khóa học         |
| POST   | /api/registrations      | Đăng ký khóa học          |
| POST   | /api/contacts           | Gửi yêu cầu tư vấn       |
| POST   | /api/chatbot/message    | Gửi tin nhắn chatbot      |

### Admin (yêu cầu JWT)
| Method | Endpoint                               | Mô tả                    |
|--------|----------------------------------------|---------------------------|
| POST   | /api/admin/login                       | Đăng nhập admin           |
| GET    | /api/admin/dashboard                   | Thống kê tổng quan        |
| GET    | /api/admin/courses                     | Danh sách tất cả khóa học |
| POST   | /api/admin/courses                     | Thêm khóa học             |
| PUT    | /api/admin/courses/:id                 | Sửa khóa học              |
| DELETE | /api/admin/courses/:id                 | Xóa khóa học              |
| GET    | /api/admin/registrations               | Danh sách đăng ký         |
| PATCH  | /api/admin/registrations/:id/status    | Cập nhật trạng thái       |
| GET    | /api/admin/contacts                    | Danh sách yêu cầu tư vấn |
| PATCH  | /api/admin/contacts/:id/status         | Cập nhật trạng thái       |

## Chatbot AI OpenRouter

Chatbot backend sử dụng OpenRouter với model mặc định `deepseek/deepseek-v4-flash`. Mỗi câu hỏi sẽ được bổ sung ngữ cảnh dữ liệu website hiện có (khóa học, học phí, lịch học, ngày khai giảng, giảng viên, cài đặt trung tâm và bài viết đã xuất bản) để trả lời các nội dung liên quan đến website, đặc biệt là tư vấn khóa học.

Cấu hình trong `backend/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=deepseek/deepseek-v4-flash
OPENROUTER_SITE_URL=http://localhost:4200
OPENROUTER_APP_NAME=Dang Ky Hoc Language Center
OPENROUTER_TIMEOUT_MS=30000
```

Nếu chưa có `OPENROUTER_API_KEY` hoặc OpenRouter tạm lỗi, chatbot sẽ tự dùng phần trả lời dự phòng dựa trên dữ liệu website để API vẫn hoạt động.

## Dữ liệu mẫu

- 1 admin account
- 8 khóa học: Tiếng Anh Giao Tiếp, IELTS, TOEIC, Tiếng Trung Cơ Bản, Tiếng Trung Giao Tiếp, Tiếng Nhật N5, Tiếng Hàn Sơ Cấp, Tiếng Anh Trẻ Em
- 5 đăng ký mẫu
- 3 yêu cầu tư vấn mẫu
