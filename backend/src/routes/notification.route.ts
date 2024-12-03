import { Router } from 'express';

import { getNotifications } from '../controllers/notification.controller';

const notificationRouter = Router();

notificationRouter.get('/', getNotifications);

export default notificationRouter;
