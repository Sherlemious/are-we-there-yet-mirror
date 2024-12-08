import { ProductType } from './Product.types';
import { UserType } from './User.types';
import { ObjectId } from 'mongodb';

export interface OrderType {
  products: [OrderItemType];
  totalPrice: Number;
  status: OrderStatusType;
  delivery_address: ObjectId;
  payment_method: PaymentMethodType;
  created_by: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemType {
  product: ObjectId | ProductType;
  quantity: number;
}

export enum OrderStatusType {
  PAID = 'paid',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
}

export enum PaymentMethodType {
  WALLET = 'wallet',
  CARD = 'card',
  CASH = 'cash',
}
