import { Booking } from '../models/booking.model';
import { User } from '../models/user.model';

class BookingRepo {
  async bookItinerary(userId: string, itineraryId: string) {
    const booking = await Booking.create({ user: userId, itinerary: itineraryId });
    await User.findByIdAndUpdate(userId, { $push: { itinerary_bookings: booking._id } });

    return booking;
  }
}

export default new BookingRepo();
