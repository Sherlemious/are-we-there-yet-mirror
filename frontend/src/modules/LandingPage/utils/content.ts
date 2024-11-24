export type NavBarContent = {
  [key: string]: {
    name: string;
    url?: string;
    list?: { name: string; url: string }[];
  }[];
};

export const TouristLinks = [
  {
    name: "Products",
    url: "/home/all-products",
  },
  {
    name: "Bookings",
    list: [
      {
        name: "Activities",
        url: "/home/activity-bookings",
      },
      {
        name: "Itineraries",
        url: "/home/itinerary-bookings",
      },
      {
        name: "Transportation",
        url: "/home/transportation-bookings",
      },
    ],
  },
  {
    name: "History",
    url: "/home/history",
  },
  {
    name: "My Complaints",
    url: "/home/my-complaints",
  },
];

export const AdvertiserLinks = [
  {
    name: "Activities",
    list: [
      {
        name: "Browse All Activities",
        url: "/home/all-activities",
      },
      {
        name: "Browse My Activities",
        url: "/home/my-activities",
      },
    ],
  },
];

export const SellerLinks = [
  {
    name: "Products",
    list: [
      {
        name: "Browse All Products",
        url: "/home/all-products",
      },
      {
        name: "Browse My Products",
        url: "/home/my-products-seller",
      },
    ],
  },
];

export const TourGuideLinks = [
  {
    name: "Itineraries",
    list: [
      {
        name: "Browse All Itineraries",
        url: "/home/all-itineraries",
      },
      {
        name: "Browse My Itineraries",
        url: "/home/my-itineraries",
      },
    ],
  },
];

export const AdminLinks = [
  {
    name: "Manage activities category",
    url: "/home/admin-dashboard/activity-categories",
  },
  {
    name: "Manage itineraries",
    url: "/home/admin-dashboard/flag-itineraries",
  },
  {
    name: "Products",
    list: [
      {
        name: "Browse All Products",
        url: "/home/all-products",
      },
      {
        name: "Manage Products",
        url: "/home/admin-dashboard/my-products-admin",
      },
    ],
  },
  {
    name: "Manage Complaints",
    url: "/home/admin-dashboard/admin-complaints",
  },
];

export const TourismGovernorLinks = [
  {
    name: "Browse My Historical Places/Museums",
    url: "/home/my-museums",
  },
];

export const GuestLinks = [
  {
    name: "Historical Places/Museums",
    url: "/all-museums",
  },
];
