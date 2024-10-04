import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';

const activitySchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
  },
  specialDiscounts: {
    type: String,
  },
  bookingOpen: {
    type: Boolean,
    required: true,
  },
});

const Activity = model('activity', activitySchema);

export { Activity, activitySchema };
