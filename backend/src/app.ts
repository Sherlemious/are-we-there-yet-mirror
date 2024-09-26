import 'dotenv/config';
import express from 'express';
import { routes } from './routes/routes';
import { logger } from './middlewares/logger';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.MONGO_URI || '';

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  logger.log('info', `Server is Successfully Running, and App is listening on port ${port}`);
});

mongoose
  .connect(mongoConnectionString)
  .then(() => {
    logger.log('info', 'Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB ${error}`);
  });
