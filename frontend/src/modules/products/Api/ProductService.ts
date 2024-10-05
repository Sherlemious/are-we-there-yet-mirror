import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'https://are-we-there-yet-mirror.onrender.com/api';

export const createProduct = async (productData: Omit<Product, '_id'>): Promise<Product> => {
  try {
    const response = await axios.post<{ data: { product: Product } }>(`${API_URL}/products`, productData);
    return response.data.data.product;
  } catch (error) {
    console.log('msh sh8ala sa7');
    throw new Error(error.response?.data?.message || 'Error creating product');
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${productId}`);
  } catch (error) {
    console.log('msh sh8ala sa7');
    throw new Error(error.response?.data?.message || 'Error deleting product');
  }
};

export const updateProduct = async (productId: string, productData: Product): Promise<Product> => {
  try {
    const response = await axios.patch<{ data: { product: Product } }>(`${API_URL}/products/${productId}`, productData);
    return response.data.data.product;
  } catch (error) {
    console.log('msh sh8ala sa7');
    throw new Error(error.response?.data?.message || 'Error updating product');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ data: { products: Product[] } }>(`${API_URL}/products`);
    return response.data.data.products;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching products');
  }
};
