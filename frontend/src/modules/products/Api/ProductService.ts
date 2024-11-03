import axiosInstance from "../../shared/services/axiosInstance";
import { Product } from "../types/product";

export const createProduct = async (
  productData: Omit<Product, "_id">,
): Promise<Product> => {
  try {
    const response = await axiosInstance.post<{ data: { product: Product } }>(
      `/products`,
      productData,
    );
    return response.data.data.product;
  } catch (error) {
    console.log("msh sh8ala sa7");
    throw new Error(error.response?.data?.message || "Error creating product");
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/products/${productId}`);
  } catch (error) {
    console.log("msh sh8ala sa7");
    throw new Error(error.response?.data?.message || "Error deleting product");
  }
};

export const updateProduct = async (
  productId: string,
  productData: Product,
): Promise<Product> => {
  try {
    const response = await axiosInstance.patch<{ data: { product: Product } }>(
      `/products/${productId}`,
      productData,
    );
    console.log(response.data.data.product);
    return response.data.data.product;
  } catch (error) {
    console.log("msh sh8ala sa7");
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<{ data: { products: Product[] } }>(
      `/products`,
    );
    return response.data.data.products;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};

export const getProductBySeller = async (
  sellerId: string,
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<{ data: { products: Product[] } }>(
      `/products/filter-by-seller?seller=${sellerId}`,
    );
    return response.data.data.products;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};
