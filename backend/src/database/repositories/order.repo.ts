import { OrderItemType, OrderStatusType } from '../../types/Order.types';
import { Order } from '../models/order.model';

class OrderRepo {
  async getOrders(past: string, userId: string) {
    let query = {
      status: { $in: [OrderStatusType.PENDING] },
      created_by: userId,
    };

    if (past === 'true') {
      query = {
        status: { $in: [OrderStatusType.DELIVERED, OrderStatusType.CANCELLED] },
        created_by: userId,
      };
    }

    return await Order.find(query).populate('products.product');
  }

  async checkoutOrder(userId: string, totalPrice: Number, cart?: OrderItemType[]) {
    return await Order.create({ products: cart, totalPrice, created_by: userId });
  }

  async cancelOrder(orderId: string, userId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.created_by.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    if (order.status !== OrderStatusType.PENDING) {
      throw new Error('Order cannot be cancelled');
    }

    order.status = OrderStatusType.CANCELLED;
    await order.save();
    return order;
  }
}
export default new OrderRepo();
