import ProductList from "../components/ProductList";
import { getProducts } from "../Api/ProductService";
import { Product } from "../types/product";
import { useState, useEffect /*,useContext*/ } from "react";
// import { UserContext } from "../../shared/store/user-context";

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const { user } = useContext(UserContext);

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
        {/* <h1 className="py-2 text-4xl font-bold">Welcome {user.username}</h1> */}
        <h1 className="py-2 text-3xl font-bold">Products</h1>
        <h3 className="py-2 text-xl font-bold"></h3>
      </div>
      <ProductList products={products} role="tourist" />
    </div>
  );
};

export default AllProducts;
