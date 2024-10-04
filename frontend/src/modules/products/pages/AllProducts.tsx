import ProductList from '../components/ProductList';

const AllProducts = () => {
  const productsExample = [
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
    {
      _id: '7',
      name: 'Product 7',
      description: 'Description 7',
      price: 700,
      available_quantity: 70,
      attachments: [],
      reviews: [],
      seller: 'Ahmed Mohsen',
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-9 text-text-primary">
        <h1 className="py-2 text-4xl font-bold">Welcome 3abSamad</h1>
        <h3 className="py-2 text-2xl font-bold">Products</h3>
      </div>
      {/* <ProductForm onSubmit={handleCreate} /> */}
      <ProductList products={productsExample} role="tourist" />
    </div>
  );
};

export default AllProducts;
