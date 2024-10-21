import { Router } from 'express';
import ComplaintController from '../controllers/complaint.controller';

const complaintRouter = Router();

complaintRouter.post('/', ComplaintController.fileComplaint);

export default complaintRouter;
