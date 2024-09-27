import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary';
import { ValidationException } from '../../exceptions/ValidationException';
import { ItineraryType } from '../../types/Itinerary.types';

const getItinerary = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new ValidationException('Invalid itinerary ID');
  }

  return await Itinerary.find({ _id: new ObjectId(id) });
};

const createItinerary = async (itinerary: ItineraryType) => {
  const itineraryRes = await Itinerary.create(itinerary);
  return itineraryRes;
};

const deleteItinerary = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new ValidationException('Invalid itinerary ID');
  }

  return await Itinerary.deleteOne({ _id: new ObjectId(id) });
};

export { getItinerary, createItinerary, deleteItinerary };
