import request from 'supertest';
import app from '../src/app';
import { ResponseStatusCodes } from '../src/types/ResponseStatusCodes.types';

let tagId = '';
let newTag = {
  name: 'Test Tag',
  type: 'Museum',
  historical_period: 'Test Period',
};

describe('Tag Tests', () => {
  describe('GET /api/tags', () => {
    it('should respond with bad request (400) for fetching tag with invalid id', async () => {
      const response = await request(app).get('/api/tags/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid tag ID');
    });

    it('should respond with ok (200) for fetching tag successfully', async () => {
      const response = await request(app).get('/api/tags/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('tag');
    });
  });
  describe('POST /api/tags', () => {
    it('should respond with bad request (400) for creating tag with invalid data', async () => {
      const response = await request(app).post('/api/tags');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('tag validation failed');
    });

    it('should respond with created (201) for creating a tag successfully', async () => {
      const response = await request(app).post('/api/tags').send(newTag);
      tagId = response.body.data.tagId;
      expect(response.status).toBe(ResponseStatusCodes.CREATED);
      expect(response.body.data).toHaveProperty('tagId');
    });
  });
  describe('PUT /api/tags/:id', () => {
    it('should respond with bad request (400) for updating tag with invalid id', async () => {
      const response = await request(app).put('/api/tags/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid tag ID');
    });

    it('should respond with ok (200) for updating tag successfully', async () => {
      const response = await request(app).put(`/api/tags/${tagId}`).send(newTag);
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('tag');
    });
  });
  describe('DELETE /api/tags/:id', () => {
    it('should respond with bad request (400) for deleting tag with invalid id', async () => {
      const response = await request(app).delete('/api/tags/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid tag ID');
    });

    it('should respond with ok (200) for deleting tag successfully', async () => {
      const response = await request(app).delete(`/api/tags/${tagId}`);
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('tag');
      expect(response.body.data.tag.deletedCount).toBe(1);
    });
  });
});
