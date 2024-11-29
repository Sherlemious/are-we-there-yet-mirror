import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

export const ProductModal = ({
  isOpen,
  onClose,
  product,
  quantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  quantity?: number;
}) => {
  const [productImg, setProductImg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImgURL() {
      setIsLoading(true);
      if (product) {
        try {
          const res = await axiosInstance.get(
            `attachments/${product?.attachments[0]}`,
          );
          if (res) setProductImg(res.data.url);
        } catch (error) {
          console.error("Error loading image:", error);
        }
        setIsLoading(false);
      }
    }
    fetchImgURL();
  }, [product]);

  if (!product || !quantity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="product-modal"
        className="overflow-hidden p-0 sm:max-w-2xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative h-64 w-full bg-gray-50 md:h-auto md:w-1/2">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent-dark-blue" />
              </div>
            ) : (
              <img
                src={productImg}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="w-full p-6 md:w-1/2">
            <AlertDialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                {product.name}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-500">
                {product.description}
              </DialogDescription>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"></DialogClose>
            </AlertDialogHeader>

            <div className="space-y-6">
              {/* Price and Quantity Info */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Unit Price
                  </p>
                  <p className="text-2xl font-bold text-accent-dark-blue">
                    ${product.price}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="text-2xl font-bold text-gray-900">{quantity}</p>
                </div>
              </div>

              {/* Total Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-accent-dark-blue">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
