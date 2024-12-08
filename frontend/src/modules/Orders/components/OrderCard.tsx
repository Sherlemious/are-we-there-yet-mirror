import {
  Calendar,
  ShoppingCart,
  Loader2,
  Package,
  Clock,
  ChevronDown,
} from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

const OrderCard = ({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (cancelledOrder: Order) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    if (isExpanded) {
      fetchProductImages();
    }
  }, [isExpanded, order.products]);

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
      paid: "bg-yellow-400",
      cancelled: "bg-red-400",
      delivered: "bg-green-400",
    };
    return colors[status] || colors.paid;
  };

  const getBadgeColor = (status: OrderStatus) => {
    const colors = {
      paid: "bg-yellow-100 text-yellow-800 border-yellow-100",
      cancelled: "bg-red-100 text-red-800 border-red-100",
      delivered: "bg-green-100 text-green-800 border-green-100",
    };
    return colors[status] || colors.paid;
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
        const cancelledOrder = res.data.data.order;

        onCancel(cancelledOrder);

        setShowCancelDialog(false);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md"
        >
          {/* Status bar with gradient */}
          <div
            className={`absolute left-0 right-0 top-0 h-1.5 ${getStatusColor(order.status)} opacity-80`}
          />

          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            {/* Left section with enhanced order info */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-gray-50 p-2 text-accent-dark-blue">
                <ShoppingCart className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-semibold text-gray-900">
                    Order #{order._id.slice(-6)}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-17 h-7 text-gray-400" />
                  </motion.div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {formatDate(order.updatedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-lg font-medium ${getBadgeColor(order.status)}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${getStatusColor(order.status)}`}
                    />
                    {formatStatus(order.status)}
                  </span>
                  <span className="flex items-center gap-1.5 text-lg text-gray-500">
                    <Package className="h-4 w-4" />
                    {order.products.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}{" "}
                    items
                  </span>
                </div>
              </div>
            </div>

            {/* Right section with enhanced price display */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-medium text-gray-500">
                  Total Amount
                </p>
                <span className="text-3xl font-bold text-accent-dark-blue">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
              {order.status === "paid" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCancelDialog(true);
                  }}
                  className="border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-lg border border-gray-100 bg-white p-6">
                <h3 className="mb-6 text-2xl font-medium text-gray-900">
                  Order Details
                </h3>
                <div className="divide-y divide-gray-100">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="py-6 first:pt-0 last:pb-0"
                    >
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="relative w-full">
                          {loadingImages[item.product._id] ? (
                            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                              <Loader2 className="h-8 w-8 animate-spin text-accent-dark-blue" />
                            </div>
                          ) : (
                            <div className="group relative w-full overflow-hidden rounded-lg bg-gray-50">
                              <img
                                src={productImages[item.product._id]}
                                alt={item.product.name}
                                className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <h4 className="text-2xl font-semibold text-gray-900">
                              {item.product.name}
                            </h4>
                            <p className="mt-2 text-lg leading-relaxed text-gray-600">
                              {item.product.description}
                            </p>
                          </div>
                          <div className="mt-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-lg font-medium text-gray-500">
                                  Unit Price
                                </p>
                                <p className="mt-1 text-2xl font-bold text-accent-dark-blue">
                                  ${item.product.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-lg font-medium text-gray-500">
                                  Quantity
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                              <p className="text-xl font-medium text-gray-500">
                                Total Amount
                              </p>
                              <p className="text-2xl font-bold text-accent-dark-blue">
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
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="w-fit">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl">
              Cancel Order
            </AlertDialogTitle>
            <AlertDialogDescription className="text-2xl">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-lg">
              No, keep order
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              className="bg-red-600 text-lg hover:bg-red-700"
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
