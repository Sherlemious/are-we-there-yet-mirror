import { Router } from 'express';
import { createAdmin, updateAdmin, getAdmins } from '../controllers/users/admin.controller';

const router = Router();

router.get('', getAdmins);
router.post('', createAdmin);
router.put('/:id', updateAdmin);

export default router;
