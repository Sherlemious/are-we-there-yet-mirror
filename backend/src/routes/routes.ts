import { Router } from 'express';
import { itineraryController } from '../controllers/itineraryController';

const routes = Router();

routes.use('/itineraries', itineraryController);

export { routes };
