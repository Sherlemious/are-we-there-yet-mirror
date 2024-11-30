import { Schema } from 'mongoose';

const bookmarkSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  itinerary: {
    type: Schema.Types.ObjectId,
    ref: 'itinerary',
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'activity',
  },
});

export { bookmarkSchema };
