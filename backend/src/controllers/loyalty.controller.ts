import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';

import userRepo from '../database/repositories/user.repo';
import { UserType } from '../types/User.types';

async function redeemPoints(req: Request, res: Response) {
  try {
    const userId: string = req.user.userId;
    const { points } = req.body;

    const user = await userRepo.findUserById(userId);

    if (!user) throw new Error('User not found');

    user.wallet += points * 0.01;

    // Update user
    await userRepo.updateUser(userId, user as UserType);
    await userRepo.updateUserLoyaltyPoints(userId, -points);

    res.status(ResponseStatusCodes.OK).json({ message: 'Points redeemed successfully' });
  } catch (error: any) {
    logger.error(`Error redeeming points: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export { redeemPoints };
