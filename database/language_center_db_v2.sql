-- ============================================================
-- Language Center Database V2 Migration
-- Run AFTER the initial language_center_db.sql
-- ============================================================

USE language_center_db;

-- ============================================================
-- Table: instructors
-- ============================================================
CREATE TABLE IF NOT EXISTS instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  specialization VARCHAR(200),
  bio TEXT,
  avatar_url VARCHAR(500) DEFAULT '',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ALTER courses: add instructor_id FK
-- ============================================================
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_id INT DEFAULT NULL;
ALTER TABLE courses ADD CONSTRAINT fk_course_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL;

-- ============================================================
-- ALTER courses: add max_students, status, start_date
-- ============================================================
ALTER TABLE courses ADD COLUMN IF NOT EXISTS max_students INT DEFAULT NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS status ENUM('upcoming','ongoing','finished') DEFAULT 'upcoming';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS start_date DATE DEFAULT NULL;

-- ============================================================
-- Table: forum_posts
-- ============================================================
CREATE TABLE IF NOT EXISTS forum_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500) DEFAULT '',
  admin_id INT NOT NULL,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  is_published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: post_reactions
-- ============================================================
CREATE TABLE IF NOT EXISTS post_reactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  session_id VARCHAR(100) NOT NULL,
  reaction ENUM('like','dislike') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_reaction (post_id, session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Table: center_settings
-- ============================================================
CREATE TABLE IF NOT EXISTS center_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED: Instructors
-- ============================================================
INSERT INTO instructors (full_name, phone, email, specialization, bio, avatar_url, is_active) VALUES
('Nguyễn Thị Mai', '0901111001', 'mai.nguyen@Hà Ninh.vn', 'Tiếng Anh giao tiếp, Business English', 'Thạc sĩ Ngôn ngữ Anh, 8 năm kinh nghiệm giảng dạy tại các trung tâm lớn. Chứng chỉ TESOL quốc tế.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', 1),
('Trần Văn Hùng', '0901111002', 'hung.tran@Hà Ninh.vn', 'IELTS, Academic English', 'IELTS 8.5, 10 năm kinh nghiệm luyện thi IELTS. Đã giúp hơn 500 học viên đạt band 6.5+.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 1),
('Lê Hoàng Nam', '0901111003', 'nam.le@Hà Ninh.vn', 'TOEIC, Tiếng Anh văn phòng', 'Chuyên gia luyện thi TOEIC, TOEIC 990. Phương pháp học hiệu quả giúp tăng 200+ điểm.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', 1),
('Vương Tiểu Minh', '0901111004', 'minh.vuong@Hà Ninh.vn', 'Tiếng Trung cơ bản, HSK', 'Giảng viên người Trung Quốc, thạc sĩ Đại học Bắc Kinh. 6 năm giảng dạy tiếng Trung cho người Việt.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', 1),
('Lý Mỹ Hoa', '0901111005', 'hoa.ly@Hà Ninh.vn', 'Tiếng Trung giao tiếp, Thương mại', 'Cử nhân Đại học Phúc Đán, chuyên đào tạo tiếng Trung thương mại và giao tiếp nâng cao.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', 1),
('Tanaka Yuki', '0901111006', 'yuki.tanaka@Hà Ninh.vn', 'Tiếng Nhật N5-N3, Văn hóa Nhật', 'Giảng viên người Nhật, cử nhân Đại học Tokyo. Phương pháp dạy sinh động, kết hợp văn hóa.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', 1),
('Park Min Young', '0901111007', 'minyoung.park@Hà Ninh.vn', 'Tiếng Hàn TOPIK, Giao tiếp', 'Giảng viên người Hàn Quốc, thạc sĩ Giáo dục. Đam mê truyền đạt ngôn ngữ và văn hóa Hàn.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', 1),
('Phạm Thanh Hà', '0901111008', 'ha.pham@Hà Ninh.vn', 'Tiếng Anh trẻ em, Phonics', 'Chuyên gia giáo dục mầm non, 5 năm kinh nghiệm dạy tiếng Anh cho trẻ 4-12 tuổi.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', 1);

-- Map instructors to existing courses (course id 1-8 -> instructor id 1-8)
UPDATE courses SET instructor_id = 1 WHERE id = 1;
UPDATE courses SET instructor_id = 2 WHERE id = 2;
UPDATE courses SET instructor_id = 3 WHERE id = 3;
UPDATE courses SET instructor_id = 4 WHERE id = 4;
UPDATE courses SET instructor_id = 5 WHERE id = 5;
UPDATE courses SET instructor_id = 6 WHERE id = 6;
UPDATE courses SET instructor_id = 7 WHERE id = 7;
UPDATE courses SET instructor_id = 8 WHERE id = 8;

-- ============================================================
-- SEED: Forum posts
-- ============================================================
INSERT INTO forum_posts (title, content, image_url, admin_id, views, likes, dislikes, is_published) VALUES
(
  '5 Phương pháp học tiếng Anh hiệu quả nhất 2024',
  'Học tiếng Anh không chỉ là việc ngồi đọc sách giáo khoa. Dưới đây là 5 phương pháp đã được chứng minh hiệu quả:\n\n1. **Immersion Method**: Tạo môi trường tiếng Anh xung quanh bạn - xem phim, nghe nhạc, đọc báo bằng tiếng Anh hàng ngày.\n\n2. **Spaced Repetition**: Ôn tập từ vựng theo chu kỳ tăng dần. Dùng app như Anki để nhớ từ lâu hơn.\n\n3. **Shadowing**: Nghe và nói theo ngay lập tức. Phương pháp này cải thiện phát âm và ngữ điệu rất nhanh.\n\n4. **Active Learning**: Thay vì học thụ động, hãy chủ động viết, nói, thảo luận. Tham gia câu lạc bộ tiếng Anh.\n\n5. **Contextual Learning**: Học từ vựng và ngữ pháp trong ngữ cảnh thực tế, không học riêng lẻ.',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600', 1, 245, 38, 2, 1
),
(
  'Chia sẻ kinh nghiệm thi IELTS 7.5 sau 4 tháng',
  'Sau 4 tháng học tập tại Hà Ninh, mình đã đạt IELTS 7.5. Đây là hành trình của mình:\n\n**Listening**: Nghe BBC, podcast mỗi ngày 30 phút. Luyện đề Cambridge IELTS 14-18.\n\n**Reading**: Đọc báo The Guardian, National Geographic. Luyện kỹ năng skimming và scanning.\n\n**Writing**: Viết ít nhất 1 bài Task 2 mỗi ngày. Nhờ giảng viên chấm và góp ý.\n\n**Speaking**: Luyện với bạn học, record lại để tự đánh giá. Thầy Hùng ở Hà Ninh đã giúp mình rất nhiều trong phần này.\n\nMẹo quan trọng nhất: Kiên trì và có lộ trình rõ ràng!',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600', 1, 189, 45, 1, 1
),
(
  'Tại sao nên học tiếng Trung trong thời đại mới?',
  'Tiếng Trung đang trở thành ngôn ngữ quan trọng thứ hai trên thế giới. Dưới đây là lý do bạn nên bắt đầu học:\n\n1. **Cơ hội việc làm**: Hàng ngàn doanh nghiệp Trung Quốc đang đầu tư tại Việt Nam.\n\n2. **Du lịch**: Khám phá nền văn hóa 5000 năm lịch sử.\n\n3. **Thương mại**: Trung Quốc là đối tác thương mại lớn nhất của Việt Nam.\n\n4. **Học bổng**: Nhiều chương trình học bổng du học Trung Quốc hấp dẫn.\n\nTại Hà Ninh, khóa Tiếng Trung Cơ Bản giúp bạn giao tiếp được sau 3 tháng!',
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600', 1, 132, 28, 3, 1
),
(
  'Lịch khai giảng các khóa học tháng 4/2024',
  'Hà Ninh xin thông báo lịch khai giảng các khóa học mới:\n\n- **Tiếng Anh Giao Tiếp**: 01/04/2024 - Thứ 2,4,6 tối\n- **IELTS Band 6.5+**: 05/04/2024 - Thứ 3,5,7 tối\n- **TOEIC 650+**: 08/04/2024 - Thứ 2,4,6 tối\n- **Tiếng Trung Cơ Bản**: 10/04/2024 - Thứ 3,5 tối\n- **Tiếng Nhật N5**: 12/04/2024 - Thứ 3,5,7 chiều\n\nƯu đãi: Giảm 10% học phí cho học viên đăng ký sớm trước 25/03/2024.\n\nLiên hệ hotline 0123 456 789 để được tư vấn!',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600', 1, 310, 52, 0, 1
),
(
  'Mẹo chinh phục TOEIC 900+ cho người đi làm',
  'Nếu bạn là người đi làm bận rộn, đây là cách luyện TOEIC hiệu quả:\n\n**Buổi sáng (30 phút)**: Nghe podcast tiếng Anh trên đường đi làm.\n\n**Giờ nghỉ trưa (20 phút)**: Luyện 1 part Reading trên app.\n\n**Buổi tối (45 phút)**: Làm 1 bộ đề mini test.\n\n**Cuối tuần**: Làm full test và review lỗi sai.\n\nVới lộ trình này, bạn hoàn toàn có thể đạt 900+ sau 3 tháng kiên trì!',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600', 1, 178, 35, 1, 1
);

-- ============================================================
-- SEED: Center settings
-- ============================================================
INSERT INTO center_settings (setting_key, setting_value) VALUES
('banner_image', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200'),
('about_image', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800'),
('gallery_1', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600'),
('gallery_2', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600'),
('gallery_3', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600'),
('center_phone', '0123 456 789'),
('center_address', '123 Nguyễn Văn Linh, Quận 7, TP.HCM');
