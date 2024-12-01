import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import orderRepo from '../database/repositories/order.repo';
import cartRepo from '../database/repositories/cart.repo';
import { ProductType } from '../types/Product.types';
import productRepo from '../database/repositories/product.repo';
import userRepo from '../database/repositories/user.repo';
import emailService from '../services/email/email.service';

class OrderController {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderRepo.getOrders(req.query.past as string, req.user.userId);
      res.status(ResponseStatusCodes.OK).json({ message: 'Orders fetched successfully', data: { orders: orders } });
    } catch (error: any) {
      logger.error(`Error fetching orders: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  }

  async checkoutOrder(req: Request, res: Response) {
    const user = await cartRepo.getUserCart(req.user.userId);
    const email = user?.email;
    try {
      const cart = user?.cart || [];

      if (cart.length === 0) {
        throw new Error('Cart is empty');
      }

      let totalOrderPrice = 0;
      cart.forEach(async (cartItem) => {
        const product = cartItem.product as unknown as ProductType;

        totalOrderPrice += product.price * cartItem.quantity;
        await productRepo.buyProduct(product._id, cartItem.quantity);
      });

      const order = await orderRepo.checkoutOrder(req.user.userId, totalOrderPrice, cart);
      if (email) {
        await emailService.sendReceiptEmail(email, order);
      }

      res
        .status(ResponseStatusCodes.CREATED)
        .json({ message: 'Order checked out successfully', data: { order: order } });
    } catch (error: any) {
      logger.error(`Error checking out order: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const order = await orderRepo.cancelOrder(req.params.orderId, req.user.userId);

      order.products.forEach(async (product) => {
        const productId = product.product._id;
        const productDetails = await productRepo.getProductById(productId.toString());
        if (!productDetails) {
          res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Product not found', data: [] });
          return;
        }
        const total = productDetails.price * product.quantity;
        await productRepo.cancelProduct(productId.toString(), product.quantity);
        await userRepo.productReturnWallet(req.user.userId, productId.toString(), total);
      });

      res.status(ResponseStatusCodes.OK).json({ message: 'Order cancelled successfully', data: { order: order } });
    } catch (error: any) {
      logger.error(`Error cancelling order: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  }
}

export default new OrderController();
