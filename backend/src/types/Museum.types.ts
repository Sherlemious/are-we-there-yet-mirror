import { LocationType } from "./Location.types";
export interface MuseumType {
    id: number;
    name: string;
    description: string;
    pictures: string[];
    location: LocationType;
    opening_hours: string;
    ticket_prices: number;
  }
  