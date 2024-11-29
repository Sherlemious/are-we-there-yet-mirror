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
  getAvailableQuantityAndSales,
  buyProduct,
  archiveProduct,
  unarchiveProduct,
  cancelProduct,
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
router.get('/available-quantity-sales/:id', getAvailableQuantityAndSales);
router.patch('/buy/:id', buyProduct);
router.patch('/archive/:id', archiveProduct);
router.patch('/unarchive/:id', unarchiveProduct);
router.patch('/cancel/:id', cancelProduct);

export default router;
