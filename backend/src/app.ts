import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes/index';
import { logger, logHttpRequests } from './middlewares/logger.middleware';
import { authenticateUnlessOpen } from './middlewares/auth.middleware';
import { currencySetter } from './middlewares/currencySetter.middleware';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import StripeService from './services/stripe.service';
import BirthdayService from './services/birthday.service';

const app = express();
const mongoConnectionString = process.env.MONGO_URI || '';

StripeService.getInstance();
BirthdayService.getInstance();

app.use(cors()); // Enable CORS
app.use(fileupload({ useTempFiles: true })); // Enable file upload

// Middleware
app.use(express.json());
app.use(logHttpRequests);
app.use(authenticateUnlessOpen);
app.use(currencySetter);
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
