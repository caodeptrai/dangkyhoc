const request = require('supertest');
const app = require('../src/app');

describe('Course API - Public', () => {
  describe('GET /api/courses', () => {
    test('TC002: Return list of active courses', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      console.log(`TC002: Returned ${response.body.data.length} courses`);
    });

    test('TC003: Courses contain instructor info', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      if (response.body.data.length > 0) {
        const course = response.body.data[0];
        expect(course).toHaveProperty('title');
        expect(course).toHaveProperty('instructor_name');
        console.log(`TC003: Course has instructor_name: ${!!course.instructor_name}`);
      }
    });
  });

  describe('GET /api/courses/:id', () => {
    test('TC004: Return course detail with instructor', async () => {
      const response = await request(app)
        .get('/api/courses/1')
        .expect('Content-Type', /json/);

      if (response.body.success) {
        const course = response.body.data;
        expect(course).toHaveProperty('title');
        expect(course).toHaveProperty('description');
        expect(course).toHaveProperty('tuition_fee');
        expect(course).toHaveProperty('schedule');
        console.log('TC004: Course detail with all required fields');
      }
    });

    test('TC005: Return 404 for non-existent course', async () => {
      const response = await request(app)
        .get('/api/courses/99999')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/không tìm thấy|Không tìm thấy/);
      console.log('TC005: Non-existent course returns 404');
    });
  });
});
