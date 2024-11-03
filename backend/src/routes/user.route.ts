import { Router } from 'express';
import advertiserRouter from './advertiser.route';
import sellerRouter from './seller.route';
import adminRouter from './admin.route';
import tourGuideRouter from './tourGuide.route';
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

// User routes
router.get('/', getUsers);
router.patch('/requestDeletion', requestAccountDeletion);
router.patch('/:id/accept-user', acceptUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.get('/:id', findUserById);
router.patch('/:id', updateUser);
router.post('/', createUser);
router.patch('/changePassword/:id', ChangeUserPassword);
router.patch('/acceptTerms/:id', acceptTerms);
router.patch('/rejectUser/:id', rejectUser);

export default router;
