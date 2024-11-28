export type Order = {
  _id: string;
  created_by: string;
  products: { product: string; quantity: number }[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = "pending" | "completed" | "cancelled" | "delivered";

// to filter passed orders/ current orders -> send as query string in url ?"passed" or "current"
