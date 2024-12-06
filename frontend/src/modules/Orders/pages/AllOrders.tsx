import axiosInstance from "@/modules/shared/services/axiosInstance";
import { useLoaderData } from "react-router";
import { Order } from "../utils/types";
import { useState } from "react";
import OrderCard from "../components/OrderCard";

export default function AllOrders() {
  const { currentOrders, pastOrders } = useLoaderData() as {
    currentOrders: Order[];
    pastOrders: Order[];
  };

  const [ongoingOrders, setOngoingOrders] = useState([...currentOrders]);
  const [prevOrders, setPrevOrders] = useState([...pastOrders]);

  const handleOrderCancel = (cancelledOrder: Order) => {
    // Remove from ongoing orders
    setOngoingOrders((current) =>
      current.filter((order) => order._id !== cancelledOrder._id),
    );

    // Add to previous orders with updated status
    setPrevOrders((current) => [
      {
        ...cancelledOrder,
        status: "cancelled",
      },
      ...current,
    ]);
  };

  if (ongoingOrders.length === 0 && prevOrders.length === 0) {
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
    <div className="flex max-h-screen flex-col gap-4 overflow-x-auto overflow-y-auto p-28">
      <div className="space-y-6">
        <div className="rounded-lg border-l-4 border-accent-dark-blue bg-white px-6 py-4 shadow-sm">
          <h2 className="flex items-center text-3xl font-bold tracking-tight text-gray-900">
            Ongoing Orders
            <span className="ml-3 inline-flex items-center rounded-full bg-accent-dark-blue px-3 py-1 text-sm font-medium text-white">
              {ongoingOrders.length}
            </span>
          </h2>
        </div>
        {ongoingOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onCancel={handleOrderCancel}
          />
        ))}
      </div>

      {prevOrders.length > 0 && (
        <div className="mt-12 space-y-6">
          <div className="rounded-lg border-l-4 border-gray-600 bg-white px-6 py-4 shadow-sm">
            <h2 className="flex items-center text-3xl font-bold tracking-tight text-gray-900">
              Previous Orders
              <span className="ml-3 inline-flex items-center rounded-full bg-gray-600 px-3 py-1 text-sm font-medium text-white">
                {prevOrders.length}
              </span>
            </h2>
          </div>
          {prevOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCancel={handleOrderCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export async function loader() {
  const resCurrentOrders = await axiosInstance.get("/orders");
  const resPastOrders = await axiosInstance.get("/orders?past=true");
  console.log(resCurrentOrders.data.data.orders);
  console.log(resPastOrders.data.data.orders);

  return {
    currentOrders: resCurrentOrders.data.data.orders,
    pastOrders: resPastOrders.data.data.orders,
  };
}
