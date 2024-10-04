import { ActivityType } from './Activity.types';
import { LocationType } from './Location.types';
import { TagType } from './Tag.types';

export interface ItineraryType {
  name: string;
  category: string;
  tags: TagType[];
  activities: ActivityType[];
  locations: LocationType[];
  timeline: string;
  language: string;
  price: number;
  available_datetimes: Date[];
  accessibility: boolean;
  pick_up_location: LocationType;
  drop_off_location: LocationType;
}
