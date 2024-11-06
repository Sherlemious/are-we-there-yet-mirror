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
  getItinerary,
  getActivity,
  cancelActivityBooking,
  cancelItineraryBooking,
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
router.get('/getItineraries', getItinerary);
router.get('/getActivities', getActivity);
router.patch('/cancelActivityBooking', cancelActivityBooking);
router.patch('/cancelItineraryBooking', cancelItineraryBooking);
router.patch('/:id/accept-user', acceptUser);
router.delete('/:id', deleteUser);
router.get('/:id', findUserById);
router.patch('/:id', updateUser);
router.post('/', createUser);
router.patch('/changePassword/:id', ChangeUserPassword);
router.patch('/acceptTerms/:id', acceptTerms);
router.patch('/rejectUser/:id', rejectUser);

export default router;
