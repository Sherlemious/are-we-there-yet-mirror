import { TagType } from "@/modules/shared/types/Tag.types";

export interface Location {
    name: string;
    latitude: number;
    longitude: number;
  }
  export interface Tag {
    id: string;
    name: string;
  }
  
  export interface Activity {
    _id: string; 
    name: string;
    duration: string;
    date: string;
    time: string;
    location: string;
    price: string;
    category: string;
    tags: string[];
    discount: string;
    bookingOpen: boolean;
  }
  
  export interface Itinerary {
    created_by: string;
    active: boolean;
    flagged: boolean;
    id: string;
    name: string;
    category: string;
    tags: string[];
    tagIds: Tag[];
    selectedTags: TagType[];
    activityIds: string[];
    activities: Activity[];
    locations: string[];
    language: string;
    timeline: string;
    price: string;
    available_datetimes: string[];
    availableDateTimes2: string[];
    availableDateTimes: {
      date: string;
      time: string;
    }[];
    accessibility: AccessibilityType;
    accessibilities: AccessibilityType;
    pickupLocation: string;
    dropoffLocation: string;
    pick_up_location: Location;
    drop_off_location: Location;
  }
  
  export interface AccessibilityType {
    wheelchairAccessible: boolean;
    assistiveHearingDevices: boolean;
    visualAidSupport: boolean;
    serviceAnimalAllowed: boolean;
    accessibleParking: boolean;
  }