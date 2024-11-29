import OrderCard from "../components/OrderCard";
import { Order } from "../utils/types";

const exampleOrder: Order = {
  _id: "60d21b4e67d0d8992e610c88", // Example ObjectId for an order
  created_by: "60d21b4667d0d8992e610c85", // Example ObjectId for a user
  products: [
    {
      product: "60d21b4967d0d8992e610c86", // Example ObjectId for a product
      quantity: 2,
    },
    {
      product: "60d21b4b67d0d8992e610c87", // Example ObjectId for another product
      quantity: 1,
    },
  ],
  totalPrice: 150.0,
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const exampleOrder2: Order = {
  _id: "60d21b4e67d0d8992e610c88", // Example ObjectId for an order
  created_by: "60d21b4667d0d8992e610c85", // Example ObjectId for a user
  products: [
    {
      product: "60d21b4967d0d8992e610c86", // Example ObjectId for a product
      quantity: 2,
    },
    {
      product: "60d21b4b67d0d8992e610c87", // Example ObjectId for another product
      quantity: 1,
    },
  ],
  totalPrice: 150.0,
  status: "completed",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function PastOrders() {
  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 overflow-x-auto overflow-y-auto p-28">
      <OrderCard order={exampleOrder} />
      <OrderCard order={exampleOrder} />
      <OrderCard order={exampleOrder2} />
      <OrderCard order={exampleOrder2} />
    </div>
  );
}

export async function loader() {
  console.log("Past Orders loader");
  return null;
}
