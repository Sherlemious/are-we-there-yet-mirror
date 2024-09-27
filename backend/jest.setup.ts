import mongoose from 'mongoose';

beforeAll(async () => {
  const mongoConnectionString = process.env.MONGO_URI || '';
  await mongoose.connect(mongoConnectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
});
