export interface Activity {
  _id: string; // The unique ID for each profile (assigned by the backend)
  datetime: string; // The date and time of the profile
  location: {
    lat: number; // The latitude of the profile
    lng: number; // The longitude of the profile
    name: string; // The name of the profile
  }; // The location of the profile
  price: string; // The price of the profile
  category: {
    _id: string; // The unique ID for each category
    name: string; // The name of the
    createdAt: string; // The creation date of the category
    updatedAt: string; // The update date of the category
  };
  tags: {
    _id: string; // The unique ID for each tag
    name: string; // The name of the tag
    type: string; // The type of the tag
    historical_period: string; // The historical period of the tag
    createdAt: string; // The creation date of the tag
    updatedAt: string; // The update
  }[];
  specialDiscounts: number; // The special discount of the profile
  bookingOpen: string; // The booking of the profile
  createdAt: string; // The creation date of the profile
  updatedAt: string; // The update date of the profile
}
