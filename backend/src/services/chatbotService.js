const pool = require('../config/db');

/**
 * Rule-based chatbot service.
 *
 * UPGRADE PATH:
 * To replace with OpenAI API, modify the `getResponse` function:
 *
 *   const { OpenAI } = require('openai');
 *   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 *
 *   async function getResponse(userMessage) {
 *     const courses = await getCoursesData();
 *     const systemPrompt = `Bạn là tư vấn viên trung tâm ngoại ngữ. Dữ liệu khóa học: ${JSON.stringify(courses)}`;
 *     const completion = await openai.chat.completions.create({
 *       model: 'gpt-3.5-turbo',
 *       messages: [
 *         { role: 'system', content: systemPrompt },
 *         { role: 'user', content: userMessage }
 *       ]
 *     });
 *     return completion.choices[0].message.content;
 *   }
 *
 * For local LLM, replace the OpenAI endpoint with your local server URL.
 * For RAG, add vector search on course descriptions before calling the LLM.
 */

async function getCoursesData() {
  const [rows] = await pool.query(
    'SELECT title, language, level, tuition_fee, duration, schedule, short_description FROM courses WHERE is_active = 1'
  );
  return rows;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

async function getResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  const courses = await getCoursesData();

  // --- Greeting ---
  if (msg.match(/xin chào|hello|hi|chào|hey/)) {
    return 'Xin chào! 👋 Tôi là trợ lý tư vấn của Trung tâm Ngoại ngữ. Bạn muốn hỏi về khóa học, học phí, lịch học hay cách đăng ký? Tôi sẵn sàng giúp bạn!';
  }

  // --- Course list ---
  if (msg.match(/khóa học|khoa hoc|lớp nào|lop nao|có những|dạy gì|day gi|học gì|hoc gi|danh sách/)) {
    const courseList = courses.map((c, i) => `${i + 1}. ${c.title} (${c.language} - ${c.level})`).join('\n');
    return `Trung tâm hiện có các khóa học sau:\n\n${courseList}\n\nBạn muốn biết thêm chi tiết khóa nào?`;
  }

  // --- Tuition / Fee ---
  if (msg.match(/học phí|hoc phi|bao nhiêu tiền|bao nhieu tien|giá|gia|chi phí|chi phi|phí/)) {
    const feeList = courses.map(c => `• ${c.title}: ${formatCurrency(c.tuition_fee)} / ${c.duration}`).join('\n');
    return `Bảng học phí các khóa học:\n\n${feeList}\n\nBạn có thể đăng ký trực tiếp trên website hoặc liên hệ để được tư vấn thêm!`;
  }

  // --- Schedule ---
  if (msg.match(/lịch học|lich hoc|thời gian|thoi gian|học khi nào|hoc khi nao|buổi/)) {
    const scheduleList = courses.map(c => `• ${c.title}: ${c.schedule} (${c.duration})`).join('\n');
    return `Lịch học các khóa:\n\n${scheduleList}\n\nBạn muốn đăng ký khóa nào?`;
  }

  // --- Registration ---
  if (msg.match(/đăng ký|dang ky|ghi danh|enroll|đăng kí|dang ki|cách.*đăng|cach.*dang/)) {
    return 'Để đăng ký khóa học, bạn có thể:\n\n1. 📝 Đăng ký online: Vào trang "Khóa học" → Chọn khóa → Nhấn "Đăng ký ngay" → Điền thông tin\n2. 📞 Gọi hotline: 0123 456 789\n3. 🏢 Đến trực tiếp trung tâm: 123 Nguyễn Văn Linh, Quận 7, TP.HCM\n\nBạn cần tư vấn thêm không?';
  }

  // --- Address / Location ---
  if (msg.match(/địa chỉ|dia chi|ở đâu|o dau|chỗ nào|cho nao|location|vị trí|vi tri/)) {
    return 'Trung tâm Ngoại ngữ của chúng tôi tọa lạc tại:\n\n📍 123 Nguyễn Văn Linh, Quận 7, TP.HCM\n\n🕐 Giờ làm việc: Thứ 2 - Chủ nhật, 8:00 - 21:00\n📞 Hotline: 0123 456 789\n📧 Email: info@trungtamngoaingu.vn';
  }

  // --- Contact / Consultation ---
  if (msg.match(/liên hệ|lien he|tư vấn|tu van|hotline|điện thoại|dien thoai|contact|gọi/)) {
    return 'Bạn có thể liên hệ với chúng tôi qua:\n\n📞 Hotline: 0123 456 789\n📧 Email: info@trungtamngoaingu.vn\n💬 Hoặc gửi yêu cầu tư vấn tại trang "Liên hệ" trên website\n\nĐội ngũ tư vấn sẽ liên hệ bạn trong vòng 24h!';
  }

  // --- Specific language queries ---
  if (msg.match(/tiếng anh|tieng anh|english/)) {
    const engCourses = courses.filter(c => c.language === 'Tiếng Anh');
    const list = engCourses.map(c => `• ${c.title}: ${formatCurrency(c.tuition_fee)} - ${c.schedule}`).join('\n');
    return `Các khóa Tiếng Anh:\n\n${list}\n\nBạn quan tâm khóa nào?`;
  }

  if (msg.match(/tiếng trung|tieng trung|chinese|trung quốc|trung quoc/)) {
    const cnCourses = courses.filter(c => c.language === 'Tiếng Trung');
    const list = cnCourses.map(c => `• ${c.title}: ${formatCurrency(c.tuition_fee)} - ${c.schedule}`).join('\n');
    return `Các khóa Tiếng Trung:\n\n${list}\n\nBạn muốn biết thêm chi tiết không?`;
  }

  if (msg.match(/tiếng nhật|tieng nhat|japanese|nhật bản|nhat ban/)) {
    const jpCourses = courses.filter(c => c.language === 'Tiếng Nhật');
    const list = jpCourses.map(c => `• ${c.title}: ${formatCurrency(c.tuition_fee)} - ${c.schedule}`).join('\n');
    return `Các khóa Tiếng Nhật:\n\n${list}\n\nBạn muốn đăng ký không?`;
  }

  if (msg.match(/tiếng hàn|tieng han|korean|hàn quốc|han quoc/)) {
    const krCourses = courses.filter(c => c.language === 'Tiếng Hàn');
    const list = krCourses.map(c => `• ${c.title}: ${formatCurrency(c.tuition_fee)} - ${c.schedule}`).join('\n');
    return `Các khóa Tiếng Hàn:\n\n${list}\n\nBạn quan tâm nhé?`;
  }

  if (msg.match(/ielts/i)) {
    const ielts = courses.find(c => c.title.toLowerCase().includes('ielts'));
    if (ielts) {
      return `Khóa Luyện thi IELTS:\n• Học phí: ${formatCurrency(ielts.tuition_fee)}\n• Thời lượng: ${ielts.duration}\n• Lịch học: ${ielts.schedule}\n• ${ielts.short_description}\n\nĐăng ký ngay trên website nhé!`;
    }
  }

  if (msg.match(/toeic/i)) {
    const toeic = courses.find(c => c.title.toLowerCase().includes('toeic'));
    if (toeic) {
      return `Khóa Luyện thi TOEIC:\n• Học phí: ${formatCurrency(toeic.tuition_fee)}\n• Thời lượng: ${toeic.duration}\n• Lịch học: ${toeic.schedule}\n• ${toeic.short_description}\n\nĐăng ký ngay trên website nhé!`;
    }
  }

  // --- Thank you ---
  if (msg.match(/cảm ơn|cam on|thank|cám ơn/)) {
    return 'Không có gì! Rất vui được hỗ trợ bạn. Nếu có thêm câu hỏi, đừng ngại hỏi nhé! 😊';
  }

  // --- Fallback ---
  return 'Cảm ơn bạn đã liên hệ! Tôi có thể giúp bạn tìm hiểu về:\n\n• 📚 Danh sách khóa học\n• 💰 Học phí\n• 📅 Lịch học\n• 📝 Cách đăng ký\n• 📍 Địa chỉ trung tâm\n• 📞 Thông tin liên hệ\n\nHãy hỏi tôi bất cứ điều gì!';
}

module.exports = { getResponse };
