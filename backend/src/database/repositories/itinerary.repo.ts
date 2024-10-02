import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary.model';
import { getTagIds } from '../models/tag.model';
import { ItineraryType } from '../../types/Itinerary.types';
import Validator from '../../utils/Validator.utils';

class ItineraryRepo {
  async findItineraryById(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.findById(id).populate('tags');
  }

  async createItinerary(itinerary: ItineraryType) {
    const tagIds = await getTagIds(itinerary.tags);
    itinerary.tags = tagIds;
    return await Itinerary.create(itinerary);
  }

  async updateItinerary(id: string, itinerary: ItineraryType) {
    Validator.validateId(id, 'Invalid itinerary ID');
    const tagIds = await getTagIds(itinerary.tags);
    itinerary.tags = tagIds;
    return await Itinerary.findByIdAndUpdate(id, itinerary);
  }

  async deleteItinerary(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ItineraryRepo();
