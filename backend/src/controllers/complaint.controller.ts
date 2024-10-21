import { Request, Response } from 'express';
import ComplaintRepo from '../database/repositories/complaint.repo';
import { logger } from '../middlewares/logger.middleware';

class ComplaintController {
  async fileComplaint(req: Request, res: Response) {
    const submittedComplaint = req.body;
    submittedComplaint.created_by = req.user.userId;

    try {
      const newComplaint = await ComplaintRepo.fileComplaint(submittedComplaint);
      res.status(201).json({ message: 'Complaint filed successfully', data: { newComplaint } });
    } catch (error: any) {
      logger.error(`Error filing complaint: ${error.message}`);
      res.status(400).json({ message: error.message, data: [] });
    }
  }
}

export default new ComplaintController();
