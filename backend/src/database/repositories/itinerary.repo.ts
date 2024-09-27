import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary.model';
import { ValidationException } from '../../exceptions/ValidationException';
import { ItineraryType } from '../../types/Itinerary.types';

class ItineraryRepo {
  async findItineraryById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ValidationException('Invalid itinerary ID');
    }

    return await Itinerary.find({ _id: new ObjectId(id) });
  }

  async createItinerary(itinerary: ItineraryType) {
    const itineraryRes = await Itinerary.create(itinerary);
    return itineraryRes;
  }

  async deleteItinerary(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ValidationException('Invalid itinerary ID');
    }

    return await Itinerary.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ItineraryRepo();
