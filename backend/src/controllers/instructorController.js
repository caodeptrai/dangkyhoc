const pool = require('../config/db');

exports.getPublicInstructors = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, full_name, specialization, bio, avatar_url FROM instructors WHERE is_active = 1 ORDER BY full_name'
    );
    res.json({ success: true, message: 'Danh sách giảng viên.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getAllInstructors = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM instructors ORDER BY created_at DESC');
    res.json({ success: true, message: 'Tất cả giảng viên.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.createInstructor = async (req, res, next) => {
  try {
    const { full_name, phone, email, specialization, bio, avatar_url, is_active } = req.body;
    if (!full_name) {
      return res.status(400).json({ success: false, message: 'Tên giảng viên là bắt buộc.' });
    }
    const [result] = await pool.query(
      `INSERT INTO instructors (full_name, phone, email, specialization, bio, avatar_url, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [full_name, phone || '', email || '', specialization || '', bio || '', avatar_url || '', is_active !== undefined ? is_active : 1]
    );
    const [row] = await pool.query('SELECT * FROM instructors WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Tạo giảng viên thành công.', data: row[0] });
  } catch (error) {
    next(error);
  }
};

exports.updateInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, specialization, bio, avatar_url, is_active } = req.body;
    const [existing] = await pool.query('SELECT * FROM instructors WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giảng viên.' });
    }
    await pool.query(
      `UPDATE instructors SET full_name=?, phone=?, email=?, specialization=?, bio=?, avatar_url=?, is_active=? WHERE id=?`,
      [full_name, phone, email, specialization, bio, avatar_url, is_active, id]
    );
    const [updated] = await pool.query('SELECT * FROM instructors WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cập nhật giảng viên thành công.', data: updated[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM instructors WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giảng viên.' });
    }
    await pool.query('DELETE FROM instructors WHERE id = ?', [id]);
    res.json({ success: true, message: 'Xóa giảng viên thành công.' });
  } catch (error) {
    next(error);
  }
};
