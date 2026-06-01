const request = require('supertest');
const app = require('../src/app');

describe('Health Check API', () => {
  test('TC001: GET /api/health - API health check', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('API is running');
    console.log(`TC001: Health check - ${response.body.message}`);
  });
});
