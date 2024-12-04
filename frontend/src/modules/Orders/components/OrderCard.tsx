import { Package, Calendar, ShoppingCart, Clock, Loader2 } from "lucide-react";
import { Order, OrderStatus } from "../utils/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import toast from "react-hot-toast";

const OrderCard = ({
  order,
  setOrders,
}: {
  order: Order;
  setOrders?: React.Dispatch<React.SetStateAction<Order[]>>;
}) => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null,
  );
  const [productImages, setProductImages] = useState<Record<string, string>>(
    {},
  );
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {},
  );
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    async function fetchProductImages() {
      for (const item of order.products) {
        const productId = item.product._id;
        setLoadingImages((prev) => ({ ...prev, [productId]: true }));

        try {
          const res = await axiosInstance.get(
            `attachments/${item.product.attachments[0]}`,
          );
          if (res) {
            setProductImages((prev) => ({
              ...prev,
              [productId]: res.data.url,
            }));
          }
        } catch (error) {
          console.error("Error loading image:", error);
        }
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
      }
    }
    fetchProductImages();
  }, [order.products]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-400",
      cancelled: "bg-red-400",
      delivered: "bg-green-400",
    };
    return colors[status] || colors.pending;
  };

  const getBadgeColor = (status: OrderStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-100",
      cancelled: "bg-red-100 text-red-800 border-red-100",
      delivered: "bg-green-100 text-green-800 border-green-100",
    };
    return colors[status] || colors.pending;
  };

  const handleCancelOrder = async () => {
    try {
      const resPromise = axiosInstance.delete(`/orders/cancel/${order._id}`);

      toast.promise(resPromise, {
        loading: "Cancelling order...",
        success: "Order cancelled successfully",
        error: "Error cancelling order",
      });
      const res = await resPromise;

      if (res.status === 200) {
        setOrders?.((prevOrders) =>
          prevOrders.filter((o) => o._id !== order._id),
        );
        setShowCancelDialog(false);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div
          className={`absolute left-0 right-0 top-0 h-1 ${getStatusColor(order.status)}`}
        />

        <div className="p-6">
          <div className="relative mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-accent-dark-blue" />
                <span className="text-xl font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </span>
              </div>
              <span className="text-xl font-bold text-accent-dark-blue">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

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

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Order Items</h3>
            <div className="divide-y divide-gray-100">
              {order.products.map((item) => {
                const isExpanded = expandedProductId === item.product._id;
                return (
                  <div key={item.product._id} className="py-4">
                    <div
                      className="flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-50"
                      onClick={() =>
                        setExpandedProductId(
                          isExpanded ? null : item.product._id,
                        )
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

                    {isExpanded && (
                      <div className="mt-4 rounded-lg bg-gray-50 p-4">
                        <div className="flex flex-col md:flex-row md:gap-6">
                          <div className="relative h-64 w-full md:h-48 md:w-1/2">
                            {loadingImages[item.product._id] ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-accent-dark-blue" />
                              </div>
                            ) : (
                              <img
                                src={productImages[item.product._id]}
                                alt={item.product.name}
                                className="h-full w-full rounded-lg object-cover"
                              />
                            )}
                          </div>
                          <div className="mt-4 w-full md:mt-0 md:w-1/2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {item.product.name}
                            </h4>
                            <p className="mt-2 text-sm text-gray-600">
                              {item.product.description}
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Unit Price
                                </p>
                                <p className="text-xl font-bold text-accent-dark-blue">
                                  ${item.product.price}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Quantity
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 border-t pt-4">
                              <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-gray-500">
                                  Total Amount
                                </p>
                                <p className="text-xl font-bold text-accent-dark-blue">
                                  $
                                  {(item.product.price * item.quantity).toFixed(
                                    2,
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-start justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-sm font-medium ${getBadgeColor(order.status)}`}
              >
                {formatStatus(order.status)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-5">
              <span className="text-sm text-gray-500">
                {order.products.reduce(
                  (total, item) => total + item.quantity,
                  0,
                )}{" "}
                items
              </span>
              {order.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCancelDialog(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, cancel order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderCard;
