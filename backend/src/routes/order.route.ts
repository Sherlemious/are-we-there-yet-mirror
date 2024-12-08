import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', OrderController.getAllOrders);
orderRouter.post('/checkout', OrderController.checkoutOrder);
orderRouter.delete('/cancel/:orderId', OrderController.cancelOrder);

orderRouter.post('/payment/card', OrderController.cardPayment);

export default orderRouter;
