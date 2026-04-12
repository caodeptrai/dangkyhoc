const pool = require('../config/db');

exports.createContact = async (req, res, next) => {
  try {
    const { full_name, phone, email, message } = req.body;

    if (!full_name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Email không hợp lệ.' });
    }

    const [result] = await pool.query(
      `INSERT INTO contact_requests (full_name, phone, email, message)
       VALUES (?, ?, ?, ?)`,
      [full_name, phone, email, message]
    );

    res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ bạn sớm.',
      data: { id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contact_requests ORDER BY created_at DESC'
    );
    res.json({ success: true, message: 'Danh sách yêu cầu tư vấn.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'processed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Trạng thái không hợp lệ. Chọn: ${validStatuses.join(', ')}`
      });
    }

    const [existing] = await pool.query('SELECT id FROM contact_requests WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu.' });
    }

    await pool.query('UPDATE contact_requests SET status = ? WHERE id = ?', [status, id]);

    res.json({ success: true, message: 'Cập nhật trạng thái thành công.' });
  } catch (error) {
    next(error);
  }
};
