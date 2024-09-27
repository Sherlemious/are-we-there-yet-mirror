import request from 'supertest';
import app from '../src/app';
import { ResponseStatusCodes } from '../src/types/ResponseStatusCodes.types';

let itineraryId = '';

describe('Itinerary tests', () => {
  describe('GET /api/itineraries', () => {
    it('should respond with bad request (400) for fetching itinerary with invalid id', async () => {
      const response = await request(app).get('/api/itineraries/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for fetching itinerary successfully', async () => {
      const response = await request(app).get('/api/itineraries/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('itinerary');
    });
  });

  describe('POST /api/itineraries', () => {
    it('should respond with bad request (400) for creating itinerary with invalid data', async () => {
      const response = await request(app).post('/api/itineraries');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('itinerary validation failed');
    });

    it('should respond with created (201) for creating an itinerary successfully', async () => {
      const newItinerary = {
        name: 'Test Itinerary',
        category: 'Test Category',
        tags: ['Test Tag'],
      };

      const response = await request(app).post('/api/itineraries').send(newItinerary);
      itineraryId = response.body.data.itineraryId;

      expect(response.status).toBe(ResponseStatusCodes.CREATED);
      expect(response.body.data).toHaveProperty('itineraryId');
    });
  });

  describe('PUT /api/itineraries/:id', () => {
    it('should respond with bad request (400) for updating itinerary with invalid id', async () => {
      const response = await request(app).put('/api/itineraries/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for updating itinerary successfully', async () => {
      const response = await request(app).put('/api/itineraries/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.length).toBe(1);
    });
  });

  describe('DELETE /api/itineraries/:id', () => {
    it('should respond with bad request (400) for deleting itinerary with invalid id', async () => {
      const response = await request(app).delete('/api/itineraries/1');
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for deleting itinerary successfully', async () => {
      const response = await request(app).delete(`/api/itineraries/${itineraryId}`);
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.deletedCount).toBe(1);
    });
  });
});
