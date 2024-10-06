import { LocationType } from './Location.types';
import { TagType } from './Tag.types';
import { CategoryType } from './Category.types';

export interface ActivityType {
  date: string;
  time: string;
  location: LocationType;
  price: number;
  category: CategoryType;
  tags: TagType[];
  specialDiscounts: Number;
  bookingOpen: boolean;
}
