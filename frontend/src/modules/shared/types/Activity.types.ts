import { CategoryType } from "./Category.types";
import { LocationType } from "./Location.types";
import { TagType } from "./Tag.types";

export interface ActivityType {
  _id: string;
  name: string;
  datetime: string;
  location: LocationType;
  price: number;
  category: CategoryType;
  tags: TagType[];
  specialDiscounts: number;
  bookingOpen: boolean;
  created_by: string;
}

export interface ActivityRefType {
  activity: string;
  duration: number;
}
