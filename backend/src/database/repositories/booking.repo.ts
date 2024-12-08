import { BookingStatusType } from '../../types/Booking.types';
import { PaymentMethodType } from '../../types/Order.types';
import { Booking } from '../models/booking.model';
import { ObjectId } from 'mongodb';
import { User } from '../models/user.model';
import { Itinerary } from '../models/itinerary.model';
import { Activity } from '../models/activity.model';

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

  async getNumberOfBookingsItinerary(itineraryId: string) {
    // Update the Itinerary sales and revenue
    const bookings = await Booking.find({ itinerary: itineraryId });
    await Itinerary.findByIdAndUpdate(itineraryId, { sales: bookings.length });
    return bookings.length;
  }

  async getNumberOfBookingsActivity(activityId: string) {
    // Update the Activity sales and revenue
    const bookings = await Booking.find({ activity: activityId });
    await Activity.findByIdAndUpdate(activityId, { sales: bookings.length });
    return bookings.length;
  }

  async checkItineraryBooked(itineraryId: string): Promise<boolean> {
    const booking = await Booking.find({ itinerary: itineraryId });

    return booking.length > 0;
  }
}

export default new BookingRepo();
