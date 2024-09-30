import { LocationType } from "./Location.types";
import { TagType } from "./Tag.types";
export interface MuseumType {
    id: number;
    name: string;
    tags: TagType[];
    description: string;
    pictures: string[];
    location: LocationType;
    opening_hours: string;
    ticket_prices: {
      foreigner: number;
      native: number;
      student: number;
  };
  }
  