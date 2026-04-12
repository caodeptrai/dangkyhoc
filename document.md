# Tóm tắt hệ thống V2 (Public + Admin)

Tài liệu này tổng hợp các chức năng hiện có và mô tả **lưu trình luồng dữ liệu** theo dạng:
**UI (frontend) -> HTTP request -> Middleware/Controller (backend) -> Truy vấn DB -> Response -> UI hiển thị**

## 0) Cấu hình & phạm vi

- Frontend routes: [`frontend/src/app/app.routes.ts`](d:\Project\Dangkyhoc\frontend\src\app\app.routes.ts)
- Backend routes/app: [`backend/src/app.js`](d:\Project\Dangkyhoc\backend\src\app.js)

## 1) Luồng chung cho Admin (Auth)

### 1.1. Admin Login (JWT)

**UI**
1. Vào `/admin/login`
2. Nhập `username`, `password` -> submit

**API**
3. Gọi `POST /api/admin/login` với body `{ username, password }`

**Backend xử lý**
4. Controller: [`backend/src/controllers/authController.js`](d:\Project\Dangkyhoc\backend\src\controllers\authController.js)
   - Query admin: `SELECT * FROM admins WHERE username=?`
   - Validate mật khẩu: `bcrypt.compare(password, password_hash)`
   - Tạo token: `jwt.sign({ id, username, full_name }, JWT_SECRET, { expiresIn })`

**Response**
5. Trả:
   - `token`
   - `admin` (id/username/full_name)

**UI**
6. Lưu vào:
   - `localStorage.admin_token`
   - `localStorage.admin_info`
7. Redirect vào `/admin/dashboard`

**Endpoint**
- Route: `POST /api/admin/login`

---

### 1.2. Guard route admin + gắn token vào request

**UI**
1. Truy cập `/admin/*`

**Frontend**
2. Guard: [`frontend/src/app/core/guards/auth.guard.ts`](d:\Project\Dangkyhoc\frontend\src\app\core\guards\auth.guard.ts)
   - Nếu không có `admin_token` -> điều hướng `/admin/login`

3. Interceptor: [`frontend/src/app/core/interceptors/auth.interceptor.ts`](d:\Project\Dangkyhoc\frontend\src\app\core\interceptors\auth.interceptor.ts)
   - Nếu có token -> gắn header `Authorization: Bearer <token>`

**Backend**
4. Middleware: [`backend/src/middleware/auth.js`](d:\Project\Dangkyhoc\backend\src\middleware\auth.js)
   - Parse header `Authorization`
   - `jwt.verify(token, JWT_SECRET)`
   - gán `req.admin = decoded`

**Response**
5. Nếu hợp lệ -> gọi controller tiếp
6. Nếu sai -> trả `401`

---

## 2) Public (Khách truy cập)

### 2.1. Home `/`

**UI**
1. Mở trang chủ `/`

**API**
2. Frontend gọi `GET /api/courses`

**Backend xử lý**
3. Route: [`backend/src/routes/courseRoutes.js`](d:\Project\Dangkyhoc\backend\src\routes\courseRoutes.js)
4. Controller: `getPublicCourses` trong [`backend/src/controllers/courseController.js`](d:\Project\Dangkyhoc\backend\src\controllers\courseController.js)
   - Query: `SELECT ... FROM courses c LEFT JOIN instructors i ... WHERE c.is_active=1`

**Response**
5. Trả danh sách course

**UI**
6. Home hiển thị các khóa học nổi bật (top 4)

---

### 2.2. Courses List `/courses` (có filter)

**UI**
1. Mở `/courses`
2. Filter `language/level/minFee/maxFee` + search (lọc trên client)

**API**
3. Gọi `GET /api/courses`

**Backend**
4. `getPublicCourses()` -> trả danh sách course + dữ liệu instructor (JOIN)

**UI**
5. `CourseListComponent` hiển thị danh sách đã filter

---

### 2.3. Course Detail `/courses/:id`

**UI**
1. Bấm vào một khóa học trong `/courses`
2. Điều hướng `/courses/<id>`

**API**
3. Gọi `GET /api/courses/:id`

**Backend**
4. Controller: `getPublicCourseById()`:
   - JOIN `instructors`
   - Điều kiện `c.id=? AND c.is_active=1`

**Response**
5. Trả course chi tiết

**UI**
6. `CourseDetailComponent` hiển thị mô tả, học phí, lịch học, giảng viên và nút đăng ký

---

### 2.4. Register Course `/register` hoặc `/register/:courseId`

**UI**
1. Mở trang đăng ký `/register`
2. Nếu có `:courseId` -> patch `course_id` vào form
3. Submit form

