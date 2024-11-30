import { Router } from 'express';
import BookmarkController from '../controllers/bookmark.controller';

const bookmarkRouter = Router();

bookmarkRouter.get('/', BookmarkController.getBookmarks);
bookmarkRouter.post('/', BookmarkController.addBookmark);

export default bookmarkRouter;
