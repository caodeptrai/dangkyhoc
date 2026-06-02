const createCourse = (overrides = {}) => ({
  id: 1,
  title: 'Khóa tiếng Nhật N5',
  language: 'Tiếng Nhật',
  level: 'N5',
  tuition_fee: 2500000,
  duration: '3 tháng',
  schedule: 'Tối 2-4-6',
  short_description: 'Khóa học nhập môn tiếng Nhật.',
  description: 'Khóa học giúp học viên nắm vững kiến thức nền tảng.',
  instructor_id: 1,
  instructor_name: 'Nguyễn Văn A',
  instructor_full_name: 'Nguyễn Văn A',
  instructor_avatar: '',
  instructor_specialization: 'Tiếng Nhật',
  image_url: '',
  is_active: 1,
  max_students: 30,
  status: 'upcoming',
  start_date: '2026-07-01',
  enrolled_count: 0,
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
  ...overrides
});

const state = {
  nextRegistrationId: 1,
  nextContactId: 1,
  nextChatbotLogId: 1,
  nextReactionId: 1,
  courses: [createCourse()],
  registrations: [],
  contacts: [],
  chatbotLogs: [],
  instructors: [
    {
      id: 1,
      full_name: 'Nguyễn Văn A',
      specialization: 'Tiếng Nhật',
      bio: 'Giảng viên nhiều kinh nghiệm.',
      avatar_url: '',
      is_active: 1,
      created_at: '2026-01-01T00:00:00.000Z'
    }
  ],
  posts: [
    {
      id: 1,
      title: 'Bí quyết học ngoại ngữ hiệu quả',
      content: 'Luyện tập đều đặn mỗi ngày để cải thiện kỹ năng.',
      image_url: '',
      admin_id: 1,
      author_name: 'Admin',
      is_published: 1,
      views: 0,
      likes: 0,
      dislikes: 0,
      created_at: '2026-01-01T00:00:00.000Z'
    }
  ],
  reactions: []
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalizeSql = (sql) => sql.replace(/\s+/g, ' ').trim().toLowerCase();

async function query(sql, params = []) {
  const normalized = normalizeSql(sql);

  if (normalized.includes('from courses c left join instructors') && normalized.includes('where c.is_active = 1')) {
    return [clone(state.courses.filter((course) => course.is_active === 1)), []];
  }

  if (normalized.includes('from courses c left join instructors') && normalized.includes('where c.id = ? and c.is_active = 1')) {
    const id = Number(params[0]);
    return [clone(state.courses.filter((course) => course.id === id && course.is_active === 1)), []];
  }

  if (normalized === 'select * from courses where id = ? and is_active = 1') {
    const id = Number(params[0]);
    return [clone(state.courses.filter((course) => course.id === id && course.is_active === 1)), []];
  }

  if (normalized === 'select * from courses where id = ?') {
    const id = Number(params[0]);
    return [clone(state.courses.filter((course) => course.id === id)), []];
  }

  if (normalized.startsWith('select count(*) as cnt from course_registrations')) {
    const courseId = Number(params[0]);
    const cnt = state.registrations.filter((registration) => registration.course_id === courseId && registration.status !== 'cancelled').length;
    return [[{ cnt }], []];
  }

  if (normalized.startsWith('insert into course_registrations')) {
    const [full_name, phone, email, date_of_birth, gender, address, course_id, note] = params;
    const registration = {
      id: state.nextRegistrationId++,
      full_name,
      phone,
      email,
      date_of_birth,
      gender,
      address,
      course_id: Number(course_id),
      note,
      status: 'new',
      created_at: new Date().toISOString()
    };
    state.registrations.push(registration);
    return [{ insertId: registration.id }, []];
  }

  if (normalized.startsWith('insert into contact_requests')) {
    const [full_name, phone, email, message] = params;
    const contact = {
      id: state.nextContactId++,
      full_name,
      phone,
      email,
      message,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    state.contacts.push(contact);
    return [{ insertId: contact.id }, []];
  }

  if (normalized.startsWith('insert into chatbot_logs')) {
    const [user_message, bot_response] = params;
    state.chatbotLogs.push({ id: state.nextChatbotLogId++, user_message, bot_response });
    return [{ insertId: state.nextChatbotLogId - 1 }, []];
  }

  if (normalized.includes('from forum_posts fp left join admins') && normalized.includes('where fp.is_published = 1') && !normalized.includes('fp.id = ?')) {
    return [clone(state.posts.filter((post) => post.is_published === 1)), []];
  }

  if (normalized.startsWith('update forum_posts set views = views + 1 where id = ?')) {
    const id = Number(params[0]);
    const post = state.posts.find((item) => item.id === id);
    if (post) post.views += 1;
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.includes('from forum_posts fp left join admins') && normalized.includes('where fp.id = ? and fp.is_published = 1')) {
    const id = Number(params[0]);
    return [clone(state.posts.filter((post) => post.id === id && post.is_published === 1)), []];
  }

  if (normalized === 'select * from post_reactions where post_id = ? and session_id = ?') {
    const [postId, sessionId] = params;
    return [clone(state.reactions.filter((reaction) => reaction.post_id === Number(postId) && reaction.session_id === sessionId)), []];
  }

  if (normalized.startsWith('insert into post_reactions')) {
    const [postId, sessionId, reaction] = params;
    const row = { id: state.nextReactionId++, post_id: Number(postId), session_id: sessionId, reaction };
    state.reactions.push(row);
    return [{ insertId: row.id }, []];
  }

  if (normalized.startsWith('delete from post_reactions where id = ?')) {
    const id = Number(params[0]);
    const index = state.reactions.findIndex((reaction) => reaction.id === id);
    if (index !== -1) state.reactions.splice(index, 1);
    return [{ affectedRows: index !== -1 ? 1 : 0 }, []];
  }

  if (normalized.startsWith('update post_reactions set reaction = ? where id = ?')) {
    const [reaction, id] = params;
    const row = state.reactions.find((item) => item.id === Number(id));
    if (row) row.reaction = reaction;
    return [{ affectedRows: row ? 1 : 0 }, []];
  }

  if (normalized.includes('update forum_posts set likes = likes + 1, dislikes = dislikes - 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) { post.likes += 1; post.dislikes -= 1; }
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.includes('update forum_posts set dislikes = dislikes + 1, likes = likes - 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) { post.dislikes += 1; post.likes -= 1; }
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.startsWith('update forum_posts set likes = likes + 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) post.likes += 1;
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.startsWith('update forum_posts set dislikes = dislikes + 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) post.dislikes += 1;
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.startsWith('update forum_posts set likes = likes - 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) post.likes -= 1;
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized.startsWith('update forum_posts set dislikes = dislikes - 1 where id = ?')) {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    if (post) post.dislikes -= 1;
    return [{ affectedRows: post ? 1 : 0 }, []];
  }

  if (normalized === 'select likes, dislikes from forum_posts where id = ?') {
    const post = state.posts.find((item) => item.id === Number(params[0]));
    return [post ? [{ likes: post.likes, dislikes: post.dislikes }] : [], []];
  }

  if (normalized === 'select id, full_name, specialization, bio, avatar_url from instructors where is_active = 1 order by full_name') {
    return [clone(state.instructors.filter((instructor) => instructor.is_active === 1)), []];
  }

  return [[], []];
}

module.exports = { query, state };
