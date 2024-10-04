import { promises as fs } from 'fs';
import multer from 'multer';
import { Request, Response } from 'express';
import * as path from 'path';

export class FileService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads'); // Define the directory to save files
    this.ensureUploadDirExists();
  }

  // Ensure the upload directory exists
  private async ensureUploadDirExists() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  // Configure multer for file uploads
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, this.uploadDir); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Save files with a timestamp prefix
    },
  });

  upload = multer({ storage: this.storage });

  // Method to handle file upload
  async handleFileUpload(req: Request, res: Response) {
    this.upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: 'File upload failed', error: err });
      }
      res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
  }

  // Method to download files
  async downloadFile(req: Request, res: Response) {
    const filePath = path.join(this.uploadDir, req.params.filename);
    res.download(filePath);
  }
}
