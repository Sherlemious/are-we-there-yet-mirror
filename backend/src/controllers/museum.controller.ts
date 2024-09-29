import { Request, Response } from 'express';
import MuseumRepo from '../database/repositories/museum.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

const findMuseumById = async (req: Request, res: Response) => {
  try {
    const museum = await MuseumRepo.findMuseumById(req.params.id);
    const response = {
      message: 'Museum fetched successfully',
      data: { museum: museum },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching museum: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createMuseum = async (req: Request, res: Response) => {
  const museum = req.body;

  try {
    const newMuseum = await MuseumRepo.createMuseum(museum);
    const response = {
      message: 'Museum created successfully',
      data: { museumId: newMuseum._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating museum: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateMuseum = async (req: Request, res: Response) => {
  try {
    const updatedMuseum = await MuseumRepo.updateMuseum(req.params.id, req.body);
    const response = {
      message: 'Update Museum',
      data: { museum: updatedMuseum },
    };

    res.json(response);
  } catch (error: any) {
    logger.error(`Error updating museum: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteMuseum = async (req: Request, res: Response) => {
  try {
    const deleteRes = await MuseumRepo.deleteMuseum(req.params.id);
    const response = {
      message: 'Museum deleted successfully',
      data: { museum: deleteRes },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting museum: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { findMuseumById, createMuseum, updateMuseum, deleteMuseum };


