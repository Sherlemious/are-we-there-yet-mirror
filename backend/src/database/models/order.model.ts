import { model, Schema } from 'mongoose';
import { OrderStatusType, PaymentMethodType } from '../../types/Order.types';
import { cartItemSchema } from './cart.model';

const orderSchema = new Schema(
  {
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatusType),
      default: 'paid',
    },
    delivery_address: {
      type: Schema.Types.ObjectId,
      ref: 'address',
      required: true,
    },
    payment_method: {
      type: String,
      enum: Object.values(PaymentMethodType),
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

export { Order };
