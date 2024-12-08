import { LocationType } from './Location.types';
import { TagType } from './Tag.types';

export interface ActivityType {
  name: String;
  datetime: Date;
  location: LocationType;
  price: number;
  category: String;
  tags: TagType[];
  specialDiscounts: Number;
  bookingOpen: boolean;
  created_by: String;
}

export interface ActivityRefType {
  activity: string;
  duration: number;
}
