import { Request, Response } from 'express';
import userRepo from '../../database/repositories/user.repo';
import { logger } from '../../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../../types/ResponseStatusCodes.types';
import { accountType } from '../../types/User.types';

const createAdvertiser = async (req: Request, res: Response) => {
  try {
    const advertiser = req.body;
    const newAdvertiser = await userRepo.createUser(advertiser);
    const response = {
      message: 'Advertiser created successfully',
      data: { advertiserId: newAdvertiser._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating advertiser: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getAdvertisers = async (req: Request, res: Response) => {
  try {
    const advertisers = await userRepo.getUsersByType(accountType.Advertiser);
    const response = {
      message: 'Advertisers fetched successfully',
      data: { advertisers: advertisers },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching advertisers: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateAdvertiser = async (req: Request, res: Response) => {
  try {
    const advertiser = req.body;
    await userRepo.updateUser(req.params.id, advertiser);
    const response = {
      message: 'Advertiser updated successfully',
      data: { advertiserId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating advertiser: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { createAdvertiser, getAdvertisers, updateAdvertiser };
