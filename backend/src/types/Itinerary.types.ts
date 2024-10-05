import { ActivityRefType } from './Activity.types';
import { LocationType } from './Location.types';

export interface ItineraryType {
  name: string;
  category: string;
  tags: String[];
  activities: ActivityRefType[];
  locations: LocationType[];
  timeline: string;
  language: string;
  price: number;
  available_datetimes: Date[];
  accessibility: boolean;
  pick_up_location: LocationType;
  drop_off_location: LocationType;
}
