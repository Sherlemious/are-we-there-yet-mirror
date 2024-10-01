import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';
import { Tag } from './tag.model';
import { ValidationException } from '../../exceptions/ValidationException';

/**
 * TODO: modify types of activities when its schema is created
 */
const itinerarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    required: true,
  },
  activities: {
    type: [String],
  },
  locations: {
    type: [locationSchema],
  },
  timeline: {
    type: String,
  },
  language: {
    type: String,
  },
  price: {
    type: Number,
  },
  available_datetimes: {
    type: [String],
  },
  accessibility: {
    type: Boolean,
  },
  pick_up_location: {
    type: locationSchema,
  },
  drop_off_location: {
    type: locationSchema,
  },
});

async function replaceItineraryTagsDataWithIds(itineraryData: any) {
  const tagIds = [];

  if (!itineraryData.tags) {
    return itineraryData;
  }

  for (const tagData of itineraryData.tags) {
    let tag = await Tag.findOne({
      name: tagData.name,
      type: tagData.type,
      historical_period: tagData.historical_period,
    });

    if (!tag) {
      throw new ValidationException('One or more tags are invalid');
    }

    tagIds.push(tag._id);
  }

  itineraryData.tags = tagIds;

  return itineraryData;
}

const Itinerary = model('itinerary', itinerarySchema);

export { Itinerary, itinerarySchema, replaceItineraryTagsDataWithIds };
