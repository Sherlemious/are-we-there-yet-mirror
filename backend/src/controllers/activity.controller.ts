import { Request, Response } from 'express';
import activityRepo from '../database/repositories/activity.repo';
import { logger } from '../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import { ActivityType } from '../types/Activity.types';

const createActivity = async (req: Request, res: Response) => {
  try {
    const activity: ActivityType = req.body;
    const newActivity = await activityRepo.createActivity(activity);
    res
      .status(ResponseStatusCodes.CREATED)
      .json({ message: 'Activity created successfully', data: { activityId: newActivity._id } });
  } catch (error: any) {
    logger.error(`Error creating activity: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await activityRepo.getActivityById(req.params.id);
    res.status(ResponseStatusCodes.OK).json({ message: 'Activity fetched successfully', data: { activity } });
  } catch (error: any) {
    logger.error(`Error fetching activity: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity: ActivityType = req.body;
    const updatedActivity = await activityRepo.updateActivity(req.params.id, activity);
    if (!updatedActivity) {
      res.status(ResponseStatusCodes.NOT_FOUND).json({ message: 'Activity not found', data: [] });
      return;
    }
    res
      .status(ResponseStatusCodes.OK)
      .json({ message: 'Activity updated successfully', data: { activityId: updatedActivity._id } });
  } catch (error: any) {
    logger.error(`Error updating activity: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteActivity = async (req: Request, res: Response) => {
  try {
    await activityRepo.deleteActivity(req.params.id);
    res
      .status(ResponseStatusCodes.OK)
      .json({ message: 'Activity deleted successfully', data: { activityId: req.params.id } });
  } catch (error: any) {
    logger.error(`Error deleting activity: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await activityRepo.getAllActivities();
    res.status(ResponseStatusCodes.OK).json({ message: 'Activities fetched successfully', data: activities });
  } catch (error: any) {
    logger.error(`Error fetching activities: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getActivitiesByCreator = async (req: Request, res: Response) => {
  try {
    const activities = await activityRepo.getActivitiesByCreator(req.params.id);
    res.status(ResponseStatusCodes.OK).json({ message: 'Activities fetched successfully', data: activities });
  } catch (error: any) {
    logger.error(`Error fetching activities: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

export { getAllActivities, createActivity, getActivityById, updateActivity, deleteActivity, getActivitiesByCreator };
