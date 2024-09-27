export interface ItineraryType {
  name: string;
  category: string;
  tags: string[];
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

interface LocationType {
  name: string;
  latitude: number;
  longitude: number;
}
