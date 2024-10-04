import { Request, Response } from 'express';
import tagRepo from '../database/repositories/tag.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

const findTagById = async (req: Request, res: Response) => {
  try {
    const tag = await tagRepo.findTagById(req.params.id);
    const response = {
      message: 'Tag fetched successfully',
      data: { tag: tag },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching tag: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createTag = async (req: Request, res: Response) => {
  const tag = req.body;

  try {
    const newTag = await tagRepo.createTag(tag);
    const response = {
      message: 'Tag created successfully',
      data: { tagId: newTag._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating tag: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const updatedTag = await tagRepo.updateTag(req.params.id, req.body);
    const response = {
      message: 'Update Tag',
      data: { tag: updatedTag },
    };

    res.json(response);
  } catch (error: any) {
    logger.error(`Error updating tag: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteTag = async (req: Request, res: Response) => {
  try {
    const deleteRes = await tagRepo.deleteTag(req.params.id);
    const response = {
      message: 'Tag deleted successfully',
      data: { tag: deleteRes },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting tag: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { findTagById, createTag, updateTag, deleteTag };
