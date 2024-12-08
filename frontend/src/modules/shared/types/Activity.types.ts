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
  average_rating: number;
  reviews: { _id: string; user: string; rating: number; comment: string }[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityRefType {
  activity: string;
  duration: number;
}
