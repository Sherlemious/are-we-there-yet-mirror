import { Router } from 'express';
import {
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProductsByPrice,
} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/:id', findProductById);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/', filterProductsByPrice);

export default productRouter;
