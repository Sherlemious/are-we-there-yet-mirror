import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import ItineraryRepo from '../database/repositories/itinerary.repo';
import BookingRepo from '../database/repositories/booking.repo';
import currencyConverterService from '../services/currencyConverter.service';
import Validator from '../utils/Validator.utils';
import emailService from '../services/email/email.service';
import userRepo from '../database/repositories/user.repo';
import { ActivityType } from '../types/Activity.types';

const getItineraries = async (req: Request, res: Response) => {
  try {
    let itineraries = await ItineraryRepo.getItineraries();

    // Get the number of sales per itinerary and the total revenue
    for (const itinerary of itineraries) {
      const itineraryId = itinerary._id.toString();
      const sales = await BookingRepo.getNumberOfBookingsItinerary(itineraryId);
      itinerary.sales = sales;
      itinerary.revenue = itinerary.price * sales;
    }

    itineraries = itineraries.filter((itinerary) => itinerary.active && !itinerary.flagged);

    const currency: string = req.currency.currency;
    if (currency) {
      // Map through the itineraries and convert the price to the currency selected
      for (const itinerary of itineraries) {
        itinerary.price = await currencyConverterService.convertPrice(itinerary.price, currency);
        // Map the activities and convert the price to the currency selected
        for (const activity of itinerary.activities) {
          if (!activity.activity) continue;
          let originalPrice = 0;
          const activityData = activity.activity as unknown as ActivityType;
          originalPrice = activityData.price;
          activityData.price = await currencyConverterService.convertPrice(originalPrice, currency);
        }
      }
    }

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

const adminGetItineraries = async (req: Request, res: Response) => {
  try {
    let itineraries = await ItineraryRepo.getItineraries();

    // Get the number of sales per itinerary and the total revenue
    for (const itinerary of itineraries) {
      const itineraryId = itinerary._id.toString();
      const sales = await BookingRepo.getNumberOfBookingsItinerary(itineraryId);
      itinerary.sales = sales;
      itinerary.revenue = itinerary.price * sales;
    }

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

    if (!itinerary) {
      res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Itinerary not found', data: [] });
      return;
    }

    const currency: string = req.currency.currency;

    if (currency) {
      itinerary.price = await currencyConverterService.convertPrice(itinerary.price, currency);

      // Map the activities and convert the price to the currency selected
      for (const activity of itinerary.activities) {
        if (!activity.activity) continue;
        let originalPrice = 0;
        const activityData = activity.activity as unknown as ActivityType;
        originalPrice = activityData.price;
        activityData.price = await currencyConverterService.convertPrice(originalPrice, currency);
      }
    }

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
    let itineraries = await ItineraryRepo.getItinerariesByCreator(req.user.userId);

    // Get the number of sales per itinerary and the total revenue
    for (const itinerary of itineraries) {
      const itineraryId = itinerary._id.toString();
      const sales = await BookingRepo.getNumberOfBookingsItinerary(itineraryId);
      console.log(sales);
      itinerary.sales = sales;
      itinerary.revenue = itinerary.price * sales;
    }

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
    const ItineraryId: string = req.params.id;

    Validator.validateId(ItineraryId, 'Invalid itinerary ID');

    if (await BookingRepo.checkItineraryBooked(ItineraryId)) {
      res.status(ResponseStatusCodes.FORBIDDEN).json({ message: 'Cannot delete Itinerary as it is already booked' });
      return;
    }
    const deleteRes = await ItineraryRepo.deleteItinerary(ItineraryId);
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
  const user = await userRepo.findUserById(req.user.userId);
  const email = user?.email;
  try {
    Validator.validateId(req.params.id, 'Invalid itinerary ID');

    const itinerary = await ItineraryRepo.findItineraryById(req.params.id);
    await ItineraryRepo.toggleFlagItinerary(req.params.id, !itinerary?.flagged);

    if (email) {
      await emailService.sendFlaggedEmail(email);
    }
    await userRepo.flagItineraryNotification(req.user.userId);

    const response = {
      message: 'Itinerary flagged successfully',
      data: { flagged: !itinerary?.flagged },
    };

    res.json(response);
  } catch (error: any) {
    logger.error(`Error flagging itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export {
  getItineraries,
  adminGetItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
  getItinerariesCreatedByUser,
  flagItinerary,
  toggleItineraryActive,
};
