export interface Profile {
    _id: string;         // The unique ID for each profile (assigned by the backend)
    username: string;    // The username of the profile
    password: string;    // The password of the profile
    account_type: string; // The account type (e.g., seller, admin)
    email: string;       // The email of the profile
  }