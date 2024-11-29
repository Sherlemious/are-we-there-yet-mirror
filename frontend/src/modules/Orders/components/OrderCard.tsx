import { Package, Calendar, ShoppingCart, Clock } from "lucide-react";
import { Order, OrderStatus, Product } from "../utils/types";
import { ProductModal } from "./ProductModal";
import { useState } from "react";

const OrderCard = ({ order }: { order: Order }) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    quantity: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      cancelled: "bg-red-400",
      delivered: "bg-green-400",
    };
    return colors[status] || colors.pending;
  };

  // Get badge color based on order status
  const getBadgeColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-100",
      cancelled: "bg-red-100 text-red-800 border-red-100",
      delivered: "bg-green-100 text-green-800 border-green-100",
    };
    return colors[status] || colors.pending;
  };

  const handleProductClick = (product: Product, quantity: number) => {
    setSelectedProduct({ product, quantity });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        {/* Top status bar */}
        <div
          className={`absolute left-0 right-0 top-0 h-1 ${getStatusColor(order.status)}`}
        />

        <div className="p-6">
          {/* Order header with ID and price */}
          <div className="relative mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-accent-dark-blue" />
                <span className="text-xl font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-accent-dark-blue">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Order metadata */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatDate(order.updatedAt)}</span>
            </div>
          </div>

          {/* Products list */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Order Items</h3>
            <div className="divide-y divide-gray-100">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center gap-3 py-3 transition-colors hover:bg-gray-50"
                  onClick={() =>
                    handleProductClick(item.product, item.quantity)
                  }
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-50">
                    <Package className="h-5 w-5 text-accent-dark-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-8">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </p>
                        <p className="truncate text-wrap text-sm text-gray-500">
                          {item.product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.product.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer with status */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${getBadgeColor(order.status)}`}
            >
              {formatStatus(order.status)}
            </span>
            <span className="text-sm text-gray-500">
              {order.products.reduce((total, item) => total + item.quantity, 0)}{" "}
              items
            </span>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct?.product}
        quantity={selectedProduct?.quantity}
      />
    </>
  );
};

export default OrderCard;
