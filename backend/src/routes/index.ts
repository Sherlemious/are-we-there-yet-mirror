import { Router } from 'express';
import itineraryRouter from './itinerary.route';
import museumRouter from './museum.route';

const routes = Router();

routes.use('/itineraries', itineraryRouter);
routes.use('/museums', museumRouter);

export { routes };
