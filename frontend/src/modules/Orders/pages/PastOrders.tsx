import axiosInstance from "@/modules/shared/services/axiosInstance";
import OrderCard from "../components/OrderCard";
import { useState } from "react";
import { Order } from "../utils/types";
import { useLoaderData } from "react-router";

export default function PastOrders() {
  const data = useLoaderData() as Order[];
  const [orders] = useState<Order[]>(data);

  if (orders.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-md rounded-lg bg-black bg-opacity-30 p-8 backdrop-blur-sm">
          <div className="mb-3 rounded-full bg-transparent p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-center text-2xl font-semibold text-white">
            No Orders Yet
          </h3>
          <p className="text-center text-gray-400">
            You haven't placed any orders. Start exploring activities to book
            your next adventure!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid max-h-screen gap-4 overflow-x-auto overflow-y-auto p-28">
      {orders?.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
}

export async function loader() {
  const res = await axiosInstance.get("/orders?past=true");

  return res.data.data.orders;
}
