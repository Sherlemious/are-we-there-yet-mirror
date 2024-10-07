import { Router } from 'express';
import { createAdvertiser, updateAdvertiser, getAdvertisers } from '../controllers/users/advertiser.controller';

const router = Router();

router.get('', getAdvertisers);
router.post('', createAdvertiser);
router.put('/:id', updateAdvertiser);

export default router;
