import { Router } from 'express';
import advertiserRouter from './advertiser.route';
import sellerRouter from './seller.route';
import { deleteUser, acceptUser, findUserById } from '../controllers/users/user.controller';

const router = Router();

router.use('/advertisers', advertiserRouter);
router.use('/sellers', sellerRouter);
router.delete('/:id', deleteUser);
router.patch('/:id/accept-user', acceptUser);
router.get('/:id', findUserById);

export default router;
