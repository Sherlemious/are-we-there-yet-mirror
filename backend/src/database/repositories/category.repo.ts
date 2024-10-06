import { Category } from '../models/category.model';
import { CategoryType } from '../../types/Category.types';
import Validator from '../../utils/Validator.utils';

class CategoryRepository {
  async createCategory(category: CategoryType) {
    return await Category.create(category);
  }

  async getCategoryById(id: string) {
    Validator.validateId(id, 'Invalid category ID');
    return await Category.findById(id);
  }

  async getCategories() {
    return await Category.find();
  }

  async updateCategory(id: string, category: CategoryType) {
    Validator.validateId(id, 'Invalid category ID');
    return await Category.findByIdAndUpdate(id, category, { new: true });
  }

  async deleteCategory(id: string) {
    Validator.validateId(id, 'Invalid category ID');
    return await Category.findByIdAndDelete(id);
  }
}

export default new CategoryRepository();
