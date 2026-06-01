const pool = require('../config/db');

exports.createRegistration = async (req, res, next) => {
  try {
    const { full_name, phone, email, date_of_birth, gender, address, course_id, note } = req.body;

    if (!full_name || !phone || !email || !course_id) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ họ tên, số điện thoại, email và chọn khóa học.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Email không hợp lệ.' });
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: 'Số điện thoại không hợp lệ.' });
    }

    const [course] = await pool.query('SELECT * FROM courses WHERE id = ? AND is_active = 1', [course_id]);
    if (course.length === 0) {
      return res.status(400).json({ success: false, message: 'Khóa học không tồn tại hoặc đã ngừng.' });
    }

    if (course[0].status === 'finished') {
      return res.status(400).json({ success: false, message: 'Khóa học đã kết thúc, không thể đăng ký.' });
    }

    if (course[0].max_students != null) {
      const [countResult] = await pool.query(
        `SELECT COUNT(*) as cnt FROM course_registrations WHERE course_id = ? AND status != 'cancelled'`,
        [course_id]
      );
      if (countResult[0].cnt >= course[0].max_students) {
        return res.status(400).json({ success: false, message: 'Khóa học đã đủ số lượng học viên tối đa. Vui lòng chọn khóa học khác.' });
      }
    }

    const [result] = await pool.query(
      `INSERT INTO course_registrations (full_name, phone, email, date_of_birth, gender, address, course_id, note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, phone, email, date_of_birth || null, gender || 'other', address || '', course_id, note || '']
    );

    res.status(201).json({
      success: true,
      message: 'Đăng ký khóa học thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
      data: { id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllRegistrations = async (req, res, next) => {
  try {
    const { search, course_id } = req.query;

    let sql = `SELECT cr.*, c.title as course_title, c.max_students as course_max_students,
               c.status as course_status,
               (SELECT COUNT(*) FROM course_registrations r WHERE r.course_id = cr.course_id AND r.status != 'cancelled') as enrolled_count
               FROM course_registrations cr
               LEFT JOIN courses c ON cr.course_id = c.id
               WHERE 1=1`;
    const params = [];

    if (search) {
      sql += ` AND (cr.full_name LIKE ? OR cr.phone LIKE ? OR cr.email LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (course_id) {
      sql += ` AND cr.course_id = ?`;
      params.push(course_id);
    }

    sql += ` ORDER BY cr.created_at DESC`;

    const [rows] = await pool.query(sql, params);
    res.json({ success: true, message: 'Danh sách đăng ký.', data: rows });
  } catch (error) {
    next(error);
  }
};

async function autoUpdateCourseStatus(courseId) {
  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    if (rows.length === 0) return;

    const course = rows[0];
    if (!course.start_date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(course.start_date);
    start.setHours(0, 0, 0, 0);

    const durationMatch = course.duration ? course.duration.match(/(\d+)/) : null;
    const months = durationMatch ? parseInt(durationMatch[1]) : 3;
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);

    let newStatus = course.status;
    if (today < start) {
      newStatus = 'upcoming';
    } else if (today >= start && today <= end) {
      newStatus = 'ongoing';
    } else {
      newStatus = 'finished';
    }

    if (newStatus !== course.status) {
      await pool.query('UPDATE courses SET status = ? WHERE id = ?', [newStatus, courseId]);
    }
  } catch (err) {
    console.error('Auto update course status error:', err);
  }
}

async function recalcCourseStatus(courseId) {
  if (!courseId) return;
  await autoUpdateCourseStatus(courseId);
}

exports.updateRegistrationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['new', 'consulted', 'confirmed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Trạng thái không hợp lệ. Chọn: ${validStatuses.join(', ')}`
      });
    }

    const [existing] = await pool.query('SELECT * FROM course_registrations WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đăng ký.' });
    }

    const oldStatus = existing[0].status;
    const courseId = existing[0].course_id;

    await pool.query('UPDATE course_registrations SET status = ? WHERE id = ?', [status, id]);

    if (oldStatus !== status) {
      recalcCourseStatus(courseId);
    }

    res.json({ success: true, message: 'Cập nhật trạng thái thành công.' });
  } catch (error) {
    next(error);
  }
};
