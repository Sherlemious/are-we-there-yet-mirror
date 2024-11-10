export enum AccountType {
  None = "None",
  Admin = "Admin",
  Tourist = "Tourist",
  Advertiser = "Advertiser",
  TourGuide = "TourGuide",
  Seller = "Seller",
  TourismGovernor = "TourismGovernor",
}

export interface UserType {
  _id: string;
  password: string;
  username: string;
  account_type: AccountType;
  email?: string;
  dob?: string;
  mobile_number?: string;
  job?: string;
  name?: string;
  nationality?: string;
  accepted: boolean;
  rejected: boolean;
  deletionRequested: boolean;
  termsAndConditions: boolean;
  attachments?: {
    _id: string;
    original_name: string;
    url: string;
  }[];
  profile_pic?: {
    _id: string;
    url: string;
  };
  // Tour guide
  years_of_experience?: number;
  previous_work?: string[];
  average_rating?: number;
  // Advertiser
  website?: string;
  hotline?: string;
  company_profile?: string[];
  // Seller
  description?: string;
  // Tourist
  preferences?: string[];
  loyalty_points?: number;
  wallet?: number;
  itinerary_bookings?: string[];
  activity_bookings?: string[];
}
