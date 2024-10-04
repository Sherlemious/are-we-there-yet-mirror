import { Request, Response } from 'express';
import userRepo from '../../database/repositories/user.repo';
import { logger } from '../../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../../types/ResponseStatusCodes.types';
import { accountType } from '../../types/User.types';

const createSeller = async (req: Request, res: Response) => {
  try {
    const seller = req.body;
    const newSeller = await userRepo.createUser(seller);
    const response = {
      message: 'Seller created successfully',
      data: { sellerId: newSeller._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating seller: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await userRepo.getUsersByType(accountType.Seller);
    const response = {
      message: 'Sellers fetched successfully',
      data: { sellers: sellers },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching sellers: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateSeller = async (req: Request, res: Response) => {
  try {
    const seller = req.body;
    await userRepo.updateUser(req.params.id, seller);
    const response = {
      message: 'Seller updated successfully',
      data: { sellerId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating seller: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { createSeller, getSellers, updateSeller };
