import 'dotenv/config';
import express from 'express';
import { routes } from './routes/routes';
import { logger } from './middlewares/logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  logger.log('info', `Server is Successfully Running, and App is listening on port ${port}`);
});
