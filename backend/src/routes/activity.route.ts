import { Router } from 'express';
import {
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  createActivity,
  getActivitiesByCreator,
} from '../controllers/activity.controller';

const activityRouter = Router();

activityRouter.get('/:id', getActivityById);
activityRouter.get('/created_by/:id', getActivitiesByCreator);
activityRouter.post('/', createActivity);
activityRouter.put('/:id', updateActivity);
activityRouter.delete('/:id', deleteActivity);
activityRouter.get('/', getAllActivities);

export default activityRouter;
