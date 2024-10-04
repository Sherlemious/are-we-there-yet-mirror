export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  attachments: string[];
  reviews: string[];
  seller: string;
}
