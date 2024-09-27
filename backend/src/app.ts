import 'dotenv/config';
import express from 'express';
import { routes } from './routes/routes';
import { logger, logHttpRequests } from './middlewares/logger';
import mongoose from 'mongoose';

const app = express();
const mongoConnectionString = process.env.MONGO_URI || '';

// Middleware
app.use(express.json());
app.use(logHttpRequests);
app.use('/api', routes);

// MongoDB connection
mongoose
  .connect(mongoConnectionString)
  .then(() => {
    logger.log('info', 'Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB ${error}`);
  });

export default app;
