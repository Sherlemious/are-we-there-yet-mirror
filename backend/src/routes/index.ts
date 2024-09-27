import { Router } from 'express';
import itineraryRouter from './itinerary.route';

const routes = Router();

routes.use('/itineraries', itineraryRouter);

export { routes };
