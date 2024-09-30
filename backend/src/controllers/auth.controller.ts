import { Request, Response } from 'express';
import AuthRepo from '../database/repositories/auth/auth.repo';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const userId = await AuthRepo.register(req.body);
      res.send({ message: 'User registered successfully', data: { userId: userId, jwt: null } });
    } catch (error) {
      logger.error(`Error creating user: ${error}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).send({ message: error, data: null });
    }
  }
}

export default new AuthController();
