import { ObjectId } from 'mongodb';
import { Itinerary, replaceItineraryTagsDataWithIds } from '../models/itinerary.model';
import { ItineraryType } from '../../types/Itinerary.types';
import Validator from '../../utils/Validator.utils';

class ItineraryRepo {
  async findItineraryById(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.findById(id).populate('tags');
  }

  async createItinerary(itinerary: ItineraryType) {
    itinerary = await replaceItineraryTagsDataWithIds(itinerary);
    return await Itinerary.create(itinerary);
  }

  async updateItinerary(id: string, itinerary: ItineraryType) {
    Validator.validateId(id, 'Invalid itinerary ID');
    itinerary = await replaceItineraryTagsDataWithIds(itinerary);
    return await Itinerary.findByIdAndUpdate(id, itinerary);
  }

  async deleteItinerary(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ItineraryRepo();
