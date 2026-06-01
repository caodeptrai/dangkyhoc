const request = require('supertest');
const app = require('../src/app');

describe('Chatbot API - Public', () => {
  describe('POST /api/chatbot/message', () => {
    test('TC015: Return response for valid message', async () => {
      const response = await request(app)
        .post('/api/chatbot/message')
        .send({ message: 'Tôi muốn học tiếng Nhật' })
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('reply');
      console.log('TC015: Bot returned response');
    });

    test('TC016: Return default response for unknown message', async () => {
      const response = await request(app)
        .post('/api/chatbot/message')
        .send({ message: 'asdfghjkl' })
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('success');
      console.log('TC016: Bot returned response for unknown message');
    });

    test('TC017: Reject empty message', async () => {
      const response = await request(app)
        .post('/api/chatbot/message')
        .send({ message: '' })
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC017: Empty message rejected');
    });
  });
});
