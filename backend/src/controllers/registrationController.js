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

    const [course] = await pool.query('SELECT id FROM courses WHERE id = ? AND is_active = 1', [course_id]);
    if (course.length === 0) {
      return res.status(400).json({ success: false, message: 'Khóa học không tồn tại hoặc đã ngừng.' });
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

    let sql = `SELECT cr.*, c.title as course_title
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

    const [existing] = await pool.query('SELECT id FROM course_registrations WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đăng ký.' });
    }

    await pool.query('UPDATE course_registrations SET status = ? WHERE id = ?', [status, id]);

    res.json({ success: true, message: 'Cập nhật trạng thái thành công.' });
  } catch (error) {
    next(error);
  }
};
