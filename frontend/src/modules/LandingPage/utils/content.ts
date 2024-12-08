export type NavBarContent = {
  [key: string]: {
    name: string;
    url?: string;
    list?: { name: string; url: string }[];
  }[];
};

export const TouristLinks = [
  {
    name: "All Products",
    url: "/home/all-products",
  },
  {
    name: "Bookings",
    list: [
      {
        name: "My Activities",
        url: "/home/activity-bookings",
      },
      {
        name: "My Itineraries",
        url: "/home/itinerary-bookings",
      },
      {
        name: "My Transportation",
        url: "/home/transportation-bookings",
      },
      {
        name: "Flights",
        url: "/home/flight-bookings",
      },
      {
        name: "Hotels",
        url: "/home/hotel-bookings",
      },
    ],
  },
  {
    name: "My History",
    url: "/home/history",
  },
  // {
  //   name: "Orders",
  //   list: [
  //     {
  //       name: "Current Orders",
  //       url: "/home/orders/current-orders",
  //     },
  //     {
  //       name: "Past Orders",
  //       url: "/home/orders/past-orders",
  //     },
  //   ],
  // },
];

export const AdvertiserLinks = [
  {
    name: "Activities",
    list: [
      {
        name: "All Activities",
        url: "/home/all-activities",
      },
      {
        name: "My Activities",
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
        name: "All Products",
        url: "/home/all-products",
      },
      {
        name: "My Products",
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
        name: "All Itineraries",
        url: "/home/all-itineraries",
      },
      {
        name: "My Itineraries",
        url: "/home/my-itineraries",
      },
    ],
  },
];

export const AdminLinks = [
  {
    name: "Activities",
    list: [
      {
        name: "All Activities",
        url: "/home/all-activities",
      },
      {
        name: "Manage Activities Categories",
        url: "/home/admin-dashboard/activity-categories",
      },
    ],
  },
  {
    name: "Products",
    list: [
      {
        name: "All Products",
        url: "/home/all-products",
      },
      {
        name: "Manage Products",
        url: "/home/admin-dashboard/my-products-admin",
      },
    ],
  },
  {
    name: "Itineraries",
    list: [
      {
        name: "All Itineraries",
        url: "/home/all-itineraries",
      },
      {
        name: "Manage itineraries",
        url: "/home/admin-dashboard/flag-itineraries",
      },
    ],
  },
];

export const TourismGovernorLinks = [
  {
    name: "Historical Places",
    list: [
      {
        name: "All Historical Places",
        url: "/home/all-museums",
      },
      { name: "My Historical Places", url: "/home/my-museums" },
      { name: "My Tags", url: "/home/my-tags" },
    ],
  },
];
