import { UserType } from '../../types/User.types';
import { User } from '../models/user.model';
import { ObjectId } from 'mongodb';

class CartRepo {
  async getUserCart(id: string) {
    return await User.findById(id).populate('cart.product');
  }

  async addProductToCart(userId: string, productId: string, quantity: number) {
    const cartItem = {
      product: new ObjectId(productId),
      quantity: quantity,
    };

    return await User.findByIdAndUpdate(userId, { $push: { cart: cartItem } }, { new: true });
  }

  async updateProductQuantity(userId: string, productId: string, quantity: number) {
    return await User.findOneAndUpdate(
      { _id: userId, 'cart.product': productId },
      { $set: { 'cart.$.quantity': quantity } },
      { new: true }
    );
  }

  async removeProductFromCart(userId: string, productId: string) {
    return await User.findByIdAndUpdate(userId, { $pull: { cart: { product: productId } } }, { new: true });
  }

  async clearCart(userId: string) {
    return await User.findByIdAndUpdate(userId, { cart: [] }, { new: true });
  }
}

export default new CartRepo();
