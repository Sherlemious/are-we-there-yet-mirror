export interface Activity {
  _id: string;         // The unique ID for each profile (assigned by the backend)
  date: string;        // The date the profile was created
  time: string;        // The time the profile was created
  location: string;    // The location of the profile
  price: string;       // The price of the profile
  category: string;    // The category of the profile
  tags: string;        // The tags of the profile
  specialDiscount: string; // The special discount of the profile
  booking: string;     // The booking of the profile
}