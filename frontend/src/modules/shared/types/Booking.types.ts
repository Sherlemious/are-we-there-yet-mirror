import { ActivityType } from './Activity.types';
import { ItineraryType } from './Itinerary.types';
import { UserType } from './User.types';
import { ObjectId } from 'mongodb';
import { PaymentMethodType } from './Order.types';

export interface BookingType {
  user: ObjectId | UserType;
  itinerary?: ObjectId | ItineraryType;
  activity?: ObjectId | ActivityType;
  status: BookingStatusType;
  payment_method: PaymentMethodType;
  created_at: Date;
  updated_at: Date;
}

export enum BookingStatusType {
  PAID = 'paid',
  CANCELLED = 'cancelled',
  ATTENDED = 'attended',
}
