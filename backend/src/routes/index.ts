import { Router } from 'express';
import itineraryRouter from './itinerary.route';
import authRouter from './auth.route';

const routes = Router();

routes.use('/itineraries', itineraryRouter);
routes.use('/auth', authRouter);

export { routes };
