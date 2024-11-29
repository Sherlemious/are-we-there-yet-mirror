import mongoose from 'mongoose';
import request from 'supertest';
import app from './src/app';

beforeAll(async () => {
  const mongoConnectionString = process.env.MONGO_URI || '';
  const random = Math.floor(Math.random() * 1000);

  await mongoose.connect(mongoConnectionString);

  const registerResponse = await request(app)
    .post('/api/auth/register')
    .send({
      email: `testEmail${random}@gmail.com`,
      username: `testUsername${random}`,
      password: `testPassword${random}`,
      account_type: 'Admin',
    });

  global.jwtToken = registerResponse.body.data.jwt;
});

afterAll(async () => {
  await mongoose.connection.close();
});
