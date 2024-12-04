import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import addressRepo from '../database/repositories/address.repo';

class AddressController {
  async addAddress(req: Request, res: Response) {
    try {
      const { address } = req.body;
      address.user_id = req.user.userId;
      const newAddress = await addressRepo.createAddress(address);

      res
        .status(ResponseStatusCodes.CREATED)
        .send({ message: 'Address added successfully', data: { address_id: newAddress } });
    } catch (error: any) {
      logger.error(error.message);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  async getMyAddresses(req: Request, res: Response) {
    try {
      const addresses = await addressRepo.getMyAddresses(req.user.userId);

      res
        .status(ResponseStatusCodes.OK)
        .send({ message: "User's address fetched successfully", data: { addresses: addresses } });
    } catch (error: any) {
      logger.error(error.message);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}

export default new AddressController();
