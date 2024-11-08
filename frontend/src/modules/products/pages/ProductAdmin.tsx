import React, { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../Api/ProductService";
import { Product } from "../types/product";
import { ProductFormDataSubmit } from "../components/ProductForm";
import { UserContext } from "../../shared/store/user-context";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleCreate = async (productData: ProductFormDataSubmit) => {
    const product = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      available_quantity: productData.available_quantity,
      attachments: productData.attachments,
      reviews: [],
      seller: user._id,
      sales: 0,
      archive: false,
    };
    await createProduct(product);
    const Products = await getProducts();
    setProducts(Products);
  };

  const handleEdit = async (productData: Product) => {
    const product = {
      _id: productData._id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      available_quantity: productData.available_quantity,
      attachments: productData.attachments,
      reviews: [],
      seller: user._id,
      sales: productData.sales,
      archive: productData.archive,
    };
    await updateProduct(product._id, product);
    const products = await getProducts();
    setProducts(products);
  };
  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    setProducts(products.filter((p) => p._id !== productId));
  };

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-2 text-text-primary">
        <h1 className="py-2 text-3xl font-bold">My Products</h1>
        <h3 className="py-2 text-xl font-bold"></h3>
      </div>
      {/* <ProductForm onSubmit={handleCreate} /> */}
      <ProductList
        products={products}
        role="admin"
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPage;
