import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';

import userRepo from '../database/repositories/user.repo';
import { UserType } from '../types/User.types';

async function redeemPoints(req: Request, res: Response) {
  try {
    const userId: string = req.user.userId;
    const user = await userRepo.findUserById(userId);
    if (!user) throw new Error('User not found');
    const { points } = req.body;
    if (user.loyalty_points < points) {
      throw new Error('Insufficient points');
    }
    user.loyalty_points -= points;
    if (!user.wallet) {
      user.wallet = 0;
    }
    user.wallet += points * 0.01;

    // Update user
    await userRepo.updateUser(userId, user as UserType);
    res.status(ResponseStatusCodes.OK).json({ message: 'Points redeemed successfully' });
  } catch (error: any) {
    logger.error(`Error redeeming points: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

async function getLoyaltyLevel(req: Request, res: Response) {
  try {
    const userId: string = req.user.userId;
    const user = await userRepo.findUserById(userId);
    if (!user) throw new Error('User not found');
    const points = user.loyalty_points;
    let level = 0;
    // 100k points
    if (points >= 1000000) {
      level = 3;
    } else if (points >= 500000) {
      level = 2;
    } else if (points >= 100000) {
      level = 1;
    }
    res.status(ResponseStatusCodes.OK).json({ message: 'Loyalty level fetched successfully', data: { level } });
  } catch (error: any) {
    logger.error(`Error fetching loyalty level: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export { redeemPoints, getLoyaltyLevel };
