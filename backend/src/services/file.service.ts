import fileUpload, { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

export default class FileService {
  static upload = fileUpload();

  // Method to handle file upload
  static async handleFileUpload(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: 'No files were uploaded.' });
    }

    const file = req.files.file as UploadedFile;

    res.status(ResponseStatusCodes.OK).json({ message: 'File uploaded successfully', file });
  }
}
