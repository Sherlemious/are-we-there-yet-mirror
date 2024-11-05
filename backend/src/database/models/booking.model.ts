import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    itinerary: {
      type: Schema.Types.ObjectId,
      ref: 'itinerary',
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'attended', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model('booking', bookingSchema);

export { bookingSchema, Booking };
