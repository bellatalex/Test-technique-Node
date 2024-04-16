import request from 'supertest';
import app from '../src/index';

let server: any;

beforeAll(done => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done();
  });
});

afterAll(done => {
  if (server) {
    server.close(() => {
      console.log('Test server closed');
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

describe('GET /api/generate_json_bridge', () => {
  it('should return 200 OK with message "Accès autorisé à l\'API sécurisée"', async () => {
    const response = await request(app)
      .get('/api/generate_json_bridge')
      .set(
        'token',
        "8dJyzP1.:3Mbpr11y~8ZUdEY*E.m&LV?dCqT96U'H:-(I?!YGgyyuGgp2VawTJ!t'*Uw$ekuO`YeWoip~WPC/TFL&|qQXf$/W7'QVIPp0U9tnGPhuD'@GuEdZO/G^^Ect+q!enpn"
      );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Accès autorisé à l'API sécurisée",
    });
  });

  it('should return 401 Unauthorized without token', async () => {
    const response = await request(app).get('/api/generate_json_bridge');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('should return 401 Unauthorized with invalid token', async () => {
    const response = await request(app)
      .get('/api/generate_json_bridge')
      .set('token', 'invalid_token');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });
});
