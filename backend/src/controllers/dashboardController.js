const pool = require('../config/db');

exports.getStats = async (req, res, next) => {
  try {
    const [[{ totalCourses }]] = await pool.query('SELECT COUNT(*) as totalCourses FROM courses');
    const [[{ totalRegistrations }]] = await pool.query('SELECT COUNT(*) as totalRegistrations FROM course_registrations');
    const [[{ totalContacts }]] = await pool.query('SELECT COUNT(*) as totalContacts FROM contact_requests');
    const [[{ totalChatLogs }]] = await pool.query('SELECT COUNT(*) as totalChatLogs FROM chatbot_logs');
    const [[{ totalInstructors }]] = await pool.query('SELECT COUNT(*) as totalInstructors FROM instructors');
    const [[{ totalPosts }]] = await pool.query('SELECT COUNT(*) as totalPosts FROM forum_posts');

    const [[{ newRegistrations }]] = await pool.query(
      "SELECT COUNT(*) as newRegistrations FROM course_registrations WHERE status = 'new'"
    );
    const [[{ pendingContacts }]] = await pool.query(
      "SELECT COUNT(*) as pendingContacts FROM contact_requests WHERE status = 'pending'"
    );
    const [[{ confirmedRegistrations }]] = await pool.query(
      "SELECT COUNT(*) as confirmedRegistrations FROM course_registrations WHERE status = 'confirmed'"
    );

    const [[{ totalRevenue: rawRevenue }]] = await pool.query(
      `SELECT COALESCE(SUM(c.tuition_fee), 0) as totalRevenue
       FROM course_registrations cr JOIN courses c ON cr.course_id = c.id
       WHERE cr.status = 'confirmed'`
    );
    const totalRevenue = Number(rawRevenue) || 0;

    // Deal close rate
    const dealCloseRate = totalRegistrations > 0
      ? Math.round((confirmedRegistrations / totalRegistrations) * 100 * 10) / 10
      : 0;

    const [rawRegByDay] = await pool.query(
      `SELECT DATE_FORMAT(created_at, '%d/%m') as date, COUNT(*) as count
       FROM course_registrations
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) ASC`
    );
    const registrationsByDay = rawRegByDay.map(r => ({ date: r.date, count: Number(r.count) }));

    const [rawRegByCourse] = await pool.query(
      `SELECT c.title, COUNT(cr.id) as count
       FROM courses c LEFT JOIN course_registrations cr ON c.id = cr.course_id
       GROUP BY c.id, c.title
       ORDER BY count DESC`
    );
    const registrationsByCourse = rawRegByCourse.map(r => ({ title: r.title, count: Number(r.count) }));

    const [rawRevenueByCourse] = await pool.query(
      `SELECT c.title, COALESCE(SUM(c.tuition_fee), 0) as revenue, COUNT(cr.id) as count
       FROM courses c LEFT JOIN course_registrations cr ON c.id = cr.course_id AND cr.status = 'confirmed'
       GROUP BY c.id, c.title
       ORDER BY revenue DESC`
    );
    const revenueByCourse = rawRevenueByCourse.map(r => ({
      title: r.title,
      revenue: Number(r.revenue) || 0,
      count: Number(r.count) || 0
    }));

    res.json({
      success: true,
      message: 'Thống kê dashboard.',
      data: {
        totalCourses,
        totalRegistrations,
        totalContacts,
        totalChatLogs,
        totalInstructors,
        totalPosts,
        newRegistrations,
        pendingContacts,
        confirmedRegistrations,
        totalRevenue,
        dealCloseRate,
        registrationsByDay,
        registrationsByCourse,
        revenueByCourse
      }
    });
  } catch (error) {
    next(error);
  }
};
