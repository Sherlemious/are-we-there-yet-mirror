import { Request, Response } from 'express';
import AuthRepo from '../database/repositories/auth/auth.repo';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';
import Validator from '../utils/Validator.utils';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      Validator.validatePassword(req.body.password);

      const userId = await AuthRepo.register(req.body);
      res.send({ message: 'User registered successfully', data: { userId: userId, jwt: null } });
    } catch (error: any) {
      logger.error(`Error creating user: ${error}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).send({ message: error.message, data: null });
    }
  }
}

export default new AuthController();
