# ĐẶC TẢ USE CASE - HỆ THỐNG QUẢN LÝ ĐĂNG KÝ HỌC

## Mục lục
1. [Danh sách tác nhân](#1-danh-sách-tác-nhân)
2. [Danh sách Use Case](#2-danh-sách-use-case)
3. [Đặc tả chi tiết từng Use Case](#3-đặc-tả-chi-tiết-từng-use-case)

---

## 1. Danh sách tác nhân

| STT | Tên Actor | Mô tả |
|-----|-----------|-------|
| 1 | **Khách (Guest)** | Người dùng chưa xác thực, chỉ có quyền xem thông tin công khai và sử dụng chatbot |
| 2 | **Học viên (Student)** | Người dùng đã đăng ký khóa học, có thể tham gia diễn đàn |
| 3 | **Quản trị viên (Admin)** | Người được phân quyền quản lý toàn bộ dữ liệu và nội dung hệ thống |

---

## 2. Danh sách Use Case

### Nhóm Public (Khách/Học viên)

| STT | Mã UC | Tên Use Case |
|-----|-------|--------------|
| 1 | UC01 | Xem trang chủ |
| 2 | UC02 | Xem danh sách khóa học |
| 3 | UC03 | Xem chi tiết khóa học |
| 4 | UC04 | Đăng ký khóa học |
| 5 | UC05 | Gửi yêu cầu liên hệ |
| 6 | UC06 | Trò chuyện với tư vấn viên tự động |
| 7 | UC07 | Xem danh sách bài viết diễn đàn |
| 8 | UC08 | Đọc chi tiết bài viết |
| 9 | UC09 | Đánh giá bài viết (Like/Dislike) |
| 10 | UC10 | Xem danh sách giảng viên |

### Nhóm Admin

| STT | Mã UC | Tên Use Case |
|-----|-------|--------------|
| 11 | UC11 | Đăng nhập hệ thống |
| 12 | UC12 | Xem bảng thống kê tổng quan |
| 13 | UC13 | Quản lý khóa học |
| 14 | UC14 | Quản lý giảng viên |
| 15 | UC15 | Quản lý đơn đăng ký |
| 16 | UC16 | Quản lý yêu cầu liên hệ |
| 17 | UC17 | Quản lý bài viết diễn đàn |
| 18 | UC18 | Quản lý cài đặt trung tâm |

---

## 3. Đặc tả chi tiết từng Use Case

---

### Bảng 1. UC01 - Xem trang chủ

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem trang chủ |
| **Mã Use case** | UC01 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Hiển thị trang tổng quan của trung tâm với thông tin giới thiệu và các khóa học nổi bật |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng truy cập địa chỉ trang chủ của trung tâm<br>2. Hệ thống hiển thị các thành phần:<br>&nbsp;&nbsp;&nbsp;&nbsp;- Header với logo và menu điều hướng<br>&nbsp;&nbsp;&nbsp;&nbsp;- Banner/Slider giới thiệu trung tâm<br>&nbsp;&nbsp;&nbsp;&nbsp;- Section giới thiệu tổng quan (sứ mệnh, điểm nổi bật)<br>&nbsp;&nbsp;&nbsp;&nbsp;- Section khóa học nổi bật (hiển thị tối đa 4 khóa học mới nhất)<br>&nbsp;&nbsp;&nbsp;&nbsp;- Section giảng viên tiêu biểu<br>&nbsp;&nbsp;&nbsp;&nbsp;- Chatbot tư vấn<br>&nbsp;&nbsp;&nbsp;&nbsp;- Footer với thông tin liên hệ |
| **Luồng phụ** | Không có khóa học nào: Hiển thị thông báo "Hiện tại chưa có khóa học nào"<br>Lỗi kết nối: Hiển thị thông báo lỗi và nút thử lại |

---

### Bảng 2. UC02 - Xem danh sách khóa học

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem danh sách khóa học |
| **Mã Use case** | UC02 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Hiển thị toàn bộ các khóa học đang tuyển sinh với chức năng lọc theo nhiều tiêu chí |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng chọn mục "Khóa học" từ menu hoặc truy cập trực tiếp<br>2. Hệ thống hiển thị trang danh sách khóa học bao gồm:<br>&nbsp;&nbsp;&nbsp;&nbsp;- Thanh công cụ lọc: ngôn ngữ, cấp độ, khoảng học phí<br>&nbsp;&nbsp;&nbsp;&nbsp;- Nút áp dụng lọc / Xóa bộ lọc<br>&nbsp;&nbsp;&nbsp;&nbsp;- Danh sách khóa học dạng card với: hình ảnh, tên, ngôn ngữ, cấp độ, học phí, lịch học, giảng viên<br>&nbsp;&nbsp;&nbsp;&nbsp;- Nút "Xem chi tiết" cho mỗi khóa học |
| **Luồng phụ** | Không có khóa học phù hợp bộ lọc: Hiển thị "Không tìm thấy khóa học phù hợp"<br>Xóa bộ lọc: Reset về danh sách đầy đủ<br>Lỗi tải dữ liệu: Hiển thị thông báo lỗi và nút thử lại |

---

### Bảng 3. UC03 - Xem chi tiết khóa học

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem chi tiết khóa học |
| **Mã Use case** | UC03 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Xem thông tin đầy đủ của một khóa học cụ thể bao gồm nội dung, lịch học, học phí và giảng viên |
| **Điều kiện tiên quyết** | Khóa học phải tồn tại trong hệ thống và đang trong trạng thái tuyển sinh |
| **Luồng chính** | 1. Người dùng bấm vào card khóa học từ trang danh sách hoặc trang chủ<br>2. Hệ thống hiển thị trang chi tiết khóa học với các thông tin:<br>&nbsp;&nbsp;&nbsp;&nbsp;- Hình ảnh banner khóa học<br>&nbsp;&nbsp;&nbsp;&nbsp;- Tên, ngôn ngữ và cấp độ khóa học<br>&nbsp;&nbsp;&nbsp;&nbsp;- Mô tả chi tiết chương trình học<br>&nbsp;&nbsp;&nbsp;&nbsp;- Lịch học (thứ, giờ bắt đầu - kết thúc), thời lượng<br>&nbsp;&nbsp;&nbsp;&nbsp;- Học phí<br>&nbsp;&nbsp;&nbsp;&nbsp;- Thông tin giảng viên (avatar, tên, chuyên môn, tiểu sử)<br>&nbsp;&nbsp;&nbsp;&nbsp;- Nút "Đăng ký ngay" |
| **Luồng phụ** | Khóa học không tồn tại hoặc đã bị xóa: Hệ thống chuyển hướng về trang danh sách kèm thông báo<br>Khóa học đang tạm dừng tuyển sinh: Hiển thị thông tin nhưng nút đăng ký bị vô hiệu hóa |

---

### Bảng 4. UC04 - Đăng ký khóa học

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Đăng ký khóa học |
| **Mã Use case** | UC04 |
| **Tác nhân** | Khách, Học viên |
| **Mô tả tóm tắt** | Người dùng gửi đơn đăng ký để tham gia một khóa học cụ thể |
| **Điều kiện tiên quyết** | Khóa học đích phải đang trong trạng thái tuyển sinh |
| **Luồng chính** | 1. Người dùng thực hiện một trong các cách:<br>&nbsp;&nbsp;&nbsp;&nbsp;- Bấm nút "Đăng ký ngay" từ trang chi tiết khóa học<br>&nbsp;&nbsp;&nbsp;&nbsp;- Truy cập trực tiếp trang đăng ký từ menu<br>2. Hệ thống hiển thị form đăng ký với các trường: khóa học, họ và tên, SĐT, email, ngày sinh, giới tính, địa chỉ, ghi chú<br>3. Người dùng điền đầy đủ thông tin và bấm "Đăng ký"<br>4. Hệ thống kiểm tra: email đúng định dạng, SĐT hợp lệ (10-11 số, bắt đầu bằng 0), các trường bắt buộc không rỗng<br>5. Hệ thống tạo đơn đăng ký với trạng thái "Chờ xác nhận", ghi nhận thời gian<br>6. Hiển thị thông báo "Đăng ký thành công" và reset form |
| **Luồng phụ** | Email không đúng định dạng: Highlight trường email, hiển thị "Email không đúng định dạng"<br>Số điện thoại không hợp lệ: Highlight trường SĐT, hiển thị "Số điện thoại không hợp lệ"<br>Bỏ trống trường bắt buộc: Highlight trường đó, hiển thị "Vui lòng điền đầy đủ thông tin"<br>Khóa học không còn tuyển sinh: Thông báo "Khóa học này hiện không tuyển sinh"<br>Lỗi hệ thống: Thông báo "Đăng ký thất bại, vui lòng thử lại sau" |
| **Quy tắc nghiệp vụ** | QN04-01: Mỗi người có thể đăng ký nhiều lần cho cùng khóa học<br>QN04-02: Email phải đúng định dạng chuẩn (vd: myname@example.com)<br>QN04-03: Số điện thoại phải là số Việt Nam hợp lệ (10-11 chữ số, bắt đầu bằng 0)<br>QN04-04: Ngày sinh không được lớn hơn ngày hiện tại |

---

### Bảng 5. UC05 - Gửi yêu cầu liên hệ

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Gửi yêu cầu liên hệ |
| **Mã Use case** | UC05 |
| **Tác nhân** | Khách, Học viên |
| **Mô tả tóm tắt** | Người dùng gửi yêu cầu liên hệ, tư vấn đến trung tâm |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng truy cập trang "Liên hệ" từ menu footer<br>2. Hệ thống hiển thị form liên hệ với các trường: họ và tên, email, SĐT, tiêu đề liên hệ, nội dung tin nhắn<br>3. Người dùng điền đầy đủ và bấm "Gửi liên hệ"<br>4. Hệ thống kiểm tra dữ liệu hợp lệ<br>5. Hệ thống lưu yêu cầu liên hệ với trạng thái "Chưa xử lý"<br>6. Hiển thị thông báo "Gửi liên hệ thành công" và reset form |
| **Luồng phụ** | Email không đúng định dạng: Thông báo lỗi tại trường email<br>Bỏ trống tiêu đề hoặc nội dung: Thông báo yêu cầu nhập đầy đủ<br>Lỗi khi lưu dữ liệu: Thông báo "Gửi liên hệ thất bại" |

---

### Bảng 6. UC06 - Trò chuyện với tư vấn viên tự động

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Trò chuyện với tư vấn viên tự động (Chatbot) |
| **Mã Use case** | UC06 |
| **Tác nhân** | Khách, Học viên |
| **Mô tả tóm tắt** | Người dùng trò chuyện với chatbot để được tư vấn về khóa học và thông tin trung tâm |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng bấm vào biểu tượng chatbot ở góc dưới bên phải màn hình<br>2. Cửa sổ chat hiện ra với giao diện: header (tên chatbot, nút đóng), khu vực hiển thị tin nhắn, ô nhập tin nhắn và nút gửi<br>3. Người dùng nhập câu hỏi và bấm gửi (hoặc nhấn Enter)<br>4. Hệ thống xử lý dựa trên từ khóa trong câu hỏi và trả lời từ cơ sở dữ liệu câu hỏi - câu trả lời<br>5. Tin nhắn của người dùng và phản hồi của bot được hiển thị trong cửa sổ chat<br>6. Người dùng có thể tiếp tục hỏi hoặc đóng cửa sổ chat |
| **Luồng phụ** | Gửi tin nhắn trống: Không gửi, không hiển thị lỗi<br>Câu hỏi không khớp từ khóa nào: Trả lời mặc định "Xin lỗi, tôi chưa hiểu rõ ý bạn. Bạn có thể hỏi cụ thể hơn về khóa học, lịch học, học phí..."<br>Lỗi xử lý phía máy chủ: Hiển thị "Hệ thống đang bận, vui lòng thử lại sau" |

---

### Bảng 7. UC07 - Xem danh sách bài viết diễn đàn

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem danh sách bài viết diễn đàn |
| **Mã Use case** | UC07 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Xem danh sách các bài viết đã được công bố trên diễn đàn |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng chọn mục "Diễn đàn" từ menu<br>2. Hệ thống hiển thị trang danh sách bài viết với: hình ảnh đại diện, tiêu đề, mô tả ngắn, tên tác giả, ngày đăng, số lượt xem, số lượt thích<br>3. Hệ thống hiển thị phân trang nếu số lượng bài viết nhiều |
| **Luồng phụ** | Không có bài viết nào: Hiển thị "Chưa có bài viết nào trên diễn đàn"<br>Lỗi tải dữ liệu: Thông báo lỗi và nút thử lại |

---

### Bảng 8. UC08 - Đọc chi tiết bài viết

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Đọc chi tiết bài viết |
| **Mã Use case** | UC08 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Xem nội dung đầy đủ của một bài viết, hệ thống tự động tăng lượt xem |
| **Điều kiện tiên quyết** | Bài viết phải tồn tại và đã được công bố |
| **Luồng chính** | 1. Người dùng bấm vào bài viết từ danh sách<br>2. Hệ thống thực hiện: tăng số lượt xem của bài viết lên 1<br>3. Hệ thống hiển thị trang chi tiết với: tiêu đề, thông tin tác giả và ngày đăng, nội dung bài viết đầy đủ, số lượt xem/thích/không thích, nút Like và Dislike<br>4. Người dùng có thể bấm Like/Dislike hoặc quay về danh sách |
| **Luồng phụ** | Bài viết không tồn tại: Hiển thị thông báo "Bài viết không tồn tại"<br>Bài viết chưa được công bố: Chuyển hướng về trang danh sách diễn đàn |

---

### Bảng 9. UC09 - Đánh giá bài viết (Like/Dislike)

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Đánh giá bài viết (Like/Dislike) |
| **Mã Use case** | UC09 |
| **Tác nhân** | Khách, Học viên |
| **Mô tả tóm tắt** | Người dùng bày tỏ thái độ với bài viết bằng cách Like hoặc Dislike |
| **Điều kiện tiên quyết** | Người dùng đang xem chi tiết bài viết |
| **Luồng chính** | 1. Người dùng đang ở trang chi tiết bài viết<br>2. Người dùng bấm nút Like hoặc nút Dislike<br>3. Hệ thống xử lý theo logic:<br>&nbsp;&nbsp;&nbsp;&nbsp;- Chưa có đánh giá: Tạo đánh giá mới, tăng số tương ứng lên 1<br>&nbsp;&nbsp;&nbsp;&nbsp;- Đã có đánh giá cùng loại: Xóa đánh giá hiện tại, giảm số tương ứng đi 1<br>&nbsp;&nbsp;&nbsp;&nbsp;- Đã có đánh giá khác loại: Chuyển đổi đánh giá, tăng số mới lên 1, giảm số cũ đi 1<br>4. Giao diện cập nhật số lượt Like/Dislike và trạng thái nút được chọn |
| **Luồng phụ** | Không có |
| **Quy tắc nghiệp vụ** | QN09-01: Mỗi phiên trình duyệt chỉ có một đánh giá cho mỗi bài viết (đánh giá gắn với session ID)<br>QN09-02: Người dùng có thể thay đổi đánh giá (bấm lại nút đã chọn để hủy, hoặc bấm nút khác để đổi) |

---

### Bảng 10. UC10 - Xem danh sách giảng viên

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem danh sách giảng viên |
| **Mã Use case** | UC10 |
| **Tác nhân** | Khách, Học viên, Admin |
| **Mô tả tóm tắt** | Xem thông tin các giảng viên đang giảng dạy tại trung tâm |
| **Điều kiện tiên quyết** | Không có |
| **Luồng chính** | 1. Người dùng chọn mục "Giảng viên" từ menu hoặc truy cập từ trang chủ<br>2. Hệ thống hiển thị danh sách giảng viên với thông tin: ảnh đại diện, họ và tên, chuyên môn/kinh nghiệm, tiểu sử ngắn |
| **Luồng phụ** | Không có giảng viên nào: Hiển thị "Chưa có thông tin giảng viên" |

---

### Bảng 11. UC11 - Đăng nhập hệ thống

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Đăng nhập hệ thống |
| **Mã Use case** | UC11 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Xác thực danh tính Admin trước khi truy cập trang quản trị |
| **Điều kiện tiên quyết** | Admin phải có tài khoản trong hệ thống |
| **Luồng chính** | 1. Admin truy cập trang đăng nhập quản trị<br>2. Hệ thống hiển thị form đăng nhập với: tên đăng nhập (username), mật khẩu, nút "Đăng nhập"<br>3. Admin nhập thông tin và bấm "Đăng nhập"<br>4. Hệ thống kiểm tra: tài khoản tồn tại trong hệ thống, mật khẩu chính xác<br>5. Nếu hợp lệ: tạo phiên đăng nhập, chuyển hướng đến trang Dashboard, lưu thông tin đăng nhập để duy trì phiên |
| **Luồng phụ** | Tên đăng nhập không tồn tại: Thông báo "Thông tin đăng nhập không chính xác"<br>Mật khẩu sai: Thông báo "Thông tin đăng nhập không chính xác"<br>Tài khoản bị khóa: Thông báo "Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên"<br>Bỏ trống thông tin: Thông báo "Vui lòng nhập đầy đủ thông tin" |

---

### Bảng 12. UC12 - Xem bảng thống kê tổng quan

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Xem bảng thống kê tổng quan (Dashboard) |
| **Mã Use case** | UC12 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Xem các số liệu thống kê và biểu đồ về hoạt động của trung tâm |
| **Điều kiện tiên quyết** | Admin đã đăng nhập thành công |
| **Luồng chính** | 1. Admin đăng nhập thành công, hệ thống tự động chuyển đến Dashboard<br>2. Hệ thống hiển thị trang Dashboard với:<br>&nbsp;&nbsp;&nbsp;&nbsp;A. Thẻ thống kê tổng quan: tổng số khóa học, đơn đăng ký, yêu cầu liên hệ, giảng viên, bài viết, doanh thu (từ đơn đã xác nhận), tỷ lệ chốt deal<br>&nbsp;&nbsp;&nbsp;&nbsp;B. Biểu đồ thống kê: biểu đồ số lượng đăng ký theo ngày (7 ngày gần nhất), biểu đồ phân bổ đăng ký theo khóa học, biểu đồ doanh thu theo khóa học |
| **Luồng phụ** | Chưa có dữ liệu: Hiển thị số 0, biểu đồ trống với thông báo "Chưa có dữ liệu"<br>Token hết hạn: Chuyển hướng về trang đăng nhập |

---

### Bảng 13. UC13 - Quản lý khóa học

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý khóa học |
| **Mã Use case** | UC13 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Thêm mới, chỉnh sửa, xóa và quản lý trạng thái khóa học |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | **Xem danh sách:**<br>1. Admin chọn mục "Quản lý khóa học" từ menu<br>2. Hệ thống hiển thị bảng: tên khóa học, ngôn ngữ, cấp độ, giảng viên, học phí, trạng thái, thao tác (Sửa, Xóa)<br><br>**Thêm khóa học:**<br>3. Admin bấm nút "Thêm khóa học"<br>4. Hệ thống hiển thị form với: tên, ngôn ngữ, cấp độ, mô tả, lịch học, thời lượng, học phí, hình ảnh, giảng viên, trạng thái<br>5. Admin điền thông tin và bấm "Lưu"<br>6. Hệ thống kiểm tra và lưu vào CSDL<br>7. Hiển thị thông báo thành công, refresh danh sách<br><br>**Sửa khóa học:**<br>8. Admin bấm nút "Sửa", form điền sẵn thông tin hiện tại<br>9. Admin chỉnh sửa và bấm "Lưu"<br><br>**Xóa khóa học:**<br>10. Admin bấm nút "Xóa"<br>11. Hệ thống hiển thị hộp thoại xác nhận (nếu có đơn đăng ký sẽ hiển thị cảnh báo)<br>12. Admin xác nhận, hệ thống xóa khóa học |
| **Luồng phụ** | Tên khóa học bỏ trống: Thông báo "Vui lòng nhập tên khóa học"<br>Học phí âm: Thông báo "Học phí không hợp lệ"<br>Xóa khóa học có đơn đăng ký: Cảnh báo nhưng vẫn cho phép xóa |

---

### Bảng 14. UC14 - Quản lý giảng viên

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý giảng viên |
| **Mã Use case** | UC14 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Thêm mới, chỉnh sửa, xóa thông tin giảng viên |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | **Xem danh sách:**<br>1. Admin chọn "Quản lý giảng viên" từ menu<br>2. Hệ thống hiển thị bảng: họ tên, email, SĐT, chuyên môn, trạng thái, thao tác<br><br>**Thêm giảng viên:**<br>3. Bấm "Thêm giảng viên", điền form: họ tên, email, SĐT, chuyên môn, tiểu sử, avatar URL<br>4. Kiểm tra email chưa tồn tại, lưu thông tin<br><br>**Sửa/Xóa:** Tương tự quản lý khóa học |
| **Luồng phụ** | Email giảng viên trùng: Thông báo "Email đã được sử dụng"<br>Xóa giảng viên đang giảng dạy: Các khóa học của giảng viên sẽ được gán NULL |
| **Quy tắc nghiệp vụ** | QN14-01: Email giảng viên không được trùng lặp<br>QN14-02: Xóa giảng viên đang giảng dạy: Các khóa học sẽ mất thông tin giảng viên |

---

### Bảng 15. UC15 - Quản lý đơn đăng ký

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý đơn đăng ký |
| **Mã Use case** | UC15 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Xem danh sách, tìm kiếm, lọc và cập nhật trạng thái đơn đăng ký |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | **Xem danh sách:**<br>1. Admin chọn "Quản lý đăng ký" từ menu<br>2. Hệ thống hiển thị bảng: họ tên học viên, khóa học, ngày đăng ký, trạng thái, thao tác<br><br>**Tìm kiếm/Lọc:**<br>3. Admin nhập từ khóa hoặc chọn khóa học từ dropdown<br>4. Hệ thống refresh danh sách theo điều kiện<br><br>**Cập nhật trạng thái:**<br>5. Admin bấm vào dropdown trạng thái, chọn: Chờ xác nhận, Đã xác nhận, Từ chối, Đã hủy<br>6. Hệ thống cập nhật trạng thái |
| **Luồng phụ** | Trạng thái không hợp lệ: Thông báo "Trạng thái không hợp lệ"<br>Xác nhận đơn đăng ký: Tự động cập nhật vào doanh thu Dashboard |

---

### Bảng 16. UC16 - Quản lý yêu cầu liên hệ

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý yêu cầu liên hệ |
| **Mã Use case** | UC16 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Xem và cập nhật trạng thái xử lý yêu cầu liên hệ |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | **Xem danh sách:**<br>1. Admin chọn "Quản lý liên hệ" từ menu<br>2. Hệ thống hiển thị bảng: họ tên, email, tiêu đề, ngày gửi, trạng thái, thao tác<br><br>**Xem chi tiết:**<br>3. Admin bấm vào dòng để xem popup/modal chi tiết<br><br>**Cập nhật trạng thái:**<br>4. Thay đổi trạng thái: Chưa xử lý → Đang xử lý → Đã xử lý |
| **Luồng phụ** | Trạng thái không hợp lệ: Thông báo "Trạng thái không hợp lệ" |

---

### Bảng 17. UC17 - Quản lý bài viết diễn đàn

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý bài viết diễn đàn |
| **Mã Use case** | UC17 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Tạo, sửa, xóa, publish/unpublish bài viết diễn đàn |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | **Xem danh sách:**<br>1. Admin chọn "Quản lý diễn đàn" từ menu<br>2. Bảng: tiêu đề, tác giả, ngày tạo, lượt xem, trạng thái publish, thao tác<br><br>**Tạo bài viết mới:**<br>3. Bấm "Viết bài mới", form: tiêu đề, nội dung (rich text), hình ảnh<br>4. Bài viết được tạo với trạng thái "Chưa công bố"<br><br>**Publish/Unpublish:**<br>5. Bấm toggle publish để cho phép/ẩn bài viết<br><br>**Sửa/Xóa:** Tương tự các chức năng quản lý khác |
| **Luồng phụ** | Tiêu đề trùng: Cảnh báo nhưng cho phép<br>Xóa bài đang public: Vẫn cho xóa |

---

### Bảng 18. UC18 - Quản lý cài đặt trung tâm

| Thuộc tính | Nội dung |
|------------|----------|
| **Tên Use case** | Quản lý cài đặt trung tâm |
| **Mã Use case** | UC18 |
| **Tác nhân** | Admin |
| **Mô tả tóm tắt** | Cập nhật các thông tin cài đặt hiển thị ở trang public |
| **Điều kiện tiên quyết** | Admin đã đăng nhập |
| **Luồng chính** | 1. Admin chọn "Cài đặt" từ menu<br>2. Hệ thống hiển thị form với: Ảnh giới thiệu trang chủ (danh sách URL, mỗi dòng 1 URL)<br>3. Admin chỉnh sửa và bấm "Lưu thay đổi"<br>4. Hệ thống lưu cài đặt<br>5. Trang public hiển thị các thay đổi |
| **Luồng phụ** | URL ảnh không hợp lệ: Cảnh báo nhưng vẫn lưu được<br>Lỗi lưu dữ liệu: Thông báo "Lưu cài đặt thất bại" |

---

## Tổng kết bảng Use Case

| Mã UC | Tên Use Case | Tác nhân chính |
|-------|--------------|----------------|
| UC01 | Xem trang chủ | Khách, Học viên, Admin |
| UC02 | Xem danh sách khóa học | Khách, Học viên, Admin |
| UC03 | Xem chi tiết khóa học | Khách, Học viên, Admin |
| UC04 | Đăng ký khóa học | Khách, Học viên |
| UC05 | Gửi yêu cầu liên hệ | Khách, Học viên |
| UC06 | Trò chuyện với tư vấn viên tự động | Khách, Học viên |
| UC07 | Xem danh sách bài viết diễn đàn | Khách, Học viên, Admin |
| UC08 | Đọc chi tiết bài viết | Khách, Học viên, Admin |
| UC09 | Đánh giá bài viết (Like/Dislike) | Khách, Học viên |
| UC10 | Xem danh sách giảng viên | Khách, Học viên, Admin |
| UC11 | Đăng nhập hệ thống | Admin |
| UC12 | Xem bảng thống kê tổng quan | Admin |
| UC13 | Quản lý khóa học | Admin |
| UC14 | Quản lý giảng viên | Admin |
| UC15 | Quản lý đơn đăng ký | Admin |
| UC16 | Quản lý yêu cầu liên hệ | Admin |
| UC17 | Quản lý bài viết diễn đàn | Admin |
| UC18 | Quản lý cài đặt trung tâm | Admin |
