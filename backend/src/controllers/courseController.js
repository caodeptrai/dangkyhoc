const pool = require('../config/db');

exports.getPublicCourses = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, i.full_name as instructor_full_name, i.avatar_url as instructor_avatar
       FROM courses c LEFT JOIN instructors i ON c.instructor_id = i.id
       WHERE c.is_active = 1 ORDER BY c.created_at DESC`
    );
    res.json({ success: true, message: 'Danh sách khóa học.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getPublicCourseById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, i.full_name as instructor_full_name, i.avatar_url as instructor_avatar, i.specialization as instructor_specialization
       FROM courses c LEFT JOIN instructors i ON c.instructor_id = i.id
       WHERE c.id = ? AND c.is_active = 1`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học.' });
    }
    res.json({ success: true, message: 'Chi tiết khóa học.', data: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, i.full_name as instructor_full_name
       FROM courses c LEFT JOIN instructors i ON c.instructor_id = i.id
       ORDER BY c.created_at DESC`
    );
    res.json({ success: true, message: 'Tất cả khóa học.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const {
      title, language, level, tuition_fee, duration, schedule,
      short_description, description, instructor_name, image_url, is_active, instructor_id
    } = req.body;

    if (!title || !language || !level || !duration || !schedule) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO courses (title, language, level, tuition_fee, duration, schedule,
        short_description, description, instructor_name, image_url, is_active, instructor_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, language, level, tuition_fee || 0, duration, schedule,
       short_description || '', description || '', instructor_name || '',
       image_url || '', is_active !== undefined ? is_active : 1, instructor_id || null]
    );

    const [newCourse] = await pool.query('SELECT * FROM courses WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Tạo khóa học thành công.', data: newCourse[0] });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, language, level, tuition_fee, duration, schedule,
      short_description, description, instructor_name, image_url, is_active, instructor_id
    } = req.body;

    const [existing] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học.' });
    }

    await pool.query(
      `UPDATE courses SET title=?, language=?, level=?, tuition_fee=?, duration=?,
        schedule=?, short_description=?, description=?, instructor_name=?, image_url=?, is_active=?, instructor_id=?
       WHERE id=?`,
      [title, language, level, tuition_fee, duration, schedule,
       short_description, description, instructor_name, image_url, is_active, instructor_id || null, id]
    );

    const [updated] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cập nhật khóa học thành công.', data: updated[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học.' });
    }
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ success: true, message: 'Xóa khóa học thành công.' });
  } catch (error) {
    next(error);
  }
};
