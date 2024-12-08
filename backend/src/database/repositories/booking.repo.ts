import { BookingStatusType } from '../../types/Booking.types';
import { PaymentMethodType } from '../../types/Order.types';
import { Booking } from '../models/booking.model';
import { User } from '../models/user.model';

class BookingRepo {
  async bookItinerary(userId: string, itineraryId: string, payment_method: PaymentMethodType) {
    const booking = await Booking.create({ user: userId, itinerary: itineraryId, payment_method });
    await User.findByIdAndUpdate(userId, { $push: { itinerary_bookings: booking._id } });

    return booking;
  }

  async bookActivity(userId: string, activityId: string, payment_method: PaymentMethodType) {
    const booking = await Booking.create({ user: userId, activity: activityId, payment_method });
    await User.findByIdAndUpdate(userId, { $push: { activity_bookings: booking._id } });

    return booking;
  }

  async cancelBooking(bookingId: string) {
    return await Booking.findByIdAndUpdate(bookingId, { status: BookingStatusType.CANCELLED });
  }

  async checkItineraryBooked(itineraryId: string): Promise<boolean> {
    const booking = await Booking.find({ itinerary: itineraryId });

    return booking.length > 0;
  }
}

export default new BookingRepo();
