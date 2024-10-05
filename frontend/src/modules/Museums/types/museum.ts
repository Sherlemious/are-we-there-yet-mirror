export interface Museum {
  _id: string;
  name: string;
  tags: TagType[];
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

export interface LocationType {
    name: string;
    latitude: number;
    longitude: number;
  }

  export interface TagType {
    _id: string;
    name: string;
    type: type;
    historical_period: string;
  }
  export enum type {
    Museum = 'Museum',
    Monument = 'Monument',
    ReligiousSight = 'Religious Sight',
    Palace = 'Palace',
    Castle = 'Castle',
    Preference = 'Preference',
  }