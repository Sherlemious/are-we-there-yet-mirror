import { Router } from 'express';
import { getTourGuides, createTourGuide, updateTourGuide } from '../controllers/users/tourGuide.controller';

const router = Router();

router.get('', getTourGuides);
router.post('', createTourGuide);
router.put('/:id', updateTourGuide);

export default router;
