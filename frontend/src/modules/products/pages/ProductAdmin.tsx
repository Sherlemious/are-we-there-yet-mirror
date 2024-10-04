import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';

const AdminPage: React.FC = () => {
  const productsExample: Product[] = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      available_quantity: 10,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      available_quantity: 20,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
    {
      _id: '3',
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      available_quantity: 30,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
    {
      _id: '4',
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      available_quantity: 40,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
    {
      _id: '5',
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      available_quantity: 50,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
    {
      _id: '6',
      name: 'Product 6',
      description: 'Description 6',
      price: 600,
      available_quantity: 60,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
  ];
  const [products, setProducts] = useState<Product[]>(productsExample);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const data = await getProducts();
  //       setProducts(data);
  //     };
  //     fetchProducts();
  //   }, []);

  const handleCreate = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts([...products, newProduct]);
  };

  const handleEdit = async (productData: Product) => {
    // const updatedProduct = await updateProduct(product._id, product);
    setProducts(products.map((p) => (p._id === product._id ? updatedProduct : p)));
  };

  const handleDelete = async (productId) => {
    // await deleteProduct(productId);
    setProducts(products.filter((p) => p._id !== productId));
  };

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-9 text-text-primary">
        <h1 className="py-2 text-4xl font-bold">Welcome Admin</h1>
        <h3 className="py-2 text-2xl font-bold">Products</h3>
      </div>
      {/* <ProductForm onSubmit={handleCreate} /> */}
      <ProductList products={products} role="admin" onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminPage;
