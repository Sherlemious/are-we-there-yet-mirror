export interface Museum {
    _id: string;
    name: string;
    tags: {
      _id: string;                // Unique identifier for the tag
      name: string;               // Name of the tag
      type: type;                // Type of the tag (using the defined enum)
      historical_period: string; // Historical period related to the tag
    }[]; // Using [] to indicate an array of objects
    description: string;
    category: string;
    pictures: string[];
    location: {
      name: string;
      latitude: number;
      longitude: number;
    };
    opening_hours: string;
    ticket_prices: {
      foreigner: number;
      native: number;
      student: number;
    };
  }
  
  export enum type {
    Museum = 'Museum',
    Monument = 'Monument',
    ReligiousSight = 'Religious Sight',
    Palace = 'Palace',
    Castle = 'Castle',
    Preference = 'Preference',
  }
  