import { Router } from 'express';
import advertiserRouter from './advertiser.route';
import sellerRouter from './seller.route';
import adminRouter from './admin.route';
import tourGuideRouter from './tourGuide.route';
import { deleteUser, acceptUser, findUserById } from '../controllers/users/user.controller';

const router = Router();

router.use('/advertisers', advertiserRouter);
router.use('/tourGuides', tourGuideRouter);
router.use('/sellers', sellerRouter);
router.use('/admins', adminRouter);
router.delete('/:id', deleteUser);
router.patch('/:id/accept-user', acceptUser);
router.get('/:id', findUserById);

export default router;
