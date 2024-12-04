import { Tag } from "@/modules/Tags/types/Tag";

export type Order = {
  createdAt: Date;
  created_by: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  status: OrderStatus;
  totalPrice: number;
  _id: string;
  updatedAt: Date;
};

export type OrderStatus = "pending" | "cancelled" | "delivered";

export type Product = {
  archive: boolean;
  attachments: string[];
  available_quantity: number;
  average_rating: number;
  createdAt: Date;
  created_by: string;
  description: string;
  name: string;
  price: number;
  reviews: Review[];
  sales: number;
  seller: string;
  tags: Tag[];
  updatedAt: Date;
  _id: string;
};

export type Review = {
  comment: string;
  createdAt: Date;
  rating: number;
  updatedAt: Date;
  user: string;
  _id: string;
};

// to filter passed orders/ current orders -> send as query string in url ?"passed" or "current"
