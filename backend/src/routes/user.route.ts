import { Router } from 'express';
import advertiserRouter from './advertiser.route';
import sellerRouter from './seller.route';
import adminRouter from './admin.route';
import tourGuideRouter from './tourGuide.route';
import touristRouter from './tourist.route';

import {
  getUsers,
  createUser,
  deleteUser,
  acceptUser,
  findUserById,
  updateUser,
  requestAccountDeletion,
  ChangeUserPassword,
  acceptTerms,
  rejectUser,
} from '../controllers/users/user.controller';

const router = Router();

// User-specific routes
router.use('/advertisers', advertiserRouter);
router.use('/tourGuides', tourGuideRouter);
router.use('/sellers', sellerRouter);
router.use('/admins', adminRouter);
router.use('/tourists', touristRouter);

// User routes
router.get('/', getUsers);
router.patch('/requestDeletion', requestAccountDeletion);
router.patch('/changePassword', ChangeUserPassword);
router.patch('/accept-user/:id', acceptUser);
router.patch('/acceptTerms', acceptTerms);
router.patch('/rejectUser/:id', rejectUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/:id', findUserById);
router.patch('/:id', updateUser);

export default router;
