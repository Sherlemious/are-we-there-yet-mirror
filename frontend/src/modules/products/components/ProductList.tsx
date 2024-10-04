import React from 'react';
import { Product } from '../types/product';
import { Minus, Plus } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  role: 'admin' | 'seller' | 'tourist'; // Define user roles
  onEdit?: (product: Product) => void; // Admin/Seller functionality
  onDelete?: (productId: string) => void; // Admin/Seller functionality
}

const ProductList: React.FC<ProductListProps> = ({ products, role, onEdit, onDelete }) => {
  return (
    <div className={customStyles.container}>
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {(role === 'admin' || role === 'seller') && (
              <div className={customStyles.slide}>
                <div className={customStyles.addSlideDiv}>
                  <Plus className={customStyles.addSlideIcon} />
                </div>
              </div>
            )}
            {products.map((product, index) => (
              <div key={index} className={customStyles.slide}>
                <div className={customStyles.slideContent}>
                  {(role === 'admin' || role === 'seller') && (
                    <button onClick={() => onDelete && onDelete(product._id)} className={customStyles.removeButton}>
                      <Minus size={16} className=" duration-150 group-hover:stroke-black" />
                    </button>
                  )}
                  <h3 className={customStyles.slideTitle}>{product.name}</h3>
                  <p className={customStyles.slideText}>{product.description}</p>
                  <p className={customStyles.slideText}>Price: {product.price}</p>
                  <p className={customStyles.slideText}>Quantity: {product.available_quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  container: 'h-auto max-h-[85vh] max-w-fit border-2 border-gray-300 pr-14 pt-10 pl-20 pb-10 mx-auto',
  title: 'mb-16 w-fit border-b-2 border-borders-bottomBorder pb-2 text-2xl',
  sliderContainer: 'relative',
  sliderContent: 'overflow-hidden',
  sliderWrapper: 'grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto', // Set a max height and make it scrollable
  slide: 'w-[22%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6',
  slideContent: 'h-[40vh] w-[35vh] overflow-auto border-2 border-gray-300 bg-white p-6 relative cursor-pointer',
  slideTitle: 'mb-2 font-bold',
  slideText: 'text-sm',
  navButton:
    'absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-black',
  removeButton:
    'absolute group top-2 right-2 z-10 rounded-full border border-gray-500 bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150',
  addSlideDiv:
    'flex items-center justify-center h-[40vh] w-[35vh] border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50',
  addSlideIcon: 'text-gray-400 w-16 h-16',
  navigationButtons: 'flex justify-between mt-4',
  endBeginButton:
    'px-4 py-2 rounded hover:opacity-70 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
};

export default ProductList;
