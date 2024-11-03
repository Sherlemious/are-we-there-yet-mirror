import { Router } from 'express';
const router = Router();

import { getLoyaltyLevel, redeemPoints } from '../controllers/loyalty.controller';

router.post('/redeem', redeemPoints);
router.get('/loyalty', getLoyaltyLevel);

export default router;
