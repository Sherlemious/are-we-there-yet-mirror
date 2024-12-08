import ProductList from "../components/ProductList";
import { getWishList } from "../Api/ProductService";
import { Product } from "../types/product";
import { useState, useEffect } from "react";
import defaultPhoto from "../assets/defaultPhoto.png";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import GenericCard from "@/modules/shared/GenericCard/GenericCard";
import toast from "react-hot-toast";
import { DollarSign, Package, Plus, ShoppingCart } from "lucide-react";
const defaultImage = defaultPhoto;

const WishList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string[] }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store the clicked product
  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = products.map(async (product) => {
        const urls = await Promise.all(
          product.attachments.map(async (attachmentId) => {
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
        return { [product._id]: urls };
      });

      const results = await Promise.all(imagePromises);
      const imagesMap = results.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {},
      );
      setImageUrls(imagesMap);
    };

    fetchImages();
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getWishList();
        console.log(response);
        const products = response?.wishlist?.map((item) => item.product) || [];
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchProducts();
  }, []);
  
  const handleRemoveWishlist = async (selectedProduct: Product) => {
    if (selectedProduct) {
      try {
        const bookmarks = (await getWishList()).wishlist;
        const bookmark = bookmarks.find(
          (bookmark: any) => bookmark.product._id === selectedProduct._id,
        );
        const bookmarkId = bookmark?._id;
        console.log(bookmarkId);
        await axiosInstance.delete(`/users/bookmarks/${bookmarkId}`);
        setProducts(products.filter((product) => product._id !== selectedProduct._id));
        toast.success("Product removed from wishlist");
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        toast.error(
          (error as any).response?.data?.message ||
            "Failed to remove product from wishlist",
        );
      }
    } else {
      toast.error("No product selected to remove from wishlist");
    }
  };
  const handleRedirect = () => {
    const baseLink = window.location.origin;
    // format the actual link
    const link: string = `${baseLink}/home/all-products/`;
    // redirect to the link
    window.location.href = link;
  };
  const handleAddCart = async (selectedProduct: Product) => {
    const loadingToastId = toast.loading("Processing");
    if (selectedProduct) {
      try {
        console.log(selectedProduct.available_quantity);
        if(selectedProduct.available_quantity<1){
          toast.error("Product out of stock", {id: loadingToastId});
          return;
        }
        await axiosInstance.post(`/users/cart`, {
          productId: selectedProduct._id,
          quantity: 1,
        });
        toast.success("Product added to cart", {id: loadingToastId});
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error(
          `Failed to add product to cart ${(error as any).response.data.message}`, {id: loadingToastId}
        );
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-2 text-text-primary">
      </div>
      <div className= "col-span-2 flex justify-end mr-10 mt-10">
      <div className={customStyles.container}>
          <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {products.length === 0 && (
              <div className="text-center text-xl font-bold text-accent-dark-blue">
                No products found
              </div>
            )}
            {products.map((product, index) => (
              <div key={index} /*className={customStyles.slide}}*/>
                <GenericCard
                  item={product}
                  onClick={() => {handleRedirect()}}
                  images={imageUrls[product._id] || [defaultImage]}
                  onRemove={() => {
                    handleRemoveWishlist(product);
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
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary-light_grey">
                      <div className="rounded-lg bg-secondary-light_grey">
                        <div className="flex items-center gap-2 text-accent-dark-blue">
                          <Package size={16} className="text-primary-blue" />
                          <span className="text-sm font-sub_headings">Quantity:</span>
                            </div>
                            {product.available_quantity > 0 ? (
                              <p className="mt-1 text-lg font-bold text-primary-blue">
                                {product.available_quantity}
                              </p>
                            ) : (
                              <p className="mt-1 text-lg font-bold text-primary-blue">
                                Out of stock
                             </p>
                            )}
                      </div>
                    </div>
                      </div>
                    </div>
                      <div className="mt-3 flex justify-end">
                      <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddCart(product);
                    }}         
                    className="flex items-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-bold transition-all duration-150 hover:opacity-80"
                    >
                    <ShoppingCart size={20}/>
                    Add to Cart
                  </button>
                </div>
                  </GenericCard>
                  </div>
            ))}
          </div>
        </div>
      </div>
      </div>
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
export default WishList;
