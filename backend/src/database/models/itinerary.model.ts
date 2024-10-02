import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';

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
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  available_datetimes: {
    type: [String],
    required: true,
  },
  accessibility: {
    type: Boolean,
    required: true,
  },
  pick_up_location: {
    type: locationSchema,
    required: true,
  },
  drop_off_location: {
    type: locationSchema,
    required: true,
  },
});

const Itinerary = model('itinerary', itinerarySchema);

export { Itinerary, itinerarySchema };
