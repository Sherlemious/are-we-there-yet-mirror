import { LocationType } from './Location.types';
export interface MuseumType {
  id: number;
  name: string;
  tags: string[];
  description: string;
  category: string;
  pictures: string[];
  location: LocationType;
  opening_hours: string;
  ticket_prices: {
    foreigner: number;
    native: number;
    student: number;
  };
}
