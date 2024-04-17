import request from 'supertest';
import app from '../src/index';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

let server: http.Server;

beforeAll(done => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll(done => {
  if (server) {
    server.close(() => {
      done();
    });
  }
});

describe('GET /', () => {
  it('should return 200 OK and "Hello World"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});

describe('API Route Testing', () => {
  describe('GET /', () => {
    it('should return Hello World', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toBe('Hello World');
    });
  });

  describe('POST /api/generate_json_bridge', () => {
    const masterToken = process.env.KEY || '';

    it('should return 401 Unauthorized if token is not provided', async () => {
      const res = await request(app).post('/api/generate_json_bridge');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    it('should return 401 Unauthorized if token is incorrect', async () => {
      const res = await request(app)
        .post('/api/generate_json_bridge')
        .set('token', 'incorrect_token');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    it('should return 200 OK with correct data when provided with valid token', async () => {
      const res = await request(app)
        .post('/api/generate_json_bridge')
        .set('token', masterToken);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('auth');
      expect(res.body).toHaveProperty('items');
      expect(res.body).toHaveProperty('accounts');
      expect(res.body).toHaveProperty('transactions');
    });
  });
});