**API**
4. Gọi `POST /api/registrations` với payload:
   `{ full_name, phone, email, date_of_birth, gender, address, course_id, note }`

**Backend**
5. Route: [`backend/src/routes/registrationRoutes.js`](d:\Project\Dangkyhoc\backend\src\routes\registrationRoutes.js)
6. Controller: [`backend/src/controllers/registrationController.js`](d:\Project\Dangkyhoc\backend\src\controllers\registrationController.js)
   - Validate email/phone
   - Check course tồn tại và `is_active=1`
   - INSERT vào `course_registrations`

**Response**
7. Trả `201` + message + `{ id: insertId }`

**UI**
8. Hiển thị `successMessage`, reset form

---

### 2.5. Contact `/contact`

**UI**
1. Điền form liên hệ và submit

**API**
2. Gọi `POST /api/contacts`

**Backend**
3. Controller: [`backend/src/controllers/contactController.js`](d:\Project\Dangkyhoc\backend\src\controllers\contactController.js)
   - Validate required + email format
   - INSERT vào `contact_requests`

**Response**
4. Trả `201` + message

**UI**
5. Hiển thị thông báo thành công/thất bại

---

### 2.6. AI Chatbot Widget

**UI**
1. Người dùng nhập tin nhắn
2. Bấm gửi

**API**
3. Gọi `POST /api/chatbot/message` với `{ message }`

**Backend**
4. Route: [`backend/src/routes/chatbotRoutes.js`](d:\Project\Dangkyhoc\backend\src\routes\chatbotRoutes.js)
5. Controller: `sendMessage` trong [`backend/src/controllers/chatbotController.js`](d:\Project\Dangkyhoc\backend\src\controllers\chatbotController.js)
6. Service logic: [`backend/src/services/chatbotService.js`](d:\Project\Dangkyhoc\backend\src\services\chatbotService.js)
   - Rule-based theo keyword để sinh `reply`
   - INSERT vào `chatbot_logs (user_message, bot_response)`

**Response**
7. Trả `{ data: { reply } }`

**UI**
8. Render tin nhắn bot trong chat window

---

### 2.7. Forum (Public): list + detail + like/dislike

#### 2.7.1. List `/forum`

**UI**
1. Mở `/forum`

**API**
2. Gọi `GET /api/forum`

**Backend**
3. Controller: `getPublishedPosts()` trong [`backend/src/controllers/forumController.js`](d:\Project\Dangkyhoc\backend\src\controllers\forumController.js)
   - `WHERE fp.is_published = 1`
   - JOIN `admins` để lấy `author_name`

**Response**
4. Trả danh sách posts đã public

**UI**
5. `ForumComponent` render các card bài viết

#### 2.7.2. Detail `/forum/:id` + tăng view

**UI**
1. Bấm vào bài viết -> `/forum/<id>`

**API**
2. Gọi `GET /api/forum/:id`

**Backend**
3. `getPostDetail()`:
   - `UPDATE forum_posts SET views = views + 1 WHERE id=?`
   - Query chi tiết bài + JOIN admins

**Response**
4. Trả post detail

**UI**
5. `ForumDetailComponent` render nội dung

#### 2.7.3. Like/Dislike `POST /api/forum/:id/react`

**UI**
1. Bấm like/dislike
2. Lấy `session_id` từ `localStorage` key `forum_session_id`

**API**
3. Gọi `POST /api/forum/:id/react` với `{ session_id, reaction }` (`like` hoặc `dislike`)

**Backend**
4. `reactToPost()`:
   - Tìm reaction hiện tại trong `post_reactions` theo `(post_id, session_id)`
   - Nếu trùng reaction hiện tại -> **toggle off** (DELETE reaction, trừ likes/dislikes)
   - Nếu đổi loại -> UPDATE reaction + chỉnh likes/dislikes
   - Nếu chưa có -> INSERT reaction + cộng likes/dislikes

**Response**
5. Trả likes/dislikes mới

**UI**
6. Nút reaction hiển thị active theo `userReaction`

---

### 2.8. Danh sách giảng viên (phục vụ chọn giảng viên)

**API**
1. `GET /api/instructors`

**Backend**
2. `instructorController.getPublicInstructors()`:
   - `SELECT ... FROM instructors WHERE is_active=1`

---

### 2.9. Settings Public

**API**
1. `GET /api/settings/public`

**Backend**
2. `settingsController.getPublicSettings()`:
   - SELECT `center_settings`
   - build object `{ [setting_key]: setting_value }`

---

## 3) Admin

### 3.1. Admin Dashboard `/admin/dashboard` (Highcharts)

**UI**
1. Vào `/admin/dashboard`

**API**
2. Gọi `GET /api/admin/dashboard` (Authorization Bearer)

