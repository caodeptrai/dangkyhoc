const request = require('supertest');
const app = require('../src/app');

describe('Instructor API - Public', () => {
  describe('GET /api/instructors', () => {
    test('TC026: Return list of active instructors', async () => {
      const response = await request(app)
        .get('/api/instructors')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      console.log(`TC026: Returned ${response.body.data.length} active instructors`);

      if (response.body.data.length > 0) {
        const instructor = response.body.data[0];
        expect(instructor).toHaveProperty('full_name');
        expect(instructor).toHaveProperty('specialization');
        console.log('TC026: Instructor has required fields');
      }
    });
  });
});
