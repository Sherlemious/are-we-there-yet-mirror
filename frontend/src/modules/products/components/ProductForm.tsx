import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (productData: ProductFormData) => void;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  attachments: File[]; // Assuming you will implement file handling
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<ProductFormData, 'attachments'>>({
    name: '',
    description: '',
    price: 0,
    available_quantity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataWithAttachments = { ...formData, attachments: [] };

    onSubmit(formDataWithAttachments);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  w-1/3 mx-auto">
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        className={styles.inputClass}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className={styles.inputClass}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
        className={styles.inputClass}
      />
      <label htmlFor="available_quantity">Available Quantity</label>
      <input
        type="number"
        name="available_quantity"
        value={formData.available_quantity}
        onChange={handleInputChange}
        placeholder="Available Quantity"
        className={styles.inputClass}
      />
      {/* You can add file upload input for attachments */}
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  inputClass: 'border border-gray-300 rounded-md p-2 mb-2',
  button: 'bg-gray-500 text-white rounded-md p-2',
};

export default ProductForm;
