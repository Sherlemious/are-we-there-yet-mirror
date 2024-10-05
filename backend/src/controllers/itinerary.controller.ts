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

    const now = new Date().toISOString();

    if (startDate || endDate) {
      let dateQuery: any = {};

      if (startDate) {
        const startISO = new Date(startDate as string).toISOString();
        dateQuery.$gte = startISO;
      }
      if (endDate) {
        const endISO = new Date(endDate as string).toISOString();
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

export { getItineraries, findItineraryById, createItinerary, updateItinerary, deleteItinerary, filterItineraries };
