import { Router } from 'express';
import { uploadAttachment, downloadAttachment } from '../controllers/attachment.controller';

const router = Router();

router.get('/:attachment_id', downloadAttachment);
router.post('', uploadAttachment);

export default router;
