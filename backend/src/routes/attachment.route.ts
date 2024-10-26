import { Router } from 'express';
import { uploadAttachment, getAttachment } from '../controllers/attachment.controller';

const router = Router();

router.get('/:attachment_id', getAttachment);
router.post('', uploadAttachment);

export default router;
