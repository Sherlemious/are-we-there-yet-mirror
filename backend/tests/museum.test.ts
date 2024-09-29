import request from 'supertest';
import app from '../src/app';
import { ResponseStatusCodes } from '../src/types/ResponseStatusCodes.types';

let museumId = '';
let newMuseum = {
    name: 'Test Museum',
    tags: ['Test Tag'],
    description: 'Test Description',
    pictures: ['Test Picture'],
    location: {
        name: 'Test Location',  
        latitude: 1.0,          
        longitude: 1.0,   
    },
    opening_hours: 'Test Hours',
    ticket_prices: {
        foreigner: 10,
        native: 5,
        student: 2,
    },
};
describe('MuseumTests', () => {
    describe('GET /api/museums', () => {
        it('should respond with bad request (400) for fetching museum with invalid id', async () => {
            const response = await request(app).get('/api/museums/1');
            expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('Invalid itinerary ID'); // Update message if needed
        });

        it('should respond with ok (200) for fetching museum successfully', async () => {
            const response = await request(app).get('/api/museums/66f5a6a0132cee692ce6c010');
            expect(response.status).toBe(ResponseStatusCodes.OK);
            expect(response.body.data).toHaveProperty('museum');
        });
    });

    describe('POST /api/museums', () => {
        it('should respond with bad request (400) for creating museum with invalid data', async () => {
            const response = await request(app).post('/api/museums');
            expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
            expect(response.body.message).toContain('museum validation failed');
        });

        it('should respond with created (201) for creating a museum successfully', async () => {
            const response = await request(app).post('/api/museums').send(newMuseum);
            museumId = response.body.data.museumId;
            expect(response.status).toBe(ResponseStatusCodes.CREATED); // Ensure API returns 201
            expect(response.body.data).toHaveProperty('museumId');
        });
    });

    describe('PUT /api/museums/:id', () => {
        it('should respond with bad request (400) for updating museum with invalid id', async () => {
            const response = await request(app).put('/api/museums/1');
            expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('Invalid itinerary ID'); // Update message if needed
        });

        it('should respond with ok (200) for updating museum successfully', async () => {
            const response = await request(app).put(`/api/museums/${museumId}`).send(newMuseum);
            expect(response.status).toBe(ResponseStatusCodes.OK);
            expect(response.body.data).toHaveProperty('museum');
        });
    });

    describe('DELETE /api/museums/:id', () => {
        it('should respond with bad request (400) for deleting museum with invalid id', async () => {
            const response = await request(app).delete('/api/museums/1');
            expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
            expect(response.body.message).toBe('Invalid itinerary ID'); // Update message if needed
        });

        it('should respond with ok (200) for deleting museum successfully', async () => {
            const response = await request(app).delete(`/api/museums/${museumId}`);
            expect(response.status).toBe(ResponseStatusCodes.OK);
            expect(response.body.data).toHaveProperty('museum');
            expect(response.body.data.museum.deletedCount).toBe(1);
        });
    });
});
