-- ============================================================
-- Language Center Database - Complete Schema + Seed Data
-- Compatible with MySQL 5.7+ / XAMPP
-- ============================================================

CREATE DATABASE IF NOT EXISTS language_center_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE language_center_db;

-- ============================================================
-- Table: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: courses
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  language VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL,
  tuition_fee DECIMAL(12,0) NOT NULL DEFAULT 0,
  duration VARCHAR(100) NOT NULL,
  schedule VARCHAR(200) NOT NULL,
  short_description TEXT,
  description TEXT,
  instructor_name VARCHAR(100),
  image_url VARCHAR(500) DEFAULT '',
  is_active TINYINT(1) DEFAULT 1,
  instructor_id INT DEFAULT NULL,
  max_students INT DEFAULT NULL,
  status ENUM('upcoming','ongoing','finished') DEFAULT 'upcoming',
  start_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: course_registrations
-- ============================================================
CREATE TABLE IF NOT EXISTS course_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender ENUM('male','female','other') DEFAULT 'other',
  address TEXT,
  course_id INT NOT NULL,
  note TEXT,
  status ENUM('new','consulted','confirmed','cancelled') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: contact_requests
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT,
  status ENUM('pending','processed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: chatbot_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS chatbot_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin: username=admin, password=admin123
INSERT INTO admins (username, password_hash, full_name) VALUES
('admin', '$2b$10$mK3o8a1qfPSIsldgYZ7pDOvcJueWlO2GDfE1h4aT9dJVMF1KlyLOq', 'Quản trị viên');

-- 8 Courses
INSERT INTO courses (title, language, level, tuition_fee, duration, schedule, short_description, description, instructor_name, image_url, is_active, max_students, status, start_date) VALUES
(
  'Tiếng Anh Giao Tiếp',
  'Tiếng Anh', 'Cơ bản - Trung cấp', 3500000, '3 tháng',
  'Thứ 2, 4, 6 - 18:00 đến 20:00',
  'Khóa học giúp bạn tự tin giao tiếp tiếng Anh trong cuộc sống hàng ngày và công việc.',
  'Khóa học Tiếng Anh Giao Tiếp được thiết kế dành cho người muốn cải thiện kỹ năng nói và nghe. Chương trình bao gồm các chủ đề thực tế: giao tiếp tại nơi làm việc, đi du lịch, mua sắm, giao tiếp xã hội. Học viên sẽ được thực hành qua các tình huống mô phỏng, thảo luận nhóm và thuyết trình ngắn. Giáo trình kết hợp giữa sách quốc tế và tài liệu thực tế.',
  'Nguyễn Thị Mai', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', 1, 25, 'ongoing', '2026-03-01'
),
(
  'Luyện thi IELTS',
  'Tiếng Anh', 'Trung cấp - Nâng cao', 6500000, '4 tháng',
  'Thứ 3, 5, 7 - 18:00 đến 20:30',
  'Luyện thi IELTS toàn diện 4 kỹ năng, mục tiêu 6.5+.',
  'Khóa luyện thi IELTS toàn diện bao gồm 4 kỹ năng: Listening, Reading, Writing và Speaking. Chương trình được thiết kế bài bản với lộ trình rõ ràng, giúp học viên đạt mục tiêu từ 6.5 trở lên. Nội dung bao gồm: chiến lược làm bài thi, luyện đề thật, phản hồi chi tiết từ giảng viên có chứng chỉ IELTS 8.0+. Có mock test định kỳ để đánh giá tiến độ.',
  'Trần Văn Hùng', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', 1, 20, 'upcoming', '2026-06-15'
),
(
  'Luyện thi TOEIC',
  'Tiếng Anh', 'Sơ cấp - Trung cấp', 4000000, '3 tháng',
  'Thứ 2, 4, 6 - 19:00 đến 21:00',
  'Khóa luyện thi TOEIC mục tiêu 650+ phù hợp cho người đi làm.',
  'Khóa luyện thi TOEIC tập trung vào hai phần Listening và Reading, giúp học viên nắm vững cấu trúc đề thi và chiến lược làm bài hiệu quả. Chương trình phù hợp cho sinh viên chuẩn bị ra trường hoặc người đi làm cần chứng chỉ TOEIC. Lộ trình từ 450 lên 650+, bao gồm bài tập hàng ngày, mini test hàng tuần và full test hàng tháng.',
  'Lê Hoàng Nam', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', 1, 30, 'ongoing', '2026-02-15'
),
(
  'Tiếng Trung Cơ Bản',
  'Tiếng Trung', 'Cơ bản', 3000000, '3 tháng',
  'Thứ 3, 5 - 18:30 đến 20:30',
  'Khóa học tiếng Trung cho người mới bắt đầu, từ phát âm đến giao tiếp cơ bản.',
  'Khóa học Tiếng Trung Cơ Bản dành cho người chưa biết gì về tiếng Trung. Bắt đầu từ hệ thống phiên âm Pinyin, thanh điệu, cách viết chữ Hán cơ bản. Sau khóa học, học viên có thể: tự giới thiệu bản thân, hỏi đường, mua sắm, gọi món ăn bằng tiếng Trung. Giáo trình HSK 1-2 kết hợp tài liệu bổ sung.',
  'Vương Tiểu Minh', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400', 1, 25, 'finished', '2025-11-01'
),
(
  'Tiếng Trung Giao Tiếp',
  'Tiếng Trung', 'Trung cấp', 4500000, '4 tháng',
  'Thứ 2, 4, 6 - 18:00 đến 20:00',
  'Nâng cao kỹ năng giao tiếp tiếng Trung cho công việc và cuộc sống.',
  'Khóa học Tiếng Trung Giao Tiếp dành cho người đã có nền tảng cơ bản (HSK 2+). Tập trung vào kỹ năng nghe-nói trong các tình huống thực tế: công sở, kinh doanh, du lịch Trung Quốc. Học viên được thực hành đóng vai, thảo luận chủ đề, xem phim Trung Quốc có phụ đề. Giáo trình HSK 3-4.',
  'Lý Mỹ Hoa', 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400', 1, 20, 'upcoming', '2026-07-01'
),
(
  'Tiếng Nhật N5',
  'Tiếng Nhật', 'Sơ cấp', 3500000, '4 tháng',
  'Thứ 3, 5, 7 - 17:30 đến 19:30',
  'Khóa học tiếng Nhật trình độ N5 cho người mới bắt đầu.',
  'Khóa học Tiếng Nhật N5 giúp học viên nắm vững bảng chữ Hiragana, Katakana và khoảng 100 chữ Kanji cơ bản. Sau khóa học, học viên đạt trình độ JLPT N5: hiểu được hội thoại đơn giản, đọc được đoạn văn ngắn, viết được câu cơ bản. Giáo trình Minna no Nihongo kết hợp bài tập thực hành.',
  'Tanaka Yuki', 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400', 1, 25, 'ongoing', '2026-03-10'
),
(
  'Tiếng Hàn Sơ Cấp',
  'Tiếng Hàn', 'Sơ cấp', 3200000, '3 tháng',
  'Thứ 2, 4 - 18:00 đến 20:00',
  'Học tiếng Hàn từ đầu: bảng chữ cái, phát âm, giao tiếp cơ bản.',
  'Khóa học Tiếng Hàn Sơ Cấp bắt đầu từ bảng chữ cái Hangul, cách phát âm chuẩn, ngữ pháp cơ bản. Nội dung gắn liền văn hóa Hàn Quốc giúp học viên vừa học ngôn ngữ vừa hiểu văn hóa. Sau khóa, học viên giao tiếp được các tình huống đơn giản: chào hỏi, mua sắm, hỏi đường. Tương đương TOPIK I.',
  'Park Min Young', 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400', 1, 20, 'upcoming', '2026-06-20'
),
(
  'Tiếng Anh Trẻ Em',
  'Tiếng Anh', 'Cơ bản', 2800000, '3 tháng',
  'Thứ 7, Chủ nhật - 09:00 đến 11:00',
  'Khóa học tiếng Anh vui nhộn dành cho trẻ em 6-12 tuổi.',
  'Khóa học Tiếng Anh Trẻ Em được thiết kế đặc biệt cho các bé từ 6-12 tuổi. Phương pháp giảng dạy qua trò chơi, bài hát, hoạt động nhóm giúp trẻ tiếp thu tự nhiên và yêu thích tiếng Anh. Nội dung bao gồm: từ vựng theo chủ đề, phát âm chuẩn, hội thoại đơn giản, đọc hiểu truyện ngắn. Lớp học tối đa 12 học viên để đảm bảo chất lượng.',
  'Phạm Thanh Hà', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 1, 12, 'finished', '2025-10-05'
);

-- Sample course registrations
INSERT INTO course_registrations (full_name, phone, email, date_of_birth, gender, address, course_id, note, status) VALUES
('Nguyễn Văn An', '0901234567', 'an.nguyen@email.com', '2000-05-15', 'male', '123 Nguyễn Huệ, Quận 1, TP.HCM', 1, 'Muốn học buổi tối', 'new'),
('Trần Thị Bình', '0912345678', 'binh.tran@email.com', '1998-08-20', 'female', '456 Lê Lợi, Quận 3, TP.HCM', 2, 'Mục tiêu IELTS 7.0', 'consulted'),
('Lê Văn Cường', '0923456789', 'cuong.le@email.com', '2001-12-01', 'male', '789 Trần Hưng Đạo, Quận 5, TP.HCM', 3, '', 'confirmed'),
('Phạm Thị Dung', '0934567890', 'dung.pham@email.com', '1999-03-10', 'female', '321 Hai Bà Trưng, Quận 1, TP.HCM', 6, 'Học để đi du học Nhật', 'new'),
('Hoàng Văn Em', '0945678901', 'em.hoang@email.com', '2002-07-25', 'male', '654 Võ Văn Tần, Quận 3, TP.HCM', 4, '', 'new');

-- Sample contact requests
INSERT INTO contact_requests (full_name, phone, email, message, status) VALUES
('Ngô Thị Phương', '0956789012', 'phuong.ngo@email.com', 'Tôi muốn biết thêm về khóa IELTS. Có lớp cuối tuần không?', 'pending'),
('Đỗ Văn Quang', '0967890123', 'quang.do@email.com', 'Cho tôi hỏi về học phí khóa tiếng Trung ạ. Có giảm giá khi đăng ký nhóm không?', 'processed'),
('Vũ Thị Hạnh', '0978901234', 'hanh.vu@email.com', 'Con tôi 8 tuổi, có thể học lớp tiếng Anh trẻ em được không?', 'pending');

-- Sample chatbot logs
INSERT INTO chatbot_logs (user_message, bot_response) VALUES
('Trung tâm có những khóa học nào?', 'Trung tâm hiện có các khóa học: Tiếng Anh Giao Tiếp, Luyện thi IELTS, Luyện thi TOEIC, Tiếng Trung Cơ Bản, Tiếng Trung Giao Tiếp, Tiếng Nhật N5, Tiếng Hàn Sơ Cấp, Tiếng Anh Trẻ Em.'),
('Học phí bao nhiêu?', 'Học phí các khóa dao động từ 2.800.000đ đến 6.500.000đ tùy khóa học.');
