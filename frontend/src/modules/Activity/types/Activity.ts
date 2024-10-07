export interface Category {
  _id: string; // The unique ID for each category
  name: string; // The name of the
  createdAt: string; // The creation date of the category
  updatedAt: string; // The update date of the category
}

export interface Tag {
  _id: string; // The unique ID for each tag
  name: string; // The name of the tag
  type: string; // The type of the tag
  historical_period: string; // The historical period of the tag
  createdAt: string; // The creation date of the tag
  updatedAt: string; // The update
}

export interface Activity {
  _id: string; // The unique ID for each profile (assigned by the backend)
  datetime: string; // The date and time of the profile
  location: {
    latitude: number; // The latitude of the profile
    longitude: number; // The longitude of the profile
    name: string; // The name of the profile
    address: string; // The address
  }; // The location of the profile
  price: string; // The price of the profile
  category?: Category;
  tags: Tag[];
  specialDiscounts: number; // The special discount of the profile
  bookingOpen: boolean; // The booking of the profile
  createdAt: string; // The creation date of the profile
  updatedAt: string; // The update date of the profile
}
