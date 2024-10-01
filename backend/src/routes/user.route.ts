import { Router } from 'express';
import { deleteUser, acceptUser, findUserById } from '../controllers/users/user.controller';

const router = Router();

router.delete('/:id', deleteUser);
router.patch('/:id/accept-user', acceptUser);
router.get('/:id', findUserById);

export default router;
