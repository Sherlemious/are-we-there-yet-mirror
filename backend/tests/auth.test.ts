import request from 'supertest';
import app from '../src/app';
import { ResponseStatusCodes } from '../src/types/ResponseStatusCodes.types';

let newUser = {
  account_type: 'Tourist',
  email: 'yousef@gmail.com',
  username: 'yousef',
  password: 'password123',
};

describe('Authentication Tests', () => {
  describe('POST /api/auth/register', () => {
    it('should respond with bad request (400) for registering with missing data', async () => {
      const response = await request(app).post('/api/auth/register').send({});
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Password must be at least 8 characters long');
    });

    it('should respond with bad request (400) for registering with invalid password', async () => {
      newUser.password = 'password';
      const response = await request(app).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe('Password must contain at least one number');
      newUser.password = 'password123';
    });

    it('should respond with bad request (400) for registering with existing email', async () => {
      await request(app).post('/api/auth/register').send(newUser);
      const response = await request(app).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(ResponseStatusCodes.BAD_REQUEST);
      expect(response.body.message).toContain('duplicate key error collection');
    });

    it('should respond with ok (200) for registering successfully', async () => {
      newUser.email += Math.random();
      newUser.username += Math.random();
      const response = await request(app).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(ResponseStatusCodes.OK);
      expect(response.body.data).toMatchObject({
        jwt: expect.any(String),
      });
    });
  });
});
