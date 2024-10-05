import { ObjectId } from 'mongodb';
import { Itinerary } from '../models/itinerary.model';
import { getTagIds } from '../models/tag.model';
import { ItineraryType } from '../../types/Itinerary.types';
import Validator from '../../utils/Validator.utils';
import { getActivityIds } from '../models/activity.model';

class ItineraryRepo {
  async getItineraries(attributeName?: string, attributeValue?: RegExp | string) {
    const query = attributeName && attributeValue ? { [attributeName]: attributeValue } : {};
    return await Itinerary.find(query).populate(['tags', 'activities']);
  }

  async findItineraryById(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.findById(id).populate(['tags', 'activities']);
  }

  async createItinerary(itinerary: ItineraryType) {
    const tagIds = await getTagIds(itinerary.tags);
    const activityIds = await getActivityIds(itinerary.activities);
    itinerary.tags = tagIds;
    itinerary.activities = activityIds;
    return await Itinerary.create(itinerary);
  }

  async updateItinerary(id: string, itinerary: ItineraryType) {
    Validator.validateId(id, 'Invalid itinerary ID');
    const tagIds = await getTagIds(itinerary.tags);
    const activityIds = await getActivityIds(itinerary.activities);
    itinerary.tags = tagIds;
    itinerary.activities = activityIds;
    return await Itinerary.findByIdAndUpdate(id, itinerary);
  }

  async deleteItinerary(id: string) {
    Validator.validateId(id, 'Invalid itinerary ID');
    return await Itinerary.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new ItineraryRepo();
