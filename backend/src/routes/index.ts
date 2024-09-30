import { Router } from 'express';
import itineraryRouter from './itinerary.route';
import authRouter from './auth.route';
import museumRouter from './museum.route';
import tagRouter from './tag.route';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/itineraries', itineraryRouter);
routes.use('/museums', museumRouter);
routes.use('/tags', tagRouter);

export { routes };
