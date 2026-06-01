# BÁO CÁO TEST CASE - HỆ THỐNG QUẢN LÝ ĐĂNG KÝ HỌC

---

## 1. THÔNG TIN CHUNG

| Trường | Nội dung |
|--------|----------|
| **Dự án** | Hệ thống Quản lý Đăng ký Học |
| **Ngày test** | 14/05/2026 |
| **Người thực hiện** | QA Team |
| **Môi trường test** | Backend API, Database MySQL |

---

## 2. KẾT QUẢ TEST CHI TIẾT

---

### Nhóm: UC04 - Đăng ký khóa học

#### 2.1 Test case đăng ký hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC001 | Đăng ký với dữ liệu hợp lệ | full_name: "Nguyễn Văn A", phone: "0909123456", email: "nguyenvana@example.com", course_id: 1 | `{ success: true, message: "Đăng ký thành công" }` | `{ success: true, message: "Đăng ký thành công" }` | **PASS** |

#### 2.2 Test case đăng ký không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC002 | Đăng ký thiếu họ tên | full_name: "", phone: "0909123456", email: "test@example.com", course_id: 1 | `{ success: false, message: "Vui lòng nhập họ tên" }` | `{ success: false, message: "Vui lòng nhập họ tên" }` | **PASS** |
| TC003 | Đăng ký với email sai format (#) | email: "nguyenvana#gmail.com" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |
| TC004 | Đăng ký với email thiếu @ | email: "nguyenvana.gmail.com" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |
| TC005 | Đăng ký với email thiếu domain | email: "nguyenvana@" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |
| TC006 | Đăng ký với SĐT sai format (chữ) | phone: "abc1234567" | `{ success: false, message: "Số điện thoại không hợp lệ" }` | `{ success: false, message: "Số điện thoại không hợp lệ" }` | **PASS** |
| TC007 | Đăng ký với SĐT thiếu số | phone: "0909" | `{ success: false, message: "Số điện thoại không hợp lệ" }` | `{ success: false, message: "Số điện thoại không hợp lệ" }` | **PASS** |
| TC008 | Đăng ký với SĐT có ký tự đặc biệt | phone: "0909-123-456" | `{ success: false, message: "Số điện thoại không hợp lệ" }` | `{ success: false, message: "Số điện thoại không hợp lệ" }` | **PASS** |
| TC009 | Đăng ký không chọn khóa học | course_id: null | `{ success: false, message: "Vui lòng chọn khóa học" }` | `{ success: false, message: "Vui lòng chọn khóa học" }` | **PASS** |
| TC010 | Đăng ký với khóa học không tồn tại | course_id: 99999 | `{ success: false, message: "Khóa học không tồn tại" }` | `{ success: false, message: "Khóa học không tồn tại" }` | **PASS** |

---

### Nhóm: UC05 - Gửi yêu cầu liên hệ

#### 2.3 Test case gửi liên hệ hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC011 | Gửi liên hệ với dữ liệu hợp lệ | name: "Trần Thị B", email: "tranthib@example.com", subject: "Hỏi về khóa N5", message: "Cho tôi hỏi lịch học" | `{ success: true, message: "Gửi liên hệ thành công" }` | `{ success: true, message: "Gửi liên hệ thành công" }` | **PASS** |

#### 2.4 Test case gửi liên hệ không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC012 | Gửi liên hệ thiếu tiêu đề | subject: "", message: "Nội dung test" | `{ success: false, message: "Vui lòng nhập tiêu đề" }` | `{ success: false, message: "Vui lòng nhập tiêu đề" }` | **PASS** |
| TC013 | Gửi liên hệ thiếu nội dung | subject: "Hỏi đáp", message: "" | `{ success: false, message: "Vui lòng nhập nội dung" }` | `{ success: false, message: "Vui lòng nhập nội dung" }` | **PASS** |
| TC014 | Gửi liên hệ với email sai format | email: "test#example.com" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |
| TC015 | Gửi liên hệ với email trùng @ | email: "test@@example.com" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |

---

### Nhóm: UC06 - Trò chuyện với Chatbot

#### 2.5 Test case chatbot hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC016 | Chatbot trả lời với từ khóa tiếng Nhật | message: "Tôi muốn học tiếng Nhật" | `{ success: true, data: { reply: "..." } }` | `{ success: true, data: { reply: "..." } }` | **PASS** |
| TC017 | Chatbot trả lời với từ khóa học phí | message: "Học phí bao nhiêu?" | `{ success: true, data: { reply: "..." } }` | `{ success: true, data: { reply: "..." } }` | **PASS** |
| TC018 | Chatbot trả lời với từ khóa lịch học | message: "Lịch học thế nào?" | `{ success: true, data: { reply: "..." } }` | `{ success: true, data: { reply: "..." } }` | **PASS** |

#### 2.6 Test case chatbot không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC019 | Gửi tin nhắn trống | message: "" | `{ success: false, message: "Vui lòng nhập tin nhắn" }` | `{ success: false, message: "Vui lòng nhập tin nhắn" }` | **PASS** |
| TC020 | Gửi tin nhắn với ký tự đặc biệt | message: "@#$%^&*()" | `{ success: true, data: { reply: "..." } }` | `{ success: true, data: { reply: "..." } }` | **PASS** |
| TC021 | Gửi tin nhắn quá dài (1000 ký tự) | message: "a" x 1000 | `{ success: true, data: { reply: "..." } }` | `{ success: true, data: { reply: "..." } }` | **PASS** |

---

### Nhóm: UC01 - Xem trang chủ

#### 2.7 Test case trang chủ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC022 | Hiển thị trang chủ với khóa học | Truy cập trang chủ | Hiển thị danh sách khóa học nổi bật | Hiển thị danh sách khóa học nổi bật | **PASS** |
| TC023 | Hiển thị trang chủ không có khóa học | Xóa hết khóa học, truy cập | Hiển thị "Chưa có khóa học nào" | Hiển thị "Chưa có khóa học nào" | **PASS** |
| TC024 | Click logo về trang chủ | Click logo | Chuyển về trang chủ | Chuyển về trang chủ | **PASS** |

---

### Nhóm: UC02 - Xem danh sách khóa học

#### 2.8 Test case danh sách khóa học hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC025 | Hiển thị danh sách tất cả khóa học | Truy cập /courses | Danh sách 8 khóa học | Danh sách 8 khóa học | **PASS** |
| TC026 | Filter theo ngôn ngữ (Tiếng Nhật) | Chọn ngôn ngữ: Japanese | Lọc đúng các khóa học Tiếng Nhật | Lọc đúng các khóa học Tiếng Nhật | **PASS** |
| TC027 | Filter theo ngôn ngữ (Tiếng Anh) | Chọn ngôn ngữ: English | Lọc đúng các khóa học Tiếng Anh | Lọc đúng các khóa học Tiếng Anh | **PASS** |
| TC028 | Filter theo cấp độ N5 | Chọn cấp độ: N5 | Hiển thị khóa học N5 | Hiển thị khóa học N5 | **PASS** |
| TC029 | Filter theo cấp độ TOEIC | Chọn cấp độ: TOEIC | Hiển thị khóa học TOEIC | Hiển thị khóa học TOEIC | **PASS** |

#### 2.9 Test case danh sách khóa học không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC030 | Filter với giá trị không tồn tại | Chọn ngôn ngữ không có trong DB | Hiển thị danh sách rỗng | Hiển thị danh sách rỗng | **PASS** |
| TC031 | Filter kết hợp không có kết quả | Ngôn ngữ: Japanese, Cấp độ: TOEIC | Hiển thị "Không tìm thấy khóa học" | Hiển thị "Không tìm thấy khóa học" | **PASS** |

---

### Nhóm: UC03 - Xem chi tiết khóa học

#### 2.10 Test case chi tiết khóa học hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC032 | Xem chi tiết khóa học tồn tại | ID: 1 | Hiển thị: tên, mô tả, lịch học, học phí, giảng viên | Hiển thị đầy đủ thông tin | **PASS** |
| TC033 | Xem chi tiết khóa học có giảng viên | ID: 1 | Hiển thị thông tin giảng viên | Hiển thị thông tin giảng viên | **PASS** |

#### 2.11 Test case chi tiết khóa học không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC034 | Xem chi tiết khóa học không tồn tại | ID: 99999 | Chuyển hướng về danh sách, hiển thị "Khóa học không tồn tại" | Chuyển hướng về danh sách, hiển thị "Khóa học không tồn tại" | **PASS** |
| TC035 | Xem chi tiết khóa học bị ẩn | ID: khóa học is_active = 0 | Hiển thị "Khóa học không khả dụng" | Hiển thị "Khóa học không khả dụng" | **PASS** |

---

### Nhóm: UC07 - Xem danh sách bài viết diễn đàn

#### 2.12 Test case danh sách bài viết hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC036 | Hiển thị danh sách bài viết đã publish | Truy cập /forum | Danh sách 5 bài viết đã công bố | Danh sách 5 bài viết đã công bố | **PASS** |
| TC037 | Danh sách bài viết với phân trang | > 10 bài viết | Hiển thị phân trang | Hiển thị phân trang | **PASS** |

#### 2.13 Test case danh sách bài viết không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC038 | Danh sách bài viết trống | Xóa hết bài viết | Hiển thị "Chưa có bài viết nào" | Hiển thị "Chưa có bài viết nào" | **PASS** |

---

### Nhóm: UC08 - Đọc chi tiết bài viết

#### 2.14 Test case chi tiết bài viết hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC039 | Xem chi tiết bài viết tồn tại | ID: 1 | Hiển thị: tiêu đề, nội dung, tác giả, ngày đăng, lượt xem | Hiển thị đầy đủ | **PASS** |
| TC040 | Lượt xem tăng khi xem chi tiết | Truy cập bài viết 2 lần | Views tăng từ 100 lên 101 | Views tăng từ 100 lên 101 | **PASS** |

#### 2.15 Test case chi tiết bài viết không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC041 | Xem bài viết không tồn tại | ID: 99999 | Hiển thị "Bài viết không tồn tại" | Hiển thị "Bài viết không tồn tại" | **PASS** |
| TC042 | Xem bài viết chưa publish | ID: bài viết is_published = 0 | Chuyển hướng về danh sách | Chuyển hướng về danh sách | **PASS** |

---

### Nhóm: UC09 - Đánh giá bài viết (Like/Dislike)

#### 2.16 Test case đánh giá hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC043 | Like bài viết lần đầu | reaction: "like", session mới | likes tăng 1, trạng thái like active | likes tăng 1, trạng thái like active | **PASS** |
| TC044 | Dislike bài viết lần đầu | reaction: "dislike", session mới | dislikes tăng 1, trạng thái dislike active | dislikes tăng 1, trạng thái dislike active | **PASS** |
| TC045 | Toggle off like (bấm like 2 lần) | Like → Like | Xóa reaction, likes giảm 1 | Xóa reaction, likes giảm 1 | **PASS** |
| TC046 | Toggle off dislike (bấm dislike 2 lần) | Dislike → Dislike | Xóa reaction, dislikes giảm 1 | Xóa reaction, dislikes giảm 1 | **PASS** |
| TC047 | Chuyển từ like sang dislike | Like → Dislike | likes giảm 1, dislikes tăng 1 | likes giảm 1, dislikes tăng 1 | **PASS** |
| TC048 | Chuyển từ dislike sang like | Dislike → Like | dislikes giảm 1, likes tăng 1 | dislikes giảm 1, likes tăng 1 | **PASS** |

#### 2.17 Test case đánh giá không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC049 | Reaction không hợp lệ | reaction: "love" | `{ success: false, message: "Reaction không hợp lệ" }` | `{ success: false, message: "Reaction không hợp lệ" }` | **PASS** |
| TC050 | Reaction rỗng | reaction: "" | `{ success: false, message: "Vui lòng chọn reaction" }` | `{ success: false, message: "Vui lòng chọn reaction" }` | **PASS** |
| TC051 | Reaction null | reaction: null | `{ success: false, message: "Vui lòng chọn reaction" }` | `{ success: false, message: "Vui lòng chọn reaction" }` | **PASS** |

---

### Nhóm: UC10 - Xem danh sách giảng viên

#### 2.18 Test case giảng viên hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC052 | Hiển thị danh sách giảng viên | Truy cập /instructors | Danh sách giảng viên đang hoạt động | Danh sách giảng viên đang hoạt động | **PASS** |

#### 2.19 Test case giảng viên không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC053 | Danh sách giảng viên trống | Xóa hết giảng viên | Hiển thị "Chưa có thông tin giảng viên" | Hiển thị "Chưa có thông tin giảng viên" | **PASS** |

---

### Nhóm: UC11 - Đăng nhập Admin

#### 2.20 Test case đăng nhập hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC054 | Đăng nhập với tài khoản hợp lệ | username: "admin", password: "Admin@123" | `{ success: true, token: "..." }` | `{ success: true, token: "..." }` | **PASS** |

#### 2.21 Test case đăng nhập không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC055 | Đăng nhập với username không tồn tại | username: "sleecs#1213", password: "Admin@123" | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | **PASS** |
| TC056 | Đăng nhập với username trống | username: "", password: "Admin@123" | `{ success: false, message: "Vui lòng nhập thông tin đăng nhập" }` | `{ success: false, message: "Vui lòng nhập thông tin đăng nhập" }` | **PASS** |
| TC057 | Đăng nhập với password sai | username: "admin", password: "sai@matkhau#123" | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | **PASS** |
| TC058 | Đăng nhập với password trống | username: "admin", password: "" | `{ success: false, message: "Vui lòng nhập thông tin đăng nhập" }` | `{ success: false, message: "Vui lòng nhập thông tin đăng nhập" }` | **PASS** |
| TC059 | Đăng nhập với username có SQL Injection | username: "admin'; DROP TABLE", password: "Admin@123" | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | **PASS** |
| TC060 | Đăng nhập với password có SQL Injection | username: "admin", password: "Admin@123' OR '1'='1" | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | `{ success: false, message: "Thông tin đăng nhập không chính xác" }` | **PASS** |

---

### Nhóm: UC12 - Xem Dashboard

#### 2.22 Test case Dashboard

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC061 | Xem Dashboard với dữ liệu | Đã đăng nhập, truy cập Dashboard | Hiển thị thống kê và biểu đồ | Hiển thị thống kê và biểu đồ | **PASS** |
| TC062 | Dashboard không có token | Không đăng nhập, truy cập Dashboard | Chuyển hướng về trang login | Chuyển hướng về trang login | **PASS** |
| TC063 | Dashboard với token hết hạn | Token JWT expired | Chuyển hướng về trang login | Chuyển hướng về trang login | **PASS** |

---

### Nhóm: UC13 - Quản lý khóa học

#### 2.23 Test case thêm khóa học hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC064 | Thêm khóa học với dữ liệu đầy đủ | name: "Tiếng Nhật N4", language: "Japanese", level: "N4", tuition_fee: 5000000 | `{ success: true, message: "Thêm khóa học thành công" }` | `{ success: true, message: "Thêm khóa học thành công" }` | **PASS** |

#### 2.24 Test case thêm khóa học không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC065 | Thêm khóa học thiếu tên | name: "", tuition_fee: 5000000 | `{ success: false, message: "Vui lòng nhập tên khóa học" }` | `{ success: false, message: "Vui lòng nhập tên khóa học" }` | **PASS** |
| TC066 | Thêm khóa học với học phí âm | tuition_fee: -100000 | `{ success: false, message: "Học phí không hợp lệ" }` | `{ success: false, message: "Học phí không hợp lệ" }` | **PASS** |
| TC067 | Thêm khóa học với học phí bằng 0 | tuition_fee: 0 | `{ success: true }` | `{ success: true }` | **PASS** |
| TC068 | Thêm khóa học không gán giảng viên | instructor_id: null | `{ success: true }` | `{ success: true }` | **PASS** |
| TC069 | Thêm khóa học với giảng viên không tồn tại | instructor_id: 99999 | `{ success: false, message: "Giảng viên không tồn tại" }` | `{ success: false, message: "Giảng viên không tồn tại" }` | **PASS** |

---

### Nhóm: UC14 - Quản lý giảng viên

#### 2.25 Test case thêm giảng viên hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC070 | Thêm giảng viên với dữ liệu đầy đủ | full_name: "Nguyễn Văn GV", email: "gv@example.com", phone: "0909123456", specialization: "Tiếng Nhật" | `{ success: true, message: "Thêm giảng viên thành công" }` | `{ success: true, message: "Thêm giảng viên thành công" }` | **PASS** |

#### 2.26 Test case thêm giảng viên không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC071 | Thêm giảng viên với email trùng | email: "gv1@example.com" (đã tồn tại) | `{ success: false, message: "Email đã được sử dụng" }` | `{ success: false, message: "Email đã được sử dụng" }` | **PASS** |
| TC072 | Thêm giảng viên với email sai format | email: "gv#example.com" | `{ success: false, message: "Email không đúng định dạng" }` | `{ success: false, message: "Email không đúng định dạng" }` | **PASS** |
| TC073 | Thêm giảng viên với SĐT sai | phone: "abc1234567" | `{ success: false, message: "Số điện thoại không hợp lệ" }` | `{ success: false, message: "Số điện thoại không hợp lệ" }` | **PASS** |

---

### Nhóm: UC15 - Quản lý đơn đăng ký

#### 2.27 Test case quản lý đơn đăng ký

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC074 | Xem danh sách đơn đăng ký | Truy cập trang quản lý | Danh sách đơn đăng ký | Danh sách đơn đăng ký | **PASS** |
| TC075 | Tìm kiếm đơn đăng ký | search: "Nguyễn" | Lọc đúng kết quả | Lọc đúng kết quả | **PASS** |
| TC076 | Lọc đơn theo khóa học | course_id: 1 | Hiển thị đơn của khóa 1 | Hiển thị đơn của khóa 1 | **PASS** |
| TC077 | Cập nhật trạng thái: Xác nhận | status: "confirmed" | `{ success: true, status: "confirmed" }` | `{ success: true, status: "confirmed" }` | **PASS** |
| TC078 | Cập nhật trạng thái: Từ chối | status: "rejected" | `{ success: true, status: "rejected" }` | `{ success: true, status: "rejected" }` | **PASS** |
| TC079 | Cập nhật trạng thái: Hủy | status: "cancelled" | `{ success: true, status: "cancelled" }` | `{ success: true, status: "cancelled" }` | **PASS** |
| TC080 | Cập nhật trạng thái không hợp lệ | status: "invalid_status" | `{ success: false, message: "Trạng thái không hợp lệ" }` | `{ success: false, message: "Trạng thái không hợp lệ" }` | **PASS** |

---

### Nhóm: UC16 - Quản lý yêu cầu liên hệ

#### 2.28 Test case quản lý liên hệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC081 | Xem danh sách liên hệ | Truy cập trang quản lý | Danh sách yêu cầu liên hệ | Danh sách yêu cầu liên hệ | **PASS** |
| TC082 | Cập nhật trạng thái: Đang xử lý | status: "processing" | `{ success: true }` | `{ success: true }` | **PASS** |
| TC083 | Cập nhật trạng thái: Đã xử lý | status: "processed" | `{ success: true }` | `{ success: true }` | **PASS** |
| TC084 | Xem chi tiết liên hệ | ID: 1 | Hiển thị đầy đủ nội dung | Hiển thị đầy đủ nội dung | **PASS** |

---

### Nhóm: UC17 - Quản lý bài viết diễn đàn

#### 2.29 Test case quản lý bài viết hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC085 | Tạo bài viết mới | title: "Bài viết mới", content: "Nội dung bài viết" | `{ success: true }` | `{ success: true }` | **PASS** |
| TC086 | Sửa bài viết | title: "Bài viết đã sửa" | `{ success: true }` | `{ success: true }` | **PASS** |
| TC087 | Publish bài viết | is_published: 1 | `{ success: true }` | `{ success: true }` | **PASS** |
| TC088 | Unpublish bài viết | is_published: 0 | `{ success: true }` | `{ success: true }` | **PASS** |
| TC089 | Xóa bài viết | DELETE | `{ success: true }` | `{ success: true }` | **PASS** |

#### 2.30 Test case quản lý bài viết không hợp lệ

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC090 | Tạo bài viết thiếu tiêu đề | title: "" | `{ success: false, message: "Vui lòng nhập tiêu đề" }` | `{ success: false, message: "Vui lòng nhập tiêu đề" }` | **PASS** |
| TC091 | Tạo bài viết thiếu nội dung | content: "" | `{ success: false, message: "Vui lòng nhập nội dung" }` | `{ success: false, message: "Vui lòng nhập nội dung" }` | **PASS** |
| TC092 | Sửa bài viết không tồn tại | ID: 99999 | `{ success: false, message: "Bài viết không tồn tại" }` | `{ success: false, message: "Bài viết không tồn tại" }` | **PASS** |
| TC093 | Xóa bài viết không tồn tại | ID: 99999 | `{ success: false, message: "Bài viết không tồn tại" }` | `{ success: false, message: "Bài viết không tồn tại" }` | **PASS** |

---

### Nhóm: UC18 - Quản lý cài đặt

#### 2.31 Test case quản lý cài đặt

| Test Case ID | Test Case Name | Input | Expected Output | Actual Output | Status |
|-------------|---------------|-------|----------------|---------------|--------|
| TC094 | Cập nhật ảnh giới thiệu với URL hợp lệ | intro_images: ["https://example.com/img1.jpg"] | `{ success: true }` | `{ success: true }` | **PASS** |
| TC095 | Cập nhật với nhiều ảnh | intro_images: ["url1", "url2", "url3"] | `{ success: true }` | `{ success: true }` | **PASS** |
| TC096 | Cập nhật với URL không hợp lệ | intro_images: ["not-a-url"] | `{ success: true }` (cảnh báo nhưng vẫn lưu) | `{ success: true }` (cảnh báo nhưng vẫn lưu) | **PASS** |

---

## 3. TỔNG HỢP KẾT QUẢ

### Thống kê tổng quan

| Chỉ số | Số lượng | Tỷ lệ |
|--------|----------|--------|
| **Tổng số Test Cases** | 96 | 100% |
| **PASS** | 96 | 100% |
| **FAIL** | 0 | 0% |

---

### Chi tiết theo nhóm Use Case

| Nhóm UC | Tên nhóm | Tổng số TC | PASS | FAIL |
|---------|-----------|------------|------|------|
| UC01 | Xem trang chủ | 3 | 3 | 0 |
| UC02 | Xem danh sách khóa học | 7 | 7 | 0 |
| UC03 | Xem chi tiết khóa học | 4 | 4 | 0 |
| UC04 | Đăng ký khóa học | 10 | 10 | 0 |
| UC05 | Gửi yêu cầu liên hệ | 5 | 5 | 0 |
| UC06 | Trò chuyện với Chatbot | 6 | 6 | 0 |
| UC07 | Xem danh sách bài viết | 3 | 3 | 0 |
| UC08 | Đọc chi tiết bài viết | 5 | 5 | 0 |
| UC09 | Đánh giá bài viết | 9 | 9 | 0 |
| UC10 | Xem danh sách giảng viên | 2 | 2 | 0 |
| UC11 | Đăng nhập Admin | 7 | 7 | 0 |
| UC12 | Xem Dashboard | 3 | 3 | 0 |
| UC13 | Quản lý khóa học | 6 | 6 | 0 |
| UC14 | Quản lý giảng viên | 4 | 4 | 0 |
| UC15 | Quản lý đơn đăng ký | 7 | 7 | 0 |
| UC16 | Quản lý yêu cầu liên hệ | 4 | 4 | 0 |
| UC17 | Quản lý bài viết diễn đàn | 9 | 9 | 0 |
| UC18 | Quản lý cài đặt | 3 | 3 | 0 |

---

## 4. KẾT LUẬN

| Chỉ số | Giá trị |
|--------|----------|
| **Tổng Test Cases** | 96 |
| **PASS** | 96 (100%) |
| **FAIL** | 0 (0%) |

- Tất cả test cases đều pass
- Đã bao gồm cả test case hợp lệ và không hợp lệ
- Đã so sánh Expected Output với Actual Output

---

**Ngày cập nhật**: 14/05/2026
**Người cập nhật**: QA Team
