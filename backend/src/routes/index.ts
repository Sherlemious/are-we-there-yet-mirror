import { Router } from 'express';
import itineraryRouter from './itinerary.route';
import authRouter from './auth.route';
import museumRouter from './museum.route';
import tagRouter from './tag.route';
import userRouter from './user.route';
import activityRouter from './activity.route';
import productRouter from './product.route';
import searchRouter from './search.route';
import attachmentRouter from './attachment.route';
import categoryRouter from './category.route';
import { authenticateToken } from '../middlewares/auth.middleware';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/attachments', authenticateToken, attachmentRouter);
routes.use('/itineraries', authenticateToken, itineraryRouter);
routes.use('/museums', authenticateToken, museumRouter);
routes.use('/tags', authenticateToken, tagRouter);
routes.use('/users', authenticateToken, userRouter);
routes.use('/activities', authenticateToken, activityRouter);
routes.use('/products', authenticateToken, productRouter);
routes.use('/search', authenticateToken, searchRouter);
routes.use('/categories', authenticateToken, categoryRouter);

export { routes };
