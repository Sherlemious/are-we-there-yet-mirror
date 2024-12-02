import ProductList from "../components/ProductList";
import { getWishList } from "../Api/ProductService";
import { Product } from "../types/product";
import { useState, useEffect } from "react";

const WishList = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-2 text-text-primary">
        <h1 className="py-2 text-3xl font-bold">WishList</h1>
        <h3 className="py-2 text-xl font-bold"></h3>
      </div>
      <ProductList products={products} role="wishlist" />
    </div>
  );
};

export default WishList;