**Backend**
3. Route: [`backend/src/routes/dashboardRoutes.js`](d:\Project\Dangkyhoc\backend\src\routes\dashboardRoutes.js)
4. Controller: [`backend/src/controllers/dashboardController.js`](d:\Project\Dangkyhoc\backend\src\controllers\dashboardController.js)
   - Các số tổng: `COUNT(*)` cho courses/registrations/contacts/chat logs/instructors/posts
   - `dealCloseRate` = `confirmedRegistrations / totalRegistrations * 100`
   - `totalRevenue` = SUM `courses.tuition_fee` trên `course_registrations` có `status='confirmed'`
   - Series chart:
     - `registrationsByDay` (last 7 days)
     - `registrationsByCourse`
     - `revenueByCourse` (confirmed only)

**Response**
5. Trả `data` gồm các field thống kê + mảng series

**UI**
6. `AdminDashboardComponent` render:
   - Area chart: registrations by day
   - Pie chart: registrations by course
   - Column chart: revenue by course

---

### 3.2. Admin Courses CRUD + gán giảng viên `/admin/courses`

**UI**
1. Vào `/admin/courses`
2. Open modal thêm/sửa
3. Chọn giảng viên bằng dropdown (`instructor_id`)
4. Submit / Xóa

**API**
5. Load: `GET /api/admin/courses`
6. Create: `POST /api/admin/courses`
7. Update: `PUT /api/admin/courses/:id`
8. Delete: `DELETE /api/admin/courses/:id`

**Backend**
9. Controller trong [`backend/src/controllers/courseController.js`](d:\Project\Dangkyhoc\backend\src\controllers\courseController.js)
   - `createCourse`/`updateCourse` nhận `instructor_id`
   - List fetch có `JOIN instructors` để lấy instructor name hiển thị

---

### 3.3. Admin Instructors CRUD `/admin/instructors`

**UI**
1. Vào `/admin/instructors`
2. Thêm/sửa/xóa qua modal

**API**
3. Load: `GET /api/admin/instructors`
4. Create: `POST /api/admin/instructors`
5. Update: `PUT /api/admin/instructors/:id`
6. Delete: `DELETE /api/admin/instructors/:id`

**Backend**
7. Controller: [`backend/src/controllers/instructorController.js`](d:\Project\Dangkyhoc\backend\src\controllers\instructorController.js)

---

### 3.4. Admin Registrations Management `/admin/registrations`

**UI**
1. Vào `/admin/registrations`
2. Search/filter theo course
3. Update status đăng ký

**API**
4. Load: `GET /api/admin/registrations` (có `search`, `course_id`)
5. Update: `PATCH /api/admin/registrations/:id/status` body `{ status }`

**Backend**
6. Controller: [`backend/src/controllers/registrationController.js`](d:\Project\Dangkyhoc\backend\src\controllers\registrationController.js)
   - Validate status trong tập cho phép
   - UPDATE `course_registrations.status`

---

### 3.5. Admin Contacts Management `/admin/contacts`

**UI**
1. Vào `/admin/contacts`
2. Toggle status pending/processed

**API**
3. Load: `GET /api/admin/contacts`
4. Update: `PATCH /api/admin/contacts/:id/status` body `{ status }`

**Backend**
5. Controller: [`backend/src/controllers/contactController.js`](d:\Project\Dangkyhoc\backend\src\controllers\contactController.js)
   - validate status
   - UPDATE `contact_requests.status`

---

### 3.6. Admin Forum CRUD `/admin/forum`

**UI**
1. Vào `/admin/forum`
2. Thêm/sửa/xóa bài viết
3. Toggle `is_published`

**API**
4. Load: `GET /api/admin/forum`
5. Create: `POST /api/admin/forum`
6. Update: `PUT /api/admin/forum/:id`
7. Delete: `DELETE /api/admin/forum/:id`

**Backend**
8. Controller: [`backend/src/controllers/forumController.js`](d:\Project\Dangkyhoc\backend\src\controllers\forumController.js)
   - CRUD thao tác trên `forum_posts`

---

### 3.7. Admin Settings `/admin/settings` (Intro images)

**UI**
1. Vào `/admin/settings`
2. Nhập danh sách URL ảnh intro
3. Lưu thay đổi

**API**
4. Load: `GET /api/admin/settings`
5. Save: `PUT /api/admin/settings` body `{ settings: [{ key, value }, ...] }`

**Backend**
6. Controller: [`backend/src/controllers/settingsController.js`](d:\Project\Dangkyhoc\backend\src\controllers\settingsController.js)
   - `INSERT ... ON DUPLICATE KEY UPDATE`
   - với `intro_images` lưu JSON array vào `center_settings.setting_value`

