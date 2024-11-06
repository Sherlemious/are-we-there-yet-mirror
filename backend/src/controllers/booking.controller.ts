import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';
import Validator from '../utils/Validator.utils';
import bookingRepo from '../database/repositories/booking.repo';
import { checkUserLegalAge } from '../utils/AgeVerification.utils';

class BookingController {
  async bookItinerary(req: Request, res: Response) {
    try {
      Validator.validateId(req.body.itinerary_id, 'incorrect itinerary id');

      if (!(await checkUserLegalAge(req.user.userId))) {
        res.status(403).json({ message: 'Cannot book as user is under 18' });
        return;
      }
      const booking = await bookingRepo.bookItinerary(req.user.userId, req.body.itinerary_id);

      const response = {
        message: 'Booking successful',
        data: { booking: booking },
      };

      res.status(ResponseStatusCodes.CREATED).send(response);
    } catch (error: any) {
      logger.error(`Error occurred while booking itinerary: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({
        message: `Error occurred while booking itinerary: ${error.message}`,
      });
    }
  }

  async bookActivity(req: Request, res: Response) {
    try {
      Validator.validateId(req.body.activity_id, 'incorrect activity id');

      if (!(await checkUserLegalAge(req.user.userId))) {
        res.status(403).json({ message: 'Cannot book as user is under 18' });
        return;
      }

      const booking = await bookingRepo.bookActivity(req.user.userId, req.body.activity_id);

      const response = {
        message: 'Booking successful',
        data: { booking: booking },
      };

      res.status(ResponseStatusCodes.CREATED).send(response);
    } catch (error: any) {
      logger.error(`Error occurred while booking activity: ${error.message}`);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({
        message: `Error occurred while booking activity: ${error.message}`,
      });
    }
  }
}

export default new BookingController();
