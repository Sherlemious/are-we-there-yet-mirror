import { Request, Response } from 'express';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import bookmarkRepo from '../database/repositories/bookmark.repo';

class BookmarkController {
  async addBookmark(req: Request, res: Response) {
    try {
      const { modelType, modelId } = req.body;

      const validModel = await bookmarkRepo.validItem(modelType, modelId);
      if (!validModel) {
        throw new Error('Invalid model type or model id');
      }

      const isBookmarked = await bookmarkRepo.isBookmarked(req.user.userId, modelType, modelId);
      if (isBookmarked) {
        throw new Error('Item already bookmarked');
      }

      const bookmarkId = await bookmarkRepo.saveBookmark(req.user.userId, modelType, modelId);
      res.status(ResponseStatusCodes.CREATED).json({ message: 'Bookmark added', data: { bookmark_id: bookmarkId } });
    } catch (error: any) {
      logger.error(error.message);
      res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message, data: [] });
    }
  }
}

export default new BookmarkController();
