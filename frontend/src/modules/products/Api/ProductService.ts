import axios from 'axios';
import { ProductFormData } from '../components/ProductForm';
import { Product } from '../types/product';

const API_URL = 'https://api.example.com/products';

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${productId}`);
};

export const updateProduct = async (productId: string, productData: ProductFormData): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${productId}`, productData);
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
