import { Router } from 'express';
import itineraryRouter from './itinerary.route';
import authRouter from './auth.route';
import museumRouter from './museum.route';
import tagRouter from './tag.route';
import userRouter from './user.route';
import advertiserRouter from './advertiser.route';
import sellerRouter from './seller.route';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/itineraries', itineraryRouter);
routes.use('/museums', museumRouter);
routes.use('/tags', tagRouter);
routes.use('/users', userRouter);
routes.use('/advertisers', advertiserRouter);
routes.use('/sellers', sellerRouter);

export { routes };
