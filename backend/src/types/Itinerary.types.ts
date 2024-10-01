import { LocationType } from './Location.types';
import { TagType } from './Tag.types';

export interface ItineraryType {
  name: string;
  category: string;
  tags: TagType[];
  activities: string[];
  locations: LocationType[];
  timeline: string;
  language: string;
  price: number;
  available_datetimes: string[];
  accessibility: boolean;
  pick_up_location: LocationType;
  drop_off_location: LocationType;
}
