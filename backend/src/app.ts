import 'dotenv/config';
import express from 'express';
import { routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server] Server is Successfully Running, and App is listening on port ${port}`);
});
