import { model, Schema } from 'mongoose';
import { BookingStatusType } from '../../types/Booking.types';
import { PaymentMethodType } from '../../types/Order.types';

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
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'activity',
    },
    status: {
      type: String,
      enum: Object.values(BookingStatusType),
      default: BookingStatusType.PAID,
    },
    payment_method: {
      type: String,
      required: true,
      enum: Object.values(PaymentMethodType),
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model('booking', bookingSchema);

export { bookingSchema, Booking };
