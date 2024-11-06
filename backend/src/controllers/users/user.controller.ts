import { Request, Response } from 'express';
import userRepo from '../../database/repositories/user.repo';
import { logger } from '../../middlewares/logger.middleware';
import { ResponseStatusCodes } from '../../types/ResponseStatusCodes.types';
import bookingRepo from '../../database/repositories/booking.repo';
import activityRepo from '../../database/repositories/activity.repo';
import itineraryRepo from '../../database/repositories/itinerary.repo';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getUsers();
    res.status(ResponseStatusCodes.OK).json({ message: 'Users fetched successfully', data: users });
  } catch (error: any) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await userRepo.createUser(user);
    const response = {
      message: 'User created successfully',
      data: { user: newUser },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userRepo.deleteUser(req.params.id);
    const response = {
      message: 'User deleted successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const acceptUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userRepo.acceptUser(userId);
    await userRepo.notRejectUser(userId);
    const response = {
      message: 'User accepted successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.getUserWithAttachments(req.params.id);
    const response = {
      message: 'User fetched successfully',
      data: { user: user },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = req.body;
    await userRepo.updateUser(userId, user);
    const response = {
      message: 'User updated successfully',
      data: { userId: userId },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const requestAccountDeletion = async (req: Request, res: Response) => {
  try {
    const userId: string = req.user.userId;
    await userRepo.requestAccountDeletion(userId);
    const response = {
      message: 'Account deletion requested successfully',
      data: { userId: userId },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error requesting account deletion: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const ChangeUserPassword = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    await userRepo.ChangeUserPassword(req.params.id, password);
    const response = {
      message: 'Password updated successfully',
      data: { userId: req.params.id, password: password },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error updating password: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const acceptTerms = async (req: Request, res: Response) => {
  try {
    await userRepo.acceptTerms(req.params.id);
    const response = {
      message: 'Terms accepted successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error accepting terms: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const rejectUser = async (req: Request, res: Response) => {
  try {
    await userRepo.rejectUser(req.params.id);
    await userRepo.notAcceptUser(req.params.id);
    const response = {
      message: 'User rejected successfully',
      data: { userId: req.params.id },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error rejecting user: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getItinerary = async (req: Request, res: Response) => {
  try {
    const itineraries = await userRepo.getItinerary(req.user.userId);
    const response = {
      message: 'Itineraries fetched successfully',
      data: { itineraries: itineraries },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching itineraries: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const getActivity = async (req: Request, res: Response) => {
  try {
    const activities = await userRepo.getActivity(req.user.userId);
    const response = {
      message: 'Activities fetched successfully',
      data: { activities: activities },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching activities: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
};

const cancelActivityBooking = async (req: Request, res: Response) => {
  try {
    const activityDate = await activityRepo.getActivitiesStartDate(req.body.activity_id);
    if (!activityDate) {
      res.status(ResponseStatusCodes.NOT_FOUND).send({
        message: 'Activity not found',
      });
      return;
    }
    const currentTime = new Date();
    const activityStartTime = new Date(activityDate.datetime);
    const timeDifference = activityStartTime.getTime() - currentTime.getTime();
    if (timeDifference < 48 * 60 * 60 * 1000) {
      res.status(ResponseStatusCodes.BAD_REQUEST).send({
        message: 'You can only cancel the booking at least 48 hours before the activity starts.',
      });
      return;
    }
    const booking = await bookingRepo.cancelBooking(req.body.booking_id);
    await userRepo.cancelActivityBooking(req.user.userId, req.body.booking_id);

    res.status(ResponseStatusCodes.OK).send({
      message: 'Booking cancelled successfully',
      data: { booking: booking },
    });
  } catch (error: any) {
    logger.error(`Error occurred while cancelling activity booking: ${error.message}`);
    res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({
      message: `Error occurred while cancelling activity booking: ${error.message}`,
    });
  }
};

const cancelItineraryBooking = async (req: Request, res: Response) => {
  try {
    const itinerary = await itineraryRepo.getItineraryStartDate(req.body.itinerary_id);
    if (!itinerary) {
      res.status(ResponseStatusCodes.NOT_FOUND).send({
        message: 'Itinerary not found',
      });
      return;
    }
    const currentTime = new Date();
    if (!itinerary.timeline || itinerary.timeline.length === 0) {
      res.status(ResponseStatusCodes.NOT_FOUND).send({
        message: 'Itinerary does not have time',
      });
      return;
    }
    const timelineItem = JSON.parse(itinerary.timeline[0]);
    const activityStartTime = new Date(timelineItem.start);
    const timeDifference = activityStartTime.getTime() - currentTime.getTime();
    if (timeDifference < 48 * 60 * 60 * 1000) {
      res.status(ResponseStatusCodes.BAD_REQUEST).send({
        message: 'You can only cancel the booking at least 48 hours before the itinerary starts.',
      });
      return;
    }
    const booking = await bookingRepo.cancelBooking(req.body.booking_id);
    await userRepo.cancelItineraryBooking(req.user.userId, req.body.booking_id);

    res.status(ResponseStatusCodes.OK).send({
      message: 'Booking cancelled successfully',
      data: { booking: booking },
    });
  } catch (error: any) {
    logger.error(`Error occurred while cancelling itinerary booking: ${error.message}`);
    res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({
      message: `Error occurred while cancelling itinerary booking: ${error.message}`,
    });
  }
}

export {
  getUsers,
  deleteUser,
  acceptUser,
  findUserById,
  updateUser,
  createUser,
  requestAccountDeletion,
  ChangeUserPassword,
  acceptTerms,
  rejectUser,
  getItinerary,
  getActivity,
  cancelActivityBooking,
  cancelItineraryBooking,
};
