import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import orderRepo from '../database/repositories/order.repo';

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepo.getOrders();
    res.status(ResponseStatusCodes.OK).json({ message: 'Orders fetched successfully', data: { orders: orders } });
  } catch (error: any) {
    logger.error(`Error fetching orders: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { getAllOrders };
