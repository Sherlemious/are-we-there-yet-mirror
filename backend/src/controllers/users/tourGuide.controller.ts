import { Request, Response } from 'express';
import userRepo from '../../database/repositories/user.repo';
import { logger } from '../../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../../types/ResponseStatusCodes.types';
import { accountType } from '../../types/User.types';

const createTourGuide = async (req: Request, res: Response) => {
  try {
    const tourGuide = req.body;
    const newTourGuide = await userRepo.createUser(tourGuide);
    const response = {
      message: 'TourGuide created successfully',
      data: { tourGuideId: newTourGuide._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating tourGuide: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getTourGuides = async (req: Request, res: Response) => {
  try {
    const tourGuides = await userRepo.getUsersByType(accountType.TourGuide);
    const response = {
      message: 'TourGuides fetched successfully',
      data: { tourGuides: tourGuides },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching tourGuides: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateTourGuide = async (req: Request, res: Response) => {
  try {
    const tourGuide = req.body;
    await userRepo.updateUser(req.params.id, tourGuide);
    const response = {
      message: 'TourGuide updated successfully',
      data: { tourGuideId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating tourGuide: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { createTourGuide, getTourGuides, updateTourGuide };
