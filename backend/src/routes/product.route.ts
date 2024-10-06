import { Router } from 'express';

import {
  findProductById,
  createProduct,
  getPriceRanges,
  filterProductByPriceRange,
  filterProductsBySeller,
  updateProduct,
  getProducts,
  deleteProduct,
  addProductReview,
  deleteProductReview,
} from '../controllers/product.controller';

const router = Router();

// Product routes
router.get('/price-ranges', getPriceRanges);
router.get('/filter-by-price', filterProductByPriceRange);
router.get('/filter-by-seller', filterProductsBySeller);
router.post('/:id/reviews', addProductReview);
router.delete('/:id/reviews/:review_id', deleteProductReview);
router.get('/:id', findProductById);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
router.get('/', getProducts);
router.post('/', createProduct);

export default router;
