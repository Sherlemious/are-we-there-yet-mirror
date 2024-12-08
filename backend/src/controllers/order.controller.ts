import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import orderRepo from '../database/repositories/order.repo';
import cartRepo from '../database/repositories/cart.repo';
import { ProductType } from '../types/Product.types';
import productRepo from '../database/repositories/product.repo';
import userRepo from '../database/repositories/user.repo';
import emailService from '../services/email/email.service';
import StripeService from '../services/stripe.service';
import { OrderItemType, PaymentMethodType } from '../types/Order.types';
import promoCodeRepo from '../database/repositories/promoCode.repo';

class OrderController {
  constructor() {
    this.checkoutOrder = this.checkoutOrder.bind(this);
    this.calculateTotalOrderPrice = this.calculateTotalOrderPrice.bind(this);
  }

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
      let { payment_method, address_id, session_id, promocode } = req.body;
      const user = await cartRepo.getUserCart(req.user.userId);
      const customerEmail = user?.email;
      const cart = user?.cart ?? [];
      let totalOrderPrice = await this.calculateTotalOrderPrice(cart);

      if (cart.length === 0) {
        throw new Error('Cart is empty');
      }

      if (!Object.values(PaymentMethodType).includes(payment_method)) {
        throw new Error('Invalid payment method');
      }
      const promo = await promoCodeRepo.findPromoCodeByCode(promocode);
      switch (payment_method) {
        case PaymentMethodType.CARD:
          const metadata = await StripeService.getMetadata(session_id);
          address_id = metadata?.address_id;
          break;
        case PaymentMethodType.WALLET:
          if (promo) {
            const discount = (totalOrderPrice * promo.discountPercentage) / 100;
            totalOrderPrice -= discount;
            await userRepo.updateWallet(req.user.userId, -totalOrderPrice);
            break;
          }
          await userRepo.updateWallet(req.user.userId, -totalOrderPrice);
          break;
        case PaymentMethodType.CASH:
          break;
      }

      const order = await orderRepo.checkoutOrder(req.user.userId, totalOrderPrice, address_id, payment_method, cart);
      if (promo) {
        if (payment_method !== PaymentMethodType.WALLET) {
          const discount = (totalOrderPrice * promo.discountPercentage) / 100;
          totalOrderPrice -= discount;
          order.totalPrice = totalOrderPrice;
        }
        if (customerEmail) {
          await emailService.sendReceiptEmail(customerEmail, order);
        }
        res.status(ResponseStatusCodes.OK).json({ message: 'Promo code applied successfully', data: { order:order } });
        return;
      }
      if (customerEmail) {
        await emailService.sendReceiptEmail(customerEmail, order);
      }

      await cartRepo.clearCart(req.user.userId);

      res
        .status(ResponseStatusCodes.CREATED)
        .json({ message: 'Order checked out successfully', data: { order: order } });
    } catch (error: any) {
      logger.error(`Error checking out order: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  }

  private async calculateTotalOrderPrice(cart: OrderItemType[]): Promise<number> {
    let totalOrderPrice = 0;

    for (const cartItem of cart) {
      const product = cartItem.product as ProductType;

      if (product.available_quantity < cartItem.quantity) {
        throw new Error(`Product ${product.name} is out of stock`);
      }

      totalOrderPrice += product.price * cartItem.quantity;
      await productRepo.buyProduct(product._id, cartItem.quantity);

      if (product.available_quantity === cartItem.quantity) {
        await userRepo.outOfStockNotification(product.seller);
        const tempUser = await userRepo.findUserById(product.seller);

        if (tempUser?.email) {
          await emailService.outOfStockEmail(tempUser.email);
        }
      }
    }

    return totalOrderPrice;
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
      const { address_id, itinerary_id, activity_id, success_url, cancel_url } = req.body;
      const currency = req.currency.currency;
      let session;

      if (address_id) {
        const user = await cartRepo.getUserCart(req.user.userId);
        const products = user?.cart;

        session = await StripeService.createCheckoutSession(currency, address_id, products, success_url, cancel_url);
      } else if (itinerary_id) {
        session = await StripeService.createBookingSession(currency, true, itinerary_id, success_url, cancel_url);
      } else {
        session = await StripeService.createBookingSession(currency, false, activity_id, success_url, cancel_url);
      }

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
