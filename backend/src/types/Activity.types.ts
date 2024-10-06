import { LocationType } from './Location.types';
import { TagType } from './Tag.types';

export interface ActivityType {
  datetime: Date;
  location: LocationType;
  price: number;
  category: String;
  tags: TagType[];
  specialDiscounts: Number;
  bookingOpen: boolean;
}

export interface ActivityRefType {
  activity: string;
  duration: number;
}
