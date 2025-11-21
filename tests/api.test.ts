import request from 'supertest';
import { createServer } from 'http';
import app from '../app'; // Adjust the import based on your app structure

describe('API Endpoints', () => {
  let server;

  beforeAll((done) => {
    server = createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('POST /api/links', () => {
    it('should create a new link and return the shortened URL', async () => {
      const response = await request(server)
        .post('/api/links')
        .send({ longUrl: 'https://example.com', customCode: 'exmpl' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('shortUrl');
      expect(response.body.shortUrl).toMatch(/exmpl/);
    });
  });

  describe('GET /api/links', () => {
    it('should return a list of links', async () => {
      const response = await request(server).get('/api/links');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('DELETE /api/links/:id', () => {
    it('should delete a link by ID', async () => {
      const response = await request(server).delete('/api/links/1');

      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/stats/:id', () => {
    it('should return statistics for a specific link', async () => {
      const response = await request(server).get('/api/stats/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('clicks');
      expect(response.body).toHaveProperty('lastClicked');
    });
  });
});