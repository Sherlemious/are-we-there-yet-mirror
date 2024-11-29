import { Order } from '../models/order.model';

class OrderRepo {
  async getOrders() {
    return await Order.find();
  }
}
export default new OrderRepo();
