const pool = require('../config/db');

// === Public ===

exports.getPublishedPosts = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT fp.*, a.full_name as author_name
       FROM forum_posts fp LEFT JOIN admins a ON fp.admin_id = a.id
       WHERE fp.is_published = 1 ORDER BY fp.created_at DESC`
    );
    res.json({ success: true, message: 'Danh sách bài viết.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.getPostDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE forum_posts SET views = views + 1 WHERE id = ?', [id]);
    const [rows] = await pool.query(
      `SELECT fp.*, a.full_name as author_name
       FROM forum_posts fp LEFT JOIN admins a ON fp.admin_id = a.id
       WHERE fp.id = ? AND fp.is_published = 1`, [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết.' });
    }
    res.json({ success: true, message: 'Chi tiết bài viết.', data: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.reactToPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { session_id, reaction } = req.body;
    if (!session_id || !['like', 'dislike'].includes(reaction)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ.' });
    }

    const [existing] = await pool.query(
      'SELECT * FROM post_reactions WHERE post_id = ? AND session_id = ?', [id, session_id]
    );

    if (existing.length > 0) {
      const old = existing[0].reaction;
      if (old === reaction) {
        // Remove reaction (toggle off)
        await pool.query('DELETE FROM post_reactions WHERE id = ?', [existing[0].id]);
        await pool.query(`UPDATE forum_posts SET ${reaction}s = ${reaction}s - 1 WHERE id = ?`, [id]);
        const [post] = await pool.query('SELECT likes, dislikes FROM forum_posts WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Đã bỏ reaction.', data: { ...post[0], user_reaction: null } });
      } else {
        // Switch reaction
        await pool.query('UPDATE post_reactions SET reaction = ? WHERE id = ?', [reaction, existing[0].id]);
        await pool.query(`UPDATE forum_posts SET ${reaction}s = ${reaction}s + 1, ${old}s = ${old}s - 1 WHERE id = ?`, [id]);
        const [post] = await pool.query('SELECT likes, dislikes FROM forum_posts WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Đã đổi reaction.', data: { ...post[0], user_reaction: reaction } });
      }
    }

    // New reaction
    await pool.query(
      'INSERT INTO post_reactions (post_id, session_id, reaction) VALUES (?, ?, ?)',
      [id, session_id, reaction]
    );
    await pool.query(`UPDATE forum_posts SET ${reaction}s = ${reaction}s + 1 WHERE id = ?`, [id]);
    const [post] = await pool.query('SELECT likes, dislikes FROM forum_posts WHERE id = ?', [id]);
    res.json({ success: true, message: 'Đã thêm reaction.', data: { ...post[0], user_reaction: reaction } });
  } catch (error) {
    next(error);
  }
};

// === Admin ===

exports.adminGetAllPosts = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT fp.*, a.full_name as author_name
       FROM forum_posts fp LEFT JOIN admins a ON fp.admin_id = a.id
       ORDER BY fp.created_at DESC`
    );
    res.json({ success: true, message: 'Tất cả bài viết.', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.adminGetPostDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT fp.*, a.full_name as author_name
       FROM forum_posts fp LEFT JOIN admins a ON fp.admin_id = a.id WHERE fp.id = ?`, [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết.' });
    }
    const [reactions] = await pool.query(
      `SELECT reaction, COUNT(*) as count FROM post_reactions WHERE post_id = ? GROUP BY reaction`, [id]
    );
    res.json({ success: true, message: 'Chi tiết bài viết.', data: { ...rows[0], reactions } });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, image_url, is_published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Tiêu đề và nội dung là bắt buộc.' });
    }
    const admin_id = req.admin.id;
    const [result] = await pool.query(
      `INSERT INTO forum_posts (title, content, image_url, admin_id, is_published)
       VALUES (?, ?, ?, ?, ?)`,
      [title, content, image_url || '', admin_id, is_published !== undefined ? is_published : 1]
    );
    const [row] = await pool.query('SELECT * FROM forum_posts WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Tạo bài viết thành công.', data: row[0] });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, is_published } = req.body;
    const [existing] = await pool.query('SELECT * FROM forum_posts WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết.' });
    }
    await pool.query(
      'UPDATE forum_posts SET title=?, content=?, image_url=?, is_published=? WHERE id=?',
      [title, content, image_url, is_published, id]
    );
    const [updated] = await pool.query('SELECT * FROM forum_posts WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cập nhật bài viết thành công.', data: updated[0] });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM forum_posts WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết.' });
    }
    await pool.query('DELETE FROM forum_posts WHERE id = ?', [id]);
    res.json({ success: true, message: 'Xóa bài viết thành công.' });
  } catch (error) {
    next(error);
  }
};
