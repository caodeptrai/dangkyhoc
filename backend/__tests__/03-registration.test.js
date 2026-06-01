const request = require('supertest');
const app = require('../src/app');

describe('Registration API - Public', () => {
  const validRegistration = {
    full_name: 'Test User',
    phone: '0909123456',
    email: 'test@example.com',
    date_of_birth: '2000-01-15',
    gender: 'male',
    address: 'TP.HCM',
    course_id: 1,
    note: 'Test registration'
  };

  describe('POST /api/registrations', () => {
    test('TC006: Create registration with valid data', async () => {
      const response = await request(app)
        .post('/api/registrations')
        .send(validRegistration)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log(`TC006: Registration created successfully`);
    });

    test('TC007: Reject registration without full_name', async () => {
      const invalidData = { ...validRegistration };
      delete invalidData.full_name;

      const response = await request(app)
        .post('/api/registrations')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC007: Rejected registration without full_name');
    });

    test('TC008: Reject registration with invalid email', async () => {
      const invalidData = { ...validRegistration, email: 'invalid-email' };

      const response = await request(app)
        .post('/api/registrations')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC008: Rejected invalid email format');
    });

    test('TC009: Reject registration with invalid phone', async () => {
      const invalidData = { ...validRegistration, phone: 'abc123' };

      const response = await request(app)
        .post('/api/registrations')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC009: Rejected invalid phone format');
    });

    test('TC010: Reject registration without course_id', async () => {
      const invalidData = { ...validRegistration };
      delete invalidData.course_id;

      const response = await request(app)
        .post('/api/registrations')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC010: Rejected registration without course_id');
    });

    test('TC011: Allow duplicate email registrations', async () => {
      const response = await request(app)
        .post('/api/registrations')
        .send(validRegistration)
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log('TC011: Duplicate email registration allowed');
    });
  });
});
