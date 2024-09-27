import { Schema, model } from 'mongoose';
import { locationSchema } from './location';

/**
 * TODO: modify types of tags, activities when their schemas are created
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
    type: [String],
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

export const Itinerary = model('itinerary', itinerarySchema);
