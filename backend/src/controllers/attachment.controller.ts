import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import attachmentRepo from '../database/repositories/attachment.repo';
import { logger } from '../middlewares/logger.middleware';
import cloudinary from '../config/cloudinary.config';
import { UploadedFile } from 'express-fileupload';

async function uploadAttachment(req: Request, res: Response) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' });
      return;
    }

    const file = req.files.file as UploadedFile;

    const result = await cloudinary.uploader.upload(file.tempFilePath);

    // Create a new attachment record in the database
    const attachment = await attachmentRepo.createAttachment({
      original_name: file.name,
      url: result.url,
      created_by: req.user?.userId,
    });

    res.status(ResponseStatusCodes.CREATED).json(attachment); // Respond with the created attachment record (metadata)
  } catch (error: any) {
    logger.error(`Error creating attachment: ${error.message}`);
    res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating attachment' });
  }
}

async function getAttachment(req: Request, res: Response) {
  try {
    const attachmentId = req.params.attachment_id;

    const attachment = await attachmentRepo.findAttachmentById(attachmentId);

    if (!attachment) {
      res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Attachment not found' });
      return;
    }

    res.status(ResponseStatusCodes.OK).json(attachment);
  } catch (error: any) {
    logger.error(`Error creating attachment: ${error.message}`);
    res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating attachment' });
  }
}

export { uploadAttachment, getAttachment };
