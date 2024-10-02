import { Request, Response } from 'express';
import userRepo from '../../database/repositories/user.repo';
import { logger } from '../../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../../types/ResponseStatusCodes.types';

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userRepo.deleteUser(req.params.id);
    const response = {
      message: 'User deleted successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const acceptUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userRepo.acceptUser(userId);
    const response = {
      message: 'User accepted successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findUserById(req.params.id);
    const response = {
      message: 'User fetched successfully',
      data: { user: user },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { deleteUser, acceptUser, findUserById };
