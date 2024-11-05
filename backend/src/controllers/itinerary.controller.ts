import { Request, Response } from 'express';
import ItineraryRepo from '../database/repositories/itinerary.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import mongoose from 'mongoose';

const getItineraries = async (req: Request, res: Response) => {
  try {
    const itineraries = await ItineraryRepo.getItineraries();
    const response = {
      message: 'Itineraries fetched successfully',
      data: { itineraries: itineraries },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching itineraries: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

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

const getItinerariesCreatedByUser = async (req: Request, res: Response) => {
  try {
    const itineraries = await ItineraryRepo.getItinerariesByCreator(req.user.userId);
    const response = {
      message: 'Itineraries fetched successfully',
      data: { itineraries: itineraries },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching itineraries: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createItinerary = async (req: Request, res: Response) => {
  const itinerary = req.body;
  itinerary.created_by = req.user.userId;

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

const filterItineraries = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice, startDate, endDate, tags, language } = req.query;
    let query: any = {};

    if (minPrice) {
      const minPriceValue = parseFloat(minPrice as string);
      query.price = { $gte: minPriceValue };
    }

    if (maxPrice) {
      const maxPriceValue = parseFloat(maxPrice as string);
      query.price = { ...query.price, $lte: maxPriceValue };
    }

    const now = new Date();

    if (startDate || endDate) {
      let dateQuery: any = {};

      if (startDate && new Date(startDate as string) >= now) {
        const startISO = new Date(startDate as string);
        dateQuery.$gte = startISO;
      }
      if (endDate && new Date(endDate as string) >= now) {
        const endISO = new Date(endDate as string);
        dateQuery.$lte = endISO;
      }
      query.available_datetimes = { $elemMatch: { $gte: now, ...dateQuery } };
    } else {
      query.available_datetimes = { $elemMatch: { $gte: now } };
    }

    if (language) {
      query.language = language as string;
    }

    if (tags && typeof tags === 'string') {
      const tagIds = tags.split(',');
      const objectIds = tagIds.map((id) => new mongoose.Types.ObjectId(id));
      query.tags = { $all: objectIds };
    }

    const itineraries = await ItineraryRepo.filterItineraries(query);

    res.status(ResponseStatusCodes.OK).json({ message: 'Itineraries fetched successfully', data: { itineraries } });
  } catch (error: any) {
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const toggleItineraryActive = async (req: Request, res: Response, active: boolean) => {
  try {
    await ItineraryRepo.toggleItineraryActive(req.params.id, active);
    const response = {
      message: 'Itinerary status updated successfully',
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error activating/deactivating itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const flagItinerary = async (req: Request, res: Response) => {
  try {
    await ItineraryRepo.flagItinerary(req.params.id);
    const newItinerary = await ItineraryRepo.findItineraryById(req.params.id);
    const response = {
      message: 'Itinerary flagged successfully',
      data: { itinerary: newItinerary },
    };

    res.json(response);
  } catch (error: any) {
    logger.error(`Error flagging itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getUserWhoCreatedItinerary = async (req: Request, res: Response) => {
  try {
    const userId = await ItineraryRepo.getUserWhoCreatedItinerary(req.params.id);
    const response = {
      message: 'User fetched successfully',
      data: { userId: userId },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching user who created itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export {
  getItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
  getItinerariesCreatedByUser,
  flagItinerary,
  toggleItineraryActive,
  getUserWhoCreatedItinerary,
};
