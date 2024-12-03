import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import userRepo from '../database/repositories/user.repo';

const getNotifications = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findUserById(req.user.userId);

    const response = {
      message: 'Notifications fetched successfully',
      data: { notifications: user?.notifications },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching notifications: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { getNotifications };
