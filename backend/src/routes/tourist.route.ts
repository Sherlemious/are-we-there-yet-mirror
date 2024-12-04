import { Router } from 'express';
const router = Router();

import { redeemPoints } from '../controllers/loyalty.controller';
import addressController from '../controllers/address.controller';

router.post('/redeem', redeemPoints);

router.post('/addresses', addressController.addAddress);
router.get('/addresses', addressController.getMyAddresses);

export default router;
