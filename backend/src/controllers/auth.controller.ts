import { Request, Response } from 'express';
import AuthRepo from '../database/repositories/auth/auth.repo';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { logger } from '../middlewares/logger.middleware';
import Validator from '../utils/Validator.utils';
import AuthService from '../services/auth.service';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      Validator.validatePassword(req.body.password);

      const user = await AuthRepo.register(req.body);
      const token = AuthService.generateAccessToken({ userId: user.id, accountType: req.body.account_type });

      res.send({ message: 'User registered successfully', data: { user: user, jwt: token } });
    } catch (error: any) {
      logger.error(`Error creating user: ${error}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).send({ message: error.message, data: null });
    }
  }
}

export default new AuthController();
