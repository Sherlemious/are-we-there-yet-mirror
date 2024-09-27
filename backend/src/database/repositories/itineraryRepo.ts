import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary';
import { ValidationException } from '../../exceptions/ValidationException';

const getItinerary = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new ValidationException('Invalid itinerary ID');
  }

  return await Itinerary.find({ _id: new ObjectId(id) });
};

export { getItinerary };
