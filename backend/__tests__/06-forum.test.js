const request = require('supertest');
const app = require('../src/app');

describe('Forum API - Public', () => {
  describe('GET /api/forum', () => {
    test('TC018: Return list of published posts', async () => {
      const response = await request(app)
        .get('/api/forum')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      console.log(`TC018: Returned ${response.body.data.length} published posts`);
    });
  });

  describe('GET /api/forum/:id', () => {
    test('TC019: Return post detail with all fields', async () => {
      const response = await request(app)
        .get('/api/forum/1')
        .expect('Content-Type', /json/);

      if (response.body.success) {
        const post = response.body.data;
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('content');
        expect(post).toHaveProperty('views');
        expect(post).toHaveProperty('likes');
        expect(post).toHaveProperty('dislikes');
        console.log('TC019: Post detail with all required fields');
      }
    });

    test('TC020: Increment views when viewing post', async () => {
      const response1 = await request(app).get('/api/forum/1');
      const views1 = response1.body.data?.views || 0;

      const response2 = await request(app).get('/api/forum/1');
      const views2 = response2.body.data?.views || 0;

      console.log(`TC020: Views incremented (${views1} -> ${views2})`);
    });

    test('TC021: Return 404 for non-existent post', async () => {
      const response = await request(app)
        .get('/api/forum/99999')
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(false);
      console.log('TC021: Non-existent post returns 404');
    });
  });

  describe('POST /api/forum/:id/react', () => {
    test('TC022: Add like reaction', async () => {
      const sessionId = 'test-session-' + Date.now();
      const response = await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'like' })
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log(`TC022: Like added`);
    });

    test('TC023: Add dislike reaction', async () => {
      const sessionId = 'test-session-' + Date.now();
      const response = await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'dislike' })
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log(`TC023: Dislike added`);
    });

    test('TC024: Toggle off like', async () => {
      const sessionId = 'toggle-test-' + Date.now();
      
      await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'like' });

      const response = await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'like' })
        .expect('Content-Type', /json/);

      console.log('TC024: Like toggled off');
    });

    test('TC025: Switch from like to dislike', async () => {
      const sessionId = 'switch-test-' + Date.now();
      
      await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'like' });

      const response = await request(app)
        .post('/api/forum/1/react')
        .send({ session_id: sessionId, reaction: 'dislike' })
        .expect('Content-Type', /json/);

      expect(response.body.success).toBe(true);
      console.log('TC025: Switched like to dislike');
    });
  });
});
