import { ProductType } from './Product.types';
import { UserType } from './User.types';

export interface OrderType {
  products: [OrderItemType];
  totalPrice: number;
  status: OrderStatusType;
  created_by: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemType {
  product: ProductType;
  quantity: number;
}

export enum OrderStatusType {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
