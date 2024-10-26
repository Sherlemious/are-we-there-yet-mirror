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

activityRouter.get('/', getAllActivities);
activityRouter.get('/mine', getActivitiesByCreator);
activityRouter.get('/:id', getActivityById);
activityRouter.post('/', createActivity);
activityRouter.put('/:id', updateActivity);
activityRouter.delete('/:id', deleteActivity);

export default activityRouter;
