import type { ActivityType } from "./Activity.types";
import type { CategoryType } from "./Category.types";
import type { LocationType } from "./Location.types";
import type { TagType } from "./Tag.types";

export interface AccessibilityType {
  _id: string;
  wheelchairAccessible: boolean;
  assistiveHearingDevices: boolean;
  visualAidSupport: boolean;
  serviceAnimalAllowed: boolean;
  accessibleParking: boolean;
}

export interface ItineraryType {
  _id: string;
  name: string;
  category: CategoryType;
  active: boolean;
  tags: TagType[];
  activities: {_id: string; activity: ActivityType; duration: number }[];
  locations: LocationType[];
  average_rating: number;
  timeline: string;
  language: string;
  price: number;
  available_datetimes: string[];
  accessibility: AccessibilityType;
  pick_up_location: LocationType;
  drop_off_location: LocationType;
  bookingOpen: boolean;
  flagged: boolean;
}
