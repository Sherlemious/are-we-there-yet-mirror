import { Router } from 'express';
import { createSeller, updateSeller, getSellers } from '../controllers/users/seller.controller';

const router = Router();

router.get('/', getSellers);
router.post('/', createSeller);
router.put('/:id', updateSeller);

export default router;
