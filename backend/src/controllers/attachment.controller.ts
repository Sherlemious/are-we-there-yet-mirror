import { NextFunction, Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import attachmentRepo from '../database/repositories/attachment.repo';
import { logger } from '../middlewares/logger.middleware';
const fs = require('fs');

const fileService = new FileService();

async function uploadAttachment(req: Request, res: Response) {
  fileService.upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'File upload failed', error: err });
    }

    try {
      if (!req.file) {
        return res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' });
      }

      // Extract file details from the request
      const filePath = req.file.path;
      const fileName = req.file.originalname;

      // Create a new attachment record in the database
      const attachment = await attachmentRepo.createAttachment({
        original_name: fileName,
        url: filePath,
        created_by: req.user.userId,
      });

      res.status(ResponseStatusCodes.CREATED).json(attachment); // Respond with the created attachment record (metadata)
    } catch (error: any) {
      logger.error(`Error creating attachment: ${error.message}`);
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
    }
  });
}

async function downloadAttachment(req: Request, res: Response, next: NextFunction) {
  try {
    const attachment_id = req.params.attachment_id;
    const attachment = await attachmentRepo.findAttachmentById(attachment_id);

    if (!attachment) {
      res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Attachment not found' });
      return;
    }

    // Extract file path and name from the attachment details
    const filePath = attachment.url;
    const fileName = attachment.original_name;

    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    const file = fs.createReadStream(filePath); // Create a read stream for the file

    file.pipe(res); // Pipe the file stream to the response}
  } catch (error: any) {
    logger.error(`Error downloading attachment: ${error.message}`);
    res
      .status(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error downloading attachment', error: error });
    next(error);
  }
}

export { uploadAttachment, downloadAttachment };
