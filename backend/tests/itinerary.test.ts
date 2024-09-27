import request from 'supertest';
import app from '../src/app';

describe('Itinerary tests', () => {
  describe('GET /api/itineraries', () => {
    it('should respond with bad request (400) for fetching itinerary with invalid id', async () => {
      const response = await request(app).get('/api/itineraries/1');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for fetching itinerary successfully', async () => {
      const response = await request(app).get('/api/itineraries/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.length).toBe(1);
    });
  });

  describe('POST /api/itineraries', () => {
    it('should respond with bad request (400) for creating itinerary with invalid data', async () => {
      const response = await request(app).post('/api/itineraries');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid itinerary data');
    });

    it('should respond with created (201) for creating an itinerary successfully', async () => {
      const response = await request(app).post('/api/itineraries');
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.length).toBe(1);
    });
  });

  describe('PUT /api/itineraries/:id', () => {
    it('should respond with bad request (400) for updating itinerary with invalid id', async () => {
      const response = await request(app).get('/api/itineraries/1');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for updating itinerary successfully', async () => {
      const response = await request(app).get('/api/itineraries/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.length).toBe(1);
    });
  });

  describe('DELETE /api/itineraries/:id', () => {
    it('should respond with bad request (400) for deleting itinerary with invalid id', async () => {
      const response = await request(app).get('/api/itineraries/1');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid itinerary ID');
    });

    it('should respond with ok (200) for deleting itinerary successfully', async () => {
      const response = await request(app).get('/api/itineraries/66f5a6a0132cee692ce6c010');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('itinerary');
      expect(response.body.data.itinerary.length).toBe(1);
    });
  });
});
