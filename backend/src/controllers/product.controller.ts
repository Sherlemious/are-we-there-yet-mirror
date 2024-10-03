import { Request, Response } from 'express';
import ProductRepo from '../database/repositories/product.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

const findProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductRepo.findProductById(req.params.id);
    const response = {
      message: 'Product fetched successfully',
      data: { product: product },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product = req.body;

  try {
    const newProduct = await ProductRepo.createProduct(product);
    const response = {
      message: 'Product created successfully',
      data: { product: newProduct },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const product = req.body;

  try {
    const updatedProduct = await ProductRepo.updateProduct(req.params.id, product);
    const response = {
      message: 'Product updated successfully',
      data: { product: updatedProduct },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await ProductRepo.deleteProduct(req.params.id);
    res.sendStatus(ResponseStatusCodes.NO_CONTENT);
  } catch (error: any) {
    logger.error(`Error deleting product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const filterProductsByPrice = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const products = await ProductRepo.filterProductsByPrice(
      minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice ? parseFloat(maxPrice as string) : undefined
    );
    res.status(ResponseStatusCodes.OK).json({ message: 'Products fetched successfully', data: products });
  } catch (error: any) {
    logger.error(`Error filtering products by price: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { findProductById, createProduct, updateProduct, deleteProduct, filterProductsByPrice };
