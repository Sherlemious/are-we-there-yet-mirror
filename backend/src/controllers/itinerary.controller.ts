import { Request, Response } from 'express';
import ItineraryRepo from '../database/repositories/itinerary.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

const findItineraryById = async (req: Request, res: Response) => {
  try {
    const itinerary = await ItineraryRepo.findItineraryById(req.params.id);
    const response = {
      message: 'Itinerary fetched successfully',
      data: { itinerary: itinerary },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createItinerary = async (req: Request, res: Response) => {
  const itinerary = req.body;

  try {
    const newItinerary = await ItineraryRepo.createItinerary(itinerary);
    const response = {
      message: 'Itinerary created successfully',
      data: { itineraryId: newItinerary._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateItinerary = async (req: Request, res: Response) => {
  try {
    const updatedItinerary = await ItineraryRepo.updateItinerary(req.params.id, req.body);
    const response = {
      message: 'Update Itinerary',
      data: { itinerary: updatedItinerary },
    };

    res.json(response);
  } catch (error: any) {
    logger.error(`Error updating itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteItinerary = async (req: Request, res: Response) => {
  try {
    const deleteRes = await ItineraryRepo.deleteItinerary(req.params.id);
    const response = {
      message: 'Itinerary deleted successfully',
      data: { itinerary: deleteRes },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { findItineraryById, createItinerary, updateItinerary, deleteItinerary };
