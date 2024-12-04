import axiosInstance from "@/modules/shared/services/axiosInstance";
import { Product } from "../types/product";
import { useState, useEffect } from "react";
import { DollarSign, Minus, Package, Plus, Star} from "lucide-react";
import GenericCard from "@/modules/shared/GenericCard/GenericCard";
import defaultPhoto from "../assets/defaultPhoto.png";
import toast from "react-hot-toast";

interface CartItem {
    product: Product; // The product object
    quantity: number; // Quantity of the product
  }
const defaultImage = defaultPhoto;

const Cart = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string[] }>({});
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store the clicked product
    const changeQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            newQuantity = 1; // Set the minimum quantity to 1
          }
        setCart((prev) =>
          prev.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: Math.max(newQuantity, 1) } // Ensure quantity is at least 1
              : item,
          ),
        );
      };
    const handleRemoveCart = async () => {
        if (selectedProduct) {
            setCart((prevCart) =>
                prevCart.filter((item) => item.product._id !== selectedProduct._id)
              );
          try {
            await axiosInstance.delete(`/users/cart/${selectedProduct._id}`)
            toast.success("Product removed from cart");
          } catch (error) {
            console.error("Error removing product from cart:", error);
            toast.error(
              `Failed to remove product from cart!`,
            );
          }
        }
    };
    useEffect(() => {
        const fetchImages = async () => {
          const imagePromises = cart.map(async (item) => {
            const urls = await Promise.all(
              item.product.attachments.map(async (attachmentId) => {
                try {
                  const response = await axiosInstance.get(
                    `/attachments/${attachmentId}`,
                  );
                  return response.data.url;
                } catch (error) {
                  console.error(`Error fetching image for ${attachmentId}:`, error);
                  return defaultPhoto; // Fallback to default photo on error
                }
              }),
            );
            return { [item.product._id]: urls };
          });
    
          const results = await Promise.all(imagePromises);
          const imagesMap = results.reduce(
            (acc, curr) => ({ ...acc, ...curr }),
            {},
          );
          setImageUrls(imagesMap);
        };
    
        fetchImages();
      }, [cart]);

    useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(
            `/users/cart`,
          ); 
        console.log(response.data.cart);
        // Map the response to cart items structure
        const products: Product[] =
          response.data.cart.map((item: CartItem) => ({
            product: item.product,
          })) || [];
        console.log(products);
        const cart: CartItem[] = response.data.cart.map((item: CartItem) => ({
            product: item.product,
            quantity: item.quantity,
        })) || [];
        console.log(cart);
        setProducts(products);
        setCart(cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-10 text-text-primary">
      </div>
      <div className={customStyles.container}>

          <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {cart.length === 0 && (
              <div className="text-center text-xl font-bold text-accent-dark-blue">
                No products found
              </div>
            )}
            {cart.map((item, index) => (
              <div key={index} /*className={customStyles.slide}}*/>
                <GenericCard
                  item={item.product}
                  images={imageUrls[item.product._id] || [defaultImage]}
                  onRemove={() => {
                    setSelectedProduct(item.product); 
                    handleRemoveCart();
                  }}                >
                  <div className="p-4">
                    {/* Price and Quantity Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-secondary-light_grey">
                        <div className="flex items-center gap-2 text-accent-dark-blue">
                          <DollarSign size={16} className="text-primary-blue" />
                          <span className="text-sm font-sub_headings">
                            Price :
                          </span>
                        </div>
                        <p className="mt-1 text-lg font-semibold text-primary-green">
                          ${item.product.price}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary-light_grey">
                        <div className="flex items-center gap-2 text-accent-dark-blue">
                          <Package size={16} className="text-primary-blue" />
                          <span className="text-sm font-sub_headings">
                            Purchased :
                          </span>
                        </div>
                        <button
                              onClick={() =>
                                changeQuantity(item.product._id, item.quantity - 1)
                              }
                              className="p-1 text-gray-400 hover:text-gray-800"
                              disabled={item.quantity <= 1} // Disable button if quantity is already 1
                            >
                              <Minus size={20}/>
                            </button>
                            <span className="px-3">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                changeQuantity(item.product._id, item.quantity + 1)
                              }
                              className="p-1 text-gray-400 hover:text-gray-800"
                            >
                              <Plus size={20} />
                            </button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="rounded-lg bg-secondary-light_grey p-3">
                      <div className="flex items-center gap-2">
                        <Star
                          size={18}
                          className="text-accent-gold"
                          fill="currentColor"
                        />
                        <span className="font-bold text-accent-dark-blue">
                          {item.product.reviews.length > 0
                            ? (
                                item.product.reviews.reduce(
                                  (sum, review) => sum + review.rating,
                                  0,
                                ) / item.product.reviews.length
                              ).toFixed(1)
                            : "0"}
                          <span className="font-normal text-gray-500">/5</span>
                        </span>

                        <span className="ml-16 text-sm text-gray-500">
                          {item.product.reviews.length} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </GenericCard>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className= "relative mt-20">
        <button className="absolute bottom-0 right-0 mt-20 gap-3 rounded-lg bg-accent-dark-blue px-8 py-4 text-lg font-bold text-white transition-all duration-150 hover:opacity-80 ">
        Checkout
        </button>
    </div>
    </div>
    <div>
    </div>
    </div>
  );
};
const customStyles = {
    container:
      "h-auto max-h-[85vh] bg-black bg-opacity-30 max-w-fit rounded-lg pr-14 pt-4 pl-20 pb-10 mx-auto",
    filterContainer: "flex items-center justify-between gap-4 mb-4",
    searchBar:
      "px-4 py-2 border border-gray-300 bg-secondary-light_grey rounded-lg w-[200px]",
    priceFilters: "flex gap-4",
    priceInput:
      "px-4 py-2 border border-gray-300 bg-secondary-light_grey rounded-lg w-[50%]",
    sortButton:
      "px-4 py-2 border border-gray-300 rounded-lg bg-accent-dark-blue text-white",
    sliderContainer: "relative",
    sliderContent: "overflow-hidden",
    sliderWrapper:
      "grid grid-cols-3 gap-10 max-h-[65vh] overflow-y-auto no-scrollbar", // Set a max height and make it scrollable
    slide: "w-[22%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6",
    slideContent: "h-[50vh] w-[35vh] overflow-auto  p-6 relative cursor-pointer",
    slideTitle: "mb-2 font-bold",
    slideText: "text-sm",
    navButton:
      "absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-black",
    removeButton:
      "absolute group top-2 right-2 z-10 rounded-full border border-gray-500 bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150",
    addSlideDiv:
      "flex items-center justify-center h-[50vh] w-[35vh] border-2 border-dashed border-gray-300 bg-transparent cursor-pointer hover:bg-gray-50 hover:opacity-50 transition-all duration-150",
    addSlideIcon: "text-gray-400 w-16 h-16",
    navigationButtons: "flex justify-between mt-4",
    endBeginButton:
      "px-4 py-2 rounded hover:opacity-70 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
    editButton: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
    editSection: "mt-4",
    productImage: "w-full h-[55%] object-cover mb-4",
  };
export default Cart;
