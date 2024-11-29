import { Router } from 'express';
import { getAllOrders } from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);

export default orderRouter;
