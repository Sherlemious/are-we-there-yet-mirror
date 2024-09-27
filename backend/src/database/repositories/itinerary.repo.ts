import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary.model';
import { ItineraryType } from '../../types/Itinerary.types';
import Validator from '../../utils/Validator.utils';

class ItineraryRepo {
  async findItineraryById(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.find({ _id: new ObjectId(id) });
  }

  async createItinerary(itinerary: ItineraryType) {
    const itineraryRes = await Itinerary.create(itinerary);
    return itineraryRes;
  }

  async updateItinerary(id: string, itinerary: ItineraryType) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.updateOne({ _id: new ObjectId(id) }, itinerary);
  }

  async deleteItinerary(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ItineraryRepo();
