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
  picture?: string;
  profile_pic?: {
    url: string;
    _id: string;
  };
  name?: string;
  accepted?: boolean;
  nationality?: string;

  // Tour guide
  years_of_experience?: number;
  previous_work?: {
    title: string;
    employmentType: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    locationType: string;
    description: string;
    _id: string;
  }[];
  // Advertiser
  website?: string;
  hotline?: string;
  company_profile?: {
    industry: string;
    headquarters: string;
    specialties: string;
  };
  // Seller
  description?: string;
  // Tourist
  wallet?: number;
  loyaltyPoints?: number;
}
