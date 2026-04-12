# YÊU CẦU VẼ BIỂU ĐỒ UML - HỆ THỐNG ĐĂNG KÝ HỌC

## THÔNG TIN HỆ THỐNG
- **Tên hệ thống**: Hệ thống Quản lý Đăng ký Học (Dangkyhoc)
- **Loại**: Web Application (Angular Frontend + Express Backend + MySQL)
- **Actor chính**: Khách (Guest), Học viên (Student), Quản trị viên (Admin)

---

## 1. USE CASE DIAGRAM (Biểu đồ Use Case tổng quan)

### Actors
1. **Khách (Guest)** - Người chưa đăng nhập
2. **Học viên (Student)** - Người đã đăng ký khóa học
3. **Quản trị viên (Admin)** - Người quản lý hệ thống

### Use Cases tổng quan (Package: Public)
| ID | Tên Use Case | Mô tả |
|----|--------------|-------|
| UC1 | Xem trang chủ | Hiển thị giới thiệu, khóa học nổi bật |
| UC2 | Xem danh sách khóa học | Lọc theo ngôn ngữ, cấp độ, học phí |
| UC3 | Xem chi tiết khóa học | Xem mô tả, giảng viên, lịch học |
| UC4 | Đăng ký khóa học | Gửi form đăng ký |
| UC5 | Gửi liên hệ | Gửi yêu cầu liên hệ |
| UC6 | Trò chuyện với Chatbot | Hỏi đáp với AI chatbot |
| UC7 | Xem diễn đàn | Xem danh sách bài viết |
| UC8 | Đọc bài viết | Xem chi tiết + tăng lượt xem |
| UC9 | Like/Dislike bài viết | React với bài viết |
| UC10 | Xem giảng viên | Xem danh sách giảng viên |

### Use Cases tổng quan (Package: Admin)
| ID | Tên Use Case | Mô tả |
|----|--------------|-------|
| UC11 | Đăng nhập Admin | Xác thực JWT |
| UC12 | Xem Dashboard | Thống kê biểu đồ Highcharts |
| UC13 | Quản lý khóa học | CRUD + gán giảng viên |
| UC14 | Quản lý giảng viên | CRUD giảng viên |
| UC15 | Quản lý đăng ký | Duyệt/cập nhật trạng thái |
| UC16 | Quản lý liên hệ | Duyệt/cập nhật trạng thái |
| UC17 | Quản lý diễn đàn | CRUD bài viết, publish/unpublish |
| UC18 | Quản lý cài đặt | Cập nhật ảnh giới thiệu |

### Associations
```
Guest -> UC1, UC2, UC3, UC4, UC5, UC6, UC7, UC8, UC9, UC10
Admin -> UC11, UC12, UC13, UC14, UC15, UC16, UC17, UC18
Admin extends UC12 (sau UC11)
Admin extends UC13 (sau UC11)
...
```

### Include/Extend
- UC4 (Đăng ký) **include** UC3 (Xem chi tiết khóa học)
- UC8 (Đọc bài) **include** UC7 (Xem danh sách)
- UC12 (Dashboard) **include** UC15 (để tính registration stats)
- UC13 (QL Khóa học) **include** UC14 (gán giảng viên)

---

## 2. USE CASE DECOMPOSITION (Phân rã Use Case chi tiết)

### 2.1 UC4 - Đăng ký khóa học (Registration)

```
+----------------+
|  Đăng ký      |
|  khóa học     |
+----------------+
| UC4.1: Mở form|
| UC4.2: Chọn   |
|    khóa học   |
| UC4.3: Nhập  |
|    thông tin  |
| UC4.4: Validate|
| UC4.5: Gửi   |
|    request    |
| UC4.6: Nhận  |
|    phản hồi  |
+----------------+
```

**Luồng chính (Main Flow)**:
1. Học viên mở `/register`
2. Chọn khóa học (hoặc từ `/register/:courseId`)
3. Nhập: full_name, phone, email, date_of_birth, gender, address, course_id, note
4. Validate: email format, phone format, required fields
5. POST `/api/registrations`
6. Backend INSERT `course_registrations`
7. Trả về `{ id, message }`
8. Hiển thị thông báo thành công

**Luồng phụ (Alternative Flow)**:
- A1: Email không hợp lệ -> báo lỗi, không submit
- A2: Khóa học không tồn tại -> báo lỗi
- A3: Submit thất bại -> hiển thị thông báo lỗi

---

### 2.2 UC11 - Đăng nhập Admin

```
+----------------+
|  Đăng nhập   |
|  Admin        |
+----------------+
| UC11.1: Nhập  |
|    username   |
| UC11.2: Nhập  |
|    password   |
| UC11.3: Submit|
| UC11.4: Validate|
| UC11.5: Tạo  |
|    JWT token |
| UC11.6: Lưu  |
|    localStorage|
| UC11.7: Redirect|
+----------------+
```

**Luồng chính**:
1. Nhập username, password
2. POST `/api/admin/login`
3. Backend: SELECT admins WHERE username=?
4. bcrypt.compare(password, password_hash)
5. jwt.sign({ id, username, full_name }, secret, { expiresIn })
6. Trả về { token, admin }
7. Lưu localStorage.admin_token + admin_info
8. Redirect `/admin/dashboard`

**Luồng phụ**:
- A1: Sai username -> 401
- A2: Sai password -> 401
- A3: Token hết hạn -> redirect login

---

### 2.3 UC13 - Quản lý khóa học (CRUD)

```
+-------------------------+
|  Quản lý khóa học      |
+-------------------------+
| UC13.1: Xem danh sách   |
| UC13.2: Thêm khóa mới   |
| UC13.3: Sửa thông tin   |
| UC13.4: Gán giảng viên  |
| UC13.5: Xóa khóa học    |
| UC13.6: Kích hoạt/ẩn    |
+-------------------------+
```

**Luồng chính (Create)**:
1. Admin vào `/admin/courses`
2. Bấm "Thêm khóa học"
3. Mở modal, nhập thông tin + chọn giảng viên
4. POST `/api/admin/courses`
5. Backend INSERT courses (có instructor_id)
6. Trả về thành công
7. Refresh danh sách

**Luồng chính (Update)**:
1. Admin bấm sửa
2. PUT `/api/admin/courses/:id`
3. Backend UPDATE courses
4. Trả về thành công

**Luồng chính (Delete)**:
1. Admin bấm xóa
2. DELETE `/api/admin/courses/:id`
3. Backend DELETE (hoặc soft delete)

---

### 2.4 UC15 - Quản lý đăng ký

```
+-------------------------+
|  Quản lý đăng ký       |
+-------------------------+
| UC15.1: Xem danh sách   |
| UC15.2: Tìm kiếm       |
| UC15.3: Lọc theo KH     |
| UC15.4: Duyệt đăng ký  |
| UC15.5: Từ chối        |
| UC15.6: Cập nhật TT    |
+-------------------------+
```

**Luồng chính (Update Status)**:
1. Admin vào `/admin/registrations`
2. Chọn đăng ký -> chọn status (pending/confirmed/rejected/cancelled)
3. PATCH `/api/admin/registrations/:id/status` body `{ status }`
4. Backend UPDATE `course_registrations.status`
5. Trả về thành công
6. Refresh danh sách

---

### 2.5 UC9 - Like/Dislike bài viết

```
+-------------------------+
|  Like/Dislike bài viết  |
+-------------------------+
| UC9.1: Bấm reaction     |
| UC9.2: Lấy session_id   |
| UC9.3: Gửi reaction     |
| UC9.4: Toggle logic     |
| UC9.5: Cập nhật DB      |
| UC9.6: Cập nhật UI      |
+-------------------------+
```

**Luồng chính**:
1. Lấy `session_id` từ localStorage
2. Bấm Like/Dislike
3. POST `/api/forum/:id/react` body `{ session_id, reaction }`
4. Backend: Tìm post_reactions theo (post_id, session_id)
   - Nếu trùng reaction -> DELETE + giảm likes/dislikes (toggle off)
   - Nếu khác reaction -> UPDATE + điều chỉnh likes/dislikes
   - Nếu chưa có -> INSERT + tăng likes/dislikes
5. Trả về likes/dislikes mới
6. UI cập nhật số + active state

---

## 3. SEQUENCE DIAGRAM (Biểu đồ tuần tự)

### 3.1 Sequence: Đăng ký khóa học

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│ Student │     │ Frontend │     │ Backend API │     │ Controller│     │ Database │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │ submit form    │                  │                 │               │
     │───────────────>│ POST /api/regs   │                 │               │
     │                │─────────────────>│                 │               │
     │                │                  │ validate email  │               │
     │                │                  │────────────────>│               │
     │                │                  │                 │ check course │
     │                │                  │                 │──────────────>│
     │                │                  │                 │<──────────────│
     │                │                  │ INSERT reg      │               │
     │                │                  │                 │──────────────>│
     │                │                  │                 │<──────────────│
     │                │<─────────────────│ 201 { id }       │               │
     │ success msg    │                  │                 │               │
     │<───────────────│                  │                 │               │
```

### 3.2 Sequence: Admin Login

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│  Admin  │     │ Frontend │     │ Backend API │     │ Controller│     │ Database │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │ login(username,│                  │                 │               │
     │   password)    │                  │                 │               │
     │───────────────>│ POST /api/admin/ │                 │               │
     │                │   login           │                 │               │
     │                │─────────────────>│                 │               │
     │                │                  │ SELECT admin     │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ bcrypt.compare   │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ jwt.sign         │               │
     │                │<─────────────────│ { token, admin } │               │
     │                │                  │                 │               │
     │ save localStg  │                  │                 │               │
     │ redirect /dash│                  │                 │               │
     │<───────────────│                  │                 │               │
```

### 3.3 Sequence: Admin Dashboard

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│  Admin  │     │ Frontend │     │ Backend API │     │ Controller│     │ Database │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │ view /dash     │                  │                 │               │
     │───────────────>│ GET /api/admin/  │                 │               │
     │                │   dashboard       │                 │               │
     │                │ (Bearer token)   │                 │               │
     │                │─────────────────>│ auth middleware │               │
     │                │                  │ jwt.verify       │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ COUNT courses   │               │
     │                │                  │────────────────>│               │
     │                │                  │ COUNT regs      │               │
     │                │                  │────────────────>│               │
     │                │                  │ SUM revenue     │               │
     │                │                  │────────────────>│               │
     │                │                  │ series by day   │               │
     │                │                  │────────────────>│               │
     │                │<─────────────────│ { stats, charts }              │
     │ render charts  │                  │                 │               │
     │<───────────────│                  │                 │               │
```

### 3.4 Sequence: Like/Dislike Forum Post

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│ Student │     │ Frontend │     │ Backend API │     │ Controller│     │ Database │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │ click like     │                  │                 │               │
     │───────────────>│ get session_id   │                 │               │
     │                │ from localStorage │                 │               │
     │                │ POST /api/forum/  │                 │               │
     │                │   :id/react       │                 │               │
     │                │─────────────────>│                 │               │
     │                │                  │ find reaction   │               │
     │                │                  │ (post_id, sess)  │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ toggle logic     │               │
     │                │                  │ UPDATE/INSERT/   │               │
     │                │                  │   DELETE react   │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ UPDATE likes/    │               │
     │                │                  │   dislikes       │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │<─────────────────│ { likes, dislikes }            │
     │ update btn     │                  │                 │               │
     │<───────────────│                  │                 │               │
```

### 3.5 Sequence: Admin CRUD Course

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│  Admin  │     │ Frontend │     │ Backend API │     │ Controller│     │ Database │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │--- VIEW LIST ---│                  │                 │               │
     │                │ GET /api/admin/   │                 │               │
     │                │   courses         │                 │               │
     │                │─────────────────>│ SELECT courses   │               │
     │                │                  │ JOIN instructors │               │
     │                │                  │────────────────>│               │
     │                │<─────────────────│ [courses list]   │               │
     │<───────────────│                  │                 │               │
     │                │                  │                 │               │
     │--- CREATE ---│                  │                 │               │
     │                │ POST /api/admin/ │                 │               │
     │                │   courses        │                 │               │
     │                │ (with instructor │                 │               │
     │                │   _id)           │                 │               │
     │                │─────────────────>│ INSERT course    │               │
     │                │                  │ (instructor_id)  │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │<─────────────────│ { success }      │               │
     │                │                  │                 │               │
     │--- UPDATE ---│                  │                 │               │
     │                │ PUT /api/admin/   │                 │               │
     │                │   courses/:id     │                 │               │
     │                │─────────────────>│ UPDATE course    │               │
     │                │                  │ (instructor_id)  │               │
     │                │                  │────────────────>│               │
     │                │<─────────────────│ { success }      │               │
     │                │                  │                 │               │
     │--- DELETE ---│                  │                 │               │
     │                │ DELETE /api/admin│                 │               │
     │                │   /courses/:id   │                 │               │
     │                │─────────────────>│ DELETE course    │               │
     │                │                  │────────────────>│               │
     │                │<─────────────────│ { success }      │               │
```

### 3.6 Sequence: Chatbot

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌───────────┐     ┌──────────┐
│ Student │     │ Frontend │     │ Backend API │     │ Controller│     │ Service  │
└────┬────┘     └─────┬────┘     └──────┬──────┘     └─────┬─────┘     └────┬─────┘
     │                │                  │                 │               │
     │ type message   │                  │                 │               │
     │ send           │                  │                 │               │
     │───────────────>│ POST /api/chatbot│                 │               │
     │                │   /message       │                 │               │
     │                │   { message }    │                 │               │
     │                │─────────────────>│                 │               │
     │                │                  │ process message│               │
     │                │                  │────────────────>│               │
     │                │                  │ getResponse()   │               │
     │                │                  │ (rule-based)    │               │
     │                │                  │────────────────>│               │
     │                │                  │<────────────────│               │
     │                │                  │ INSERT log      │               │
     │                │                  │ (user, bot)     │               │
     │                │                  │────────────────>│               │
     │                │<─────────────────│ { reply }       │               │
     │ display reply  │                  │                 │               │
     │<───────────────│                  │                 │               │
```

---

## 4. ACTIVITY DIAGRAM (Biểu đồ hoạt động)

### 4.1 Activity: Đăng ký khóa học

```
┌─────────────────┐
│   Bắt đầu      │
│  (Start)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mở trang       │
│ /register      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Chọn khóa học  │─────────────>│ Chọn từ danh   │
│ (từ dropdown)  │             │   sách KH       │
└────────┬────────┘             └────────┬────────┘
         │ Yes                        │
         │                            │
         ▼                            ▼
┌─────────────────┐
│ Nhập thông tin │
│ form đăng ký   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Validate form   │─────────────>│ Hiện lỗi       │
│ (email, phone,  │             │ validate        │
│  required)     │             └────────┬────────┘
└────────┬────────┘                      │
         │ Yes                           │
         ▼                               │
┌─────────────────┐                      │
│ POST /api/regs  │                      │
│ đến Backend    │                      │
└────────┬────────┘                      │
         │                               │
         ▼                               │
┌─────────────────┐    Không    ┌─────────────────┐
│ Backend validate│─────────────>│ Hiện thông báo │
│ thành công?     │             │ lỗi server      │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│ INSERT vào DB  │
│ course_registr. │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Trả về { id }  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hiển thị thông │
│ báo thành công │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Kết thúc        │
│  (End)         │
└─────────────────┘
```

### 4.2 Activity: Admin Login

```
┌─────────────────┐
│   Bắt đầu      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mở /admin/login│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Nhập username  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Nhập password   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Click Submit    │────────────>│ Hiện lỗi       │
│                 │             │ (form invalid) │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│ POST /api/admin │
│ /login          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Tìm thấy       │─────────────>│ Hiện "Sai      │
│ admin?         │             │  username"     │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Password đúng?  │────────────>│ Hiện "Sai      │
│ (bcrypt.compare)│             │  password"     │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Tạo JWT token   │
│ (jwt.sign)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Lưu localStorage│
│ admin_token +   │
│ admin_info      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirect        │
│ /admin/dashboard│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Kết thúc       │
└─────────────────┘
```

### 4.3 Activity: Like/Dislike bài viết

```
┌─────────────────┐
│   Bắt đầu      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Bấm Like/Dislike│
│ trên bài viết   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Lấy session_id  │
│ từ localStorage │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ POST /api/forum │
│ /:id/react      │
│ { session_id,   │
│   reaction }    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Đã có reaction │─────────────>│ INSERT new     │
│ cho (post,sess)?│             │ reaction       │
└────────┬────────┘             │ +1 like/dislike│
         │ Yes                  └────────┬────────┘
         ▼                               │
┌─────────────────┐                      │
│ Reaction mới    │                      │
│ = reaction cũ?  │                      │
└────────┬────────┘                      │
         │ Yes                           │
         ▼                               │
┌─────────────────┐                      │
│ TOGGLE OFF      │                      │
│ DELETE reaction │                      │
│ -1 like/dislike│                      │
└────────┬────────┘                      │
         │ No                            │
         ▼                               │
┌─────────────────┐                      │
│ Đổi reaction    │                      │
│ UPDATE reaction │                      │
│ -1 dislike/+1  │                      │
│ like (hoặc     │                      │
│ ngược lại)      │                      │
└────────┬────────┘                      │
         │                               │
         ▼                               │
┌─────────────────┐
│ UPDATE likes/   │
│ dislikes trong  │
│ forum_posts     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Trả về new      │
│ likes/dislikes  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cập nhật UI:   │
│ số + active    │
│ button state   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Kết thúc       │
└─────────────────┘
```

### 4.4 Activity: Admin Dashboard

