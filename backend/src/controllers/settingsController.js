const pool = require('../config/db');

exports.getPublicSettings = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM center_settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    res.json({ success: true, message: 'Cài đặt.', data: settings });
  } catch (error) {
    next(error);
  }
};

exports.getAllSettings = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM center_settings ORDER BY setting_key');
    res.json({ success: true, message: 'Tất cả cài đặt.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;
    if (!Array.isArray(settings)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ.' });
    }
    for (const item of settings) {
      await pool.query(
        `INSERT INTO center_settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [item.key, item.value, item.value]
      );
    }
    res.json({ success: true, message: 'Cập nhật cài đặt thành công.' });
  } catch (error) {
    next(error);
  }
};
