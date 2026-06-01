const request = require('supertest');
const app = require('../src/app');

describe('Contact API - Public', () => {
  const validContact = {
    name: 'Test Contact',
    email: 'contact@example.com',
    phone: '0912345678',
    subject: 'Test Subject',
    message: 'This is a test message'
  };

  describe('POST /api/contacts', () => {
    test('TC012: Create contact with valid data', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .send(validContact)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log('TC012: Contact created successfully');
    });

    test('TC013: Reject contact without subject', async () => {
      const invalidData = { ...validContact };
      delete invalidData.subject;

      const response = await request(app)
        .post('/api/contacts')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC013: Rejected contact without subject');
    });

    test('TC014: Reject contact with invalid email', async () => {
      const invalidData = { ...validContact, email: 'invalid-email' };

      const response = await request(app)
        .post('/api/contacts')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC014: Rejected invalid email format');
    });
  });
});
