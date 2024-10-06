import { LocationType } from './Location.types';
import { TagType } from './Tag.types';
import { CategoryType } from './Category.types';

export interface ActivityType {
  date: Date;
  location: LocationType;
  price: number;
  category: CategoryType;
  tags: TagType[];
  specialDiscounts: Number;
  bookingOpen: boolean;
}
