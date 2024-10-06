import { Request, Response } from 'express';
import categoryRepo from '../database/repositories/category.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { CategoryType } from '../types/Category.types';

const createCategory = async (req: Request, res: Response) => {
  try {
    const category: CategoryType = req.body;
    const newCategory = await categoryRepo.createCategory(category);
    const response = {
      message: 'Category created successfully',
      data: { categoryId: newCategory._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating category: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryRepo.getCategoryById(req.params.id);
    const response = {
      message: 'Category fetched successfully',
      data: { category },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching category: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepo.getCategories();
    const response = {
      message: 'Categories fetched successfully',
      data: { categories },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching categories: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category: CategoryType = req.body;
    await categoryRepo.updateCategory(req.params.id, category);
    const response = {
      message: 'Category updated successfully',
      data: { categoryId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating category: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryRepo.deleteCategory(req.params.id);
    const response = {
      message: 'Category deleted successfully',
      data: { categoryId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting category: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { createCategory, getCategoryById, getCategories, updateCategory, deleteCategory };
