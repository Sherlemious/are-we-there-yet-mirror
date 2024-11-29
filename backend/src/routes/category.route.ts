import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.get('/', getCategories);

export default categoryRouter;
