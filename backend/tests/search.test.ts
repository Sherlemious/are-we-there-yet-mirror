import request from 'supertest';
import app from '../src/app';
import { ResponseStatusCodes } from '../src/types/ResponseStatusCodes.types';

describe('Search Endpoint Tests', () => {
  describe('GET /api/search', () => {
    it('should respond with bad request (400) for missing query parameters', async () => {
      const response = await request(app).get('/api/search');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe('Type and attribute (name, value) are required');
    });

    it('should respond with bad request (400) for invalid search type', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'invalidType', attributeName: 'name', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe('Invalid search type');
    });

    it('should respond with bad request (400) for invalid search attribute', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'product', attributeName: 'invalidAttribute', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe('Invalid search attribute');
    });

    it('should respond with ok (200) for successful product search', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'product', attributeName: 'name', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.message).toBe('search is successful');
      expect(response.body.data).toHaveProperty('products');
    });

    it('should respond with ok (200) for successful historicalPlace search', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'historicalPlace', attributeName: 'name', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.message).toBe('search is successful');
      expect(response.body.data).toHaveProperty('historicalPlaces');
    });

    it('should respond with ok (200) for successful activity search', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'activity', attributeName: 'name', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.message).toBe('search is successful');
      expect(response.body.data).toHaveProperty('activities');
    });

    it('should respond with ok (200) for successful itinerary search', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ type: 'itinerary', attributeName: 'name', attributeValue: 'test' });
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.message).toBe('search is successful');
      expect(response.body.data).toHaveProperty('itineraries');
    });
  });
});
