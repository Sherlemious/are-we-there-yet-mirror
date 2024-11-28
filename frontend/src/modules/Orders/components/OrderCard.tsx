import { Package, Calendar, ShoppingCart } from "lucide-react";
import { Order, OrderStatus } from "../utils/types";

const OrderCard = ({ order }: { order: Order }) => {
  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Convert status to title case
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get status color based on order status
  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-400",
      completed: "bg-green-400",
      delivered: "bg-green-400",
      cancelled: "bg-red-400",
    };

    return colors[status] || colors.pending;
  };

  // Get badge color based on order status
  const getBadgeColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-100",
      completed: "bg-green-100 text-green-800 border-green-100",
      delivered: "bg-green-100 text-green-800 border-green-100",
      cancelled: "bg-red-100 text-red-800 border-red-100",
    };

    return colors[status] || colors.pending;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white">
      {/* Top status bar */}
      <div
        className={`absolute left-0 right-0 top-0 h-1 ${getStatusColor(order.status)}`}
      />

      <div className="p-4">
        {/* Order header with floating price */}
        <div className="relative mb-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-accent-dark-blue" />
            <span className="text-2xl font-semibold text-gray-900">
              #{order._id.slice(-6)}
            </span>
          </div>
          <div className="absolute right-0 top-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent-dark-blue">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Date line */}
        <div className="mt-2 flex items-center gap-1.5 text-base text-gray-500">
          <Calendar className="h-4 w-4" stroke="#1A5276" />
          <span>{formatDate(order.createdAt)}</span>
        </div>

        {/* Products summary */}
        <div className="mt-4 space-y-2">
          {order.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-md bg-gray-50 p-2 transition-colors hover:bg-secondary-light_grey"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md shadow-sm">
                <Package className="h-5 w-5 text-accent-dark-blue" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-base font-medium">
                    Product {item.product.slice(-4)}
                  </p>
                  <span className="text-base text-gray-500">
                    x{item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom status tag */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-1 text-base font-medium ${getBadgeColor(order.status)}`}
          >
            {formatStatus(order.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
