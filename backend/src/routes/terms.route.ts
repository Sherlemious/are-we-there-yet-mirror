import { Router } from 'express';
import { getTerms } from '../controllers/terms.controllers';
import { authenticateUnlessOpen } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getTerms); // Route to fetch terms text

export default router;
