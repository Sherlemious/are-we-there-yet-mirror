import app from './app';
import { logger } from './middlewares/logger.middleware';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.log('info', `Server is Successfully Running, and App is listening on port ${port}`);
});