```
┌─────────────────┐
│   Bắt đầu      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Truy cập       │
│ /admin/dashboard│
└────────┬────────┘
         │
         ▼
┌─────────────────┐    Không    ┌─────────────────┐
│ Có admin_token?│────────────>│ Redirect        │
│                │             │ /admin/login    │
└────────┬────────┘             └─────────────────┘
         │ Yes
         ▼
┌─────────────────┐
│ GET /api/admin  │
│ /dashboard      │
│ (Bearer token)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend:        │
│ COUNT courses   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend:        │
│ COUNT regs      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend:        │
│ SUM revenue     │
│ (confirmed only)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend:        │
│ Chart series    │
│ (by day, by    │
│  course)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Trả về stats + │
│ chart data      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Frontend:       │
│ Render 3 charts │
│ - Area chart   │
│ - Pie chart    │
│ - Column chart │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Kết thúc       │
└─────────────────┘
```

---

## 5. TÓM TẮT CÁC ACTORS VÀ USE CASES

### 5.1 Actor: Guest (Khách)
| UC | Tên | Endpoint/API |
|----|-----|--------------|
| UC1 | Xem trang chủ | GET /api/courses |
| UC2 | Xem danh sách khóa học | GET /api/courses |
| UC3 | Xem chi tiết khóa học | GET /api/courses/:id |
| UC4 | Đăng ký khóa học | POST /api/registrations |
| UC5 | Gửi liên hệ | POST /api/contacts |
| UC6 | Trò chuyện chatbot | POST /api/chatbot/message |
| UC7 | Xem danh sách forum | GET /api/forum |
| UC8 | Đọc chi tiết forum | GET /api/forum/:id |
| UC9 | Like/Dislike | POST /api/forum/:id/react |
| UC10 | Xem giảng viên | GET /api/instructors |

### 5.2 Actor: Admin (Quản trị viên)
| UC | Tên | Endpoint/API |
|----|-----|--------------|
| UC11 | Đăng nhập | POST /api/admin/login |
| UC12 | Xem Dashboard | GET /api/admin/dashboard |
| UC13 | CRUD Khóa học | GET/POST/PUT/DELETE /api/admin/courses |
| UC14 | CRUD Giảng viên | GET/POST/PUT/DELETE /api/admin/instructors |
| UC15 | QL Đăng ký | GET /api/admin/registrations; PATCH /api/admin/registrations/:id/status |
| UC16 | QL Liên hệ | GET /api/admin/contacts; PATCH /api/admin/contacts/:id/status |
| UC17 | QL Forum | GET/POST/PUT/DELETE /api/admin/forum |
| UC18 | QL Cài đặt | GET/PUT /api/admin/settings |

---

## 6. CÁC ENTITY/DATABASE CHÍNH

| Bảng | Mô tả | Các cột chính |
|------|-------|---------------|
| admins | Tài khoản admin | id, username, password_hash, full_name |
| courses | Khóa học | id, name, language, level, description, schedule, tuition_fee, instructor_id, is_active |
| instructors | Giảng viên | id, name, email, phone, expertise, bio, avatar, is_active |
| course_registrations | Đăng ký | id, course_id, full_name, phone, email, date_of_birth, gender, address, note, status |
| contact_requests | Liên hệ | id, name, email, phone, subject, message, status |
| forum_posts | Bài viết forum | id, title, content, author_id, views, likes, dislikes, is_published, created_at |
| post_reactions | Reaction | id, post_id, session_id, reaction (like/dislike) |
| chatbot_logs | Chatbot | id, user_message, bot_response, created_at |
| center_settings | Cài đặt | id, setting_key, setting_value |

---

## YÊU CẦU VẼ STARUML

Hãy vẽ các biểu đồ sau bằng StarUML:

1. **[Use Case Diagram]** - Tổng quan toàn hệ thống với 2 package (Public, Admin), 3 actors, 18 use cases, các include/extend relationships

2. **[Use Case Decomposition]** - Chi tiết cho:
   - UC4 (Đăng ký khóa học)
   - UC11 (Đăng nhập Admin)
   - UC13 (Quản lý khóa học)
   - UC15 (Quản lý đăng ký)
   - UC9 (Like/Dislike)

3. **[Sequence Diagrams]** - Cho các luồng:
   - Guest đăng ký khóa học
   - Admin đăng nhập
   - Admin xem dashboard
   - Student like/dislike bài viết forum
   - Admin CRUD khóa học
   - User chat với chatbot

4. **[Activity Diagrams]** - Cho các luồng:
   - Đăng ký khóa học (có validate, error handling)
   - Admin đăng nhập (có check username/password)
   - Like/Dislike bài viết (có toggle logic)
   - Admin xem dashboard (có auth check)

**Mỗi biểu đồ cần có**:
- Tiêu đề rõ ràng
- Tên actors/use cases/objects đúng với danh sách trên
- Mũi tên và kết nối đúng flow
- Swimlanes cho activity diagrams
