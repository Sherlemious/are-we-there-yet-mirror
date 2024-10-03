import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { range } from '../utils/Rangify.utils';
import { generateRanges } from '../utils/Rangify.utils';

import productRepo from '../database/repositories/product.repo';

const findProductById = async (req: Request, res: Response) => {
  try {
    const product = await productRepo.findProductById(req.params.id);
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productRepo.deleteProduct(req.params.id);
    const response = {
      message: 'Product deleted successfully',
      data: { productId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepo.getProducts();
    const response = {
      message: 'Products fetched successfully',
      data: { products },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product = req.body;

  try {
    const newProduct = await productRepo.createProduct(product);
    const response = {
      message: 'Product created successfully',
      data: { productId: newProduct._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getPriceRanges = async (req: Request, res: Response) => {
  try {
    const ranges = await productRepo.getPriceMinMax();
    if (!ranges.length) {
      throw new Error('No price ranges found');
    }
    const rangesCount = req.query.rangesCount ? parseInt(req.query.rangesCount as string) : 5;
    const rangesList: range[] = await generateRanges(ranges[0].minPrice, ranges[0].maxPrice, rangesCount);

    const response = {
      message: 'Price ranges fetched successfully',
      data: rangesList,
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching price ranges: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

async function filterProductByPriceRange(req: Request, res: Response) {
  try {
    const minPrice: number = parseInt(req.query.minPrice as string);
    const maxPrice: number = parseInt(req.query.maxPrice as string);

    const products = await productRepo.getProductsByPriceRange(minPrice, maxPrice);
    const response = {
      message: 'Products fetched successfully',
      data: { products },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
}

async function filterProductsBySeller(req: Request, res: Response) {
  try {
    const seller = req.query.seller as string;
    const products = await productRepo.filterProductsBySeller(seller);
    const response = {
      message: 'Products fetched successfully',
      data: { products },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
}

async function updateProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const product = req.body;

  try {
    await productRepo.updateProduct(productId, product.details, product.price);
    const response = {
      message: 'Product updated successfully',
      data: { productId },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating product: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
}

export {
  findProductById,
  createProduct,
  getPriceRanges,
  filterProductByPriceRange,
  filterProductsBySeller,
  updateProduct,
  getProducts,
  deleteProduct,
};
