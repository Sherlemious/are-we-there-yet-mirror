import ProductList from "../components/ProductList";
import { getProducts } from "../Api/ProductService";
import { Product } from "../types/product";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../shared/store/user-context";
import Greeting from "@/modules/shared/components/Greeting";

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-2 text-text-primary">
        <Greeting name={user.username} title="Products" signedIn />
      </div>
      <ProductList products={products} role="tourist" />
    </div>
  );
};

export default AllProducts;
