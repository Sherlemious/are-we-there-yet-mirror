interface Activity {
    _id: string;         // The unique ID for each profile (assigned by the backend)
    date: string;        // The date the profile was created
    time: string;        // The time the profile was created
    location: string;    // The location of the profile
    price: string;       // The price of the profile
    category: string;    // The category of the profile
    tags: string[];      // The tags of the profile
    specialDiscount: string; // The special discount of the profile
    booking: string;     // The booking of the profile
  }
export type Itinerary = {
    _id: string; 
    name: string;
    language: string;
    price: number;
    activities: Activity[];
    category: string;
    tags: string[];
    accessibility: boolean;
    pick_up_location: string;
    drop_off_location: string;
    // dates: { availableDate: string, availableTime: string }[];
    //activities: ActivityRefType[];
    //locations: LocationType[];
    //timeline: string;
    // available_datetimes: Date[];
  };
  