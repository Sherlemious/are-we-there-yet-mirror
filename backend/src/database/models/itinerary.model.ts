import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';

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
    type: [{ type: Schema.Types.ObjectId, ref: 'activity' }],
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
    type: [Date],
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
