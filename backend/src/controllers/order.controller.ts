import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import orderRepo from '../database/repositories/order.repo';
import cartRepo from '../database/repositories/cart.repo';
import { ProductType } from '../types/Product.types';
import productRepo from '../database/repositories/product.repo';
import userRepo from '../database/repositories/user.repo';
import emailService from '../services/email/email.service';
import { accountType } from '../types/User.types';
import StripeService from '../services/stripe.service';

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
    try {
      let { payment_method, address_id, session_id } = req.body;
      const user = await cartRepo.getUserCart(req.user.userId);
      const email = user?.email;
      const cart = user?.cart || [];

      if (cart.length === 0) {
        throw new Error('Cart is empty');
      }

      if (payment_method === 'card') {
        const metadata = await StripeService.getMetadata(session_id);
        address_id = metadata?.address_id;
      }

      let totalOrderPrice = 0;
      cart.forEach(async (cartItem) => {
        const product = cartItem.product as unknown as ProductType;

        totalOrderPrice += product.price * cartItem.quantity;
        await productRepo.buyProduct(product._id, cartItem.quantity);
        if (product.available_quantity !== undefined && product.available_quantity - cartItem.quantity === 0) {
          if (product.seller) {
            await userRepo.outOfStockNotification(product.seller);
            const tempUser = await userRepo.findUserById(product.seller);
            if (tempUser?.email) {
              await emailService.outOfStockEmail(tempUser.email);
            }
          }
          const admins = await userRepo.getUsersByType(accountType.Admin);
          admins.forEach(async (admin) => {
            await userRepo.outOfStockNotificationAdmin(admin._id.toString());
          });
        }
      });

      const order = await orderRepo.checkoutOrder(req.user.userId, totalOrderPrice, address_id, cart);
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

  async cardPayment(req: Request, res: Response) {
    try {
      const { address_id, success_url, cancel_url } = req.body;
      const currency = req.currency.currency;

      const user = await cartRepo.getUserCart(req.user.userId);
      const products = user?.cart;

      const session = await StripeService.createCheckoutSession(
        currency,
        address_id,
        products,
        success_url,
        cancel_url
      );

      res
        .status(ResponseStatusCodes.OK)
        .json({ message: 'Stripe payment session created successfully', data: { session: session } });
    } catch (error: any) {
      logger.error(`Error processing stripe payment: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  }
}

export default new OrderController();
