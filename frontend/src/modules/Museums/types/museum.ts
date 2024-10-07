export interface Museum {
    _id: string;
    name: string;
    tags: string[];
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
  