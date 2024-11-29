import { useLoaderData } from "react-router";
import OrderCard from "../components/OrderCard";
import { Order } from "../utils/types";
import axiosInstance from "@/modules/shared/services/axiosInstance";

export default function Orders() {
  const orders = useLoaderData() as Order[];
  console.log(orders);
  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 overflow-x-auto overflow-y-auto p-28">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

export async function loader() {
  console.log("Current Orders loader");
  const res = await axiosInstance.get("/orders");

  return res.data.data.orders;
}
