import { LocationType } from './Location.types';
import { TagType } from './Tag.types';

export interface ActivityType {
  date: string;
  time: string;
  location: LocationType;
  price: number;
  category: string;
  tags: TagType[];
  specialDiscounts?: Number;
  bookingOpen: boolean;
}

export interface ActivityRefType {
  activity: string;
  duration: number;
}
