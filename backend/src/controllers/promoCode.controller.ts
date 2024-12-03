import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';
import PromoCodeRepo from '../database/repositories/promoCode.repo';

class PromoCodeController {
  async getAllPromoCodes(req: Request, res: Response) {
    try {
      const promoCodes = await PromoCodeRepo.getAllPromoCodes();
      res.status(ResponseStatusCodes.OK).json(promoCodes);
    } catch (error: any) {
      logger.error(`Error getting all promo codes: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  async getPromoCodeById(req: Request, res: Response) {
    try {
      const promoCodeId = req.params.id;
      const promoCode = await PromoCodeRepo.findPromoCodeById(promoCodeId);
      if (!promoCode) {
        res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Promo code not found' });
        return;
      }
      res.status(ResponseStatusCodes.OK).json(promoCode);
    } catch (error: any) {
      logger.error(`Error getting promo code by id: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  async createPromoCode(req: Request, res: Response) {
    try {
      const promoCode = await PromoCodeRepo.createPromoCode(req.body);
      res.status(ResponseStatusCodes.CREATED).json(promoCode);
    } catch (error: any) {
      logger.error(`Error creating promo code: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  async deletePromoCode(req: Request, res: Response) {
    try {
      const promoCodeId = req.params.id;
      const promoCode = await PromoCodeRepo.deletePromoCode(promoCodeId);
      if (!promoCode) {
        res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Promo code not found' });
        return;
      }
      res.status(ResponseStatusCodes.OK).json({ message: 'Promo code deleted successfully' });
    } catch (error: any) {
      logger.error(`Error deleting promo code: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  async updatePromoCode(req: Request, res: Response) {
    try {
      const promoCodeId = req.params.id;
      const promoCode = await PromoCodeRepo.findPromoCodeById(promoCodeId);
      if (!promoCode) {
        res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Promo code not found' });
        return;
      }
      const updatedPromoCode = await promoCode.updateOne(req.body);
      res.status(ResponseStatusCodes.OK).json(updatedPromoCode);
    } catch (error: any) {
      logger.error(`Error updating promo code: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

export default new PromoCodeController();
