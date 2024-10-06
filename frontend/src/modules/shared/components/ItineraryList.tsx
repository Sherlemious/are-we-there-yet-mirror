interface Activity {
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  tags: string[];
  discount: string;
  bookingOpen: boolean;
}

const activities: Activity[] = [
  {
    date: '2021/09/01',
    time: '10:00',
    location: 'Cairo, Egypt',
    price: '100',
    category: 'Sport',
    tags: ['football', 'soccer'],
    discount: '10%',
    bookingOpen: true,
  },
  {
    date: '2021/10/05',
    time: '14:00',
    location: 'London, UK',
    price: '150',
    category: 'Concert',
    tags: ['music', 'live'],
    discount: '15%',
    bookingOpen: false,
  },
  {
    date: '2021/11/12',
    time: '18:30',
    location: 'Paris, France',
    price: '200',
    category: 'Theater',
    tags: ['drama', 'performance'],
    discount: '20%',
    bookingOpen: true,
  },
  {
    date: '2022/01/15',
    time: '09:00',
    location: 'New York, USA',
    price: '120',
    category: 'Workshop',
    tags: ['art', 'painting'],
    discount: '5%',
    bookingOpen: true,
  },
  {
    date: '2022/03/20',
    time: '16:00',
    location: 'Tokyo, Japan',
    price: '300',
    category: 'Festival',
    tags: ['culture', 'food'],
    discount: '25%',
    bookingOpen: false,
  },
  {
    date: '2022/05/10',
    time: '11:00',
    location: 'Sydney, Australia',
    price: '180',
    category: 'Exhibition',
    tags: ['art', 'sculpture'],
    discount: '0%',
    bookingOpen: true,
  },
  {
    date: '2022/07/08',
    time: '20:00',
    location: 'Berlin, Germany',
    price: '250',
    category: 'Sport',
    tags: ['tennis', 'competition'],
    discount: '10%',
    bookingOpen: false,
  },
  {
    date: '2022/08/12',
    time: '13:30',
    location: 'Dubai, UAE',
    price: '220',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    discount: '30%',
    bookingOpen: true,
  },
  {
    date: '2022/10/25',
    time: '17:00',
    location: 'Rome, Italy',
    price: '170',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    discount: '12%',
    bookingOpen: true,
  },
  {
    date: '2022/12/05',
    time: '15:00',
    location: 'Bangkok, Thailand',
    price: '90',
    category: 'Tour',
    tags: ['sightseeing', 'adventure'],
    discount: '20%',
    bookingOpen: false,
  },
];

interface Itinerary {
  name: string;
  category: string;
  tags: string[];
  activities: Activity[];
  location: string;
  language: string;
  price: string;
  availableDateTimes: {
    date: string;
    time: string;
  }[];
  accessibilities: boolean;
  pickupLocation: string;
  dropoffLocation: string;
}

const data: Itinerary[] = [
  {
    name: 'Itinerary 1',
    category: 'Sport',
    tags: ['football', 'soccer'],
    activities: [activities[0], activities[1], activities[2]],
    location: 'Cairo, Egypt',
    language: 'English',
    price: '450',
    availableDateTimes: [
      {
        date: '2021/09/01',
        time: '10:00',
      },
      {
        date: '2021/10/05',
        time: '14:00',
      },
      {
        date: '2021/11/12',
        time: '18:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Cairo International Airport',
    dropoffLocation: 'Cairo International Airport',
  },
  {
    name: 'Itinerary 2',
    category: 'Workshop',
    tags: ['art', 'painting'],
    activities: [],
    location: 'New York, USA',
    language: 'English',
    price: '300',
    availableDateTimes: [
      {
        date: '2022/01/15',
        time: '09:00',
      },
      {
        date: '2022/05/10',
        time: '11:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'JFK Airport',
    dropoffLocation: 'Times Square',
  },
  {
    name: 'Itinerary 3',
    category: 'Festival',
    tags: ['culture', 'food'],
    activities: [activities[4], activities[6]],
    location: 'Tokyo, Japan',
    language: 'Japanese',
    price: '550',
    availableDateTimes: [
      {
        date: '2022/03/20',
        time: '16:00',
      },
      {
        date: '2022/07/08',
        time: '20:00',
      },
    ],
    accessibilities: false,
    pickupLocation: 'Tokyo Narita Airport',
    dropoffLocation: 'Shibuya Crossing',
  },
  {
    name: 'Itinerary 4',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    activities: [activities[7]],
    location: 'Dubai, UAE',
    language: 'English',
    price: '700',
    availableDateTimes: [
      {
        date: '2022/08/12',
        time: '13:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Dubai International Airport',
    dropoffLocation: 'Dubai Mall',
  },
  {
    name: 'Itinerary 5',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    activities: [activities[8], activities[9]],
    location: 'Rome, Italy',
    language: 'Italian',
    price: '400',
    availableDateTimes: [
      {
        date: '2022/10/25',
        time: '17:00',
      },
      {
        date: '2022/12/05',
        time: '15:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Rome Fiumicino Airport',
    dropoffLocation: 'Colosseum',
  },
  {
    name: 'Itinerary 1',
    category: 'Sport',
    tags: ['football', 'soccer'],
    activities: [activities[0], activities[1], activities[2]],
    location: 'Cairo, Egypt',
    language: 'English',
    price: '450',
    availableDateTimes: [
      {
        date: '2021/09/01',
        time: '10:00',
      },
      {
        date: '2021/10/05',
        time: '14:00',
      },
      {
        date: '2021/11/12',
        time: '18:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Cairo International Airport',
    dropoffLocation: 'Cairo International Airport',
  },
  {
    name: 'Itinerary 2',
    category: 'Workshop',
    tags: ['art', 'painting'],
    activities: [activities[3], activities[5]],
    location: 'New York, USA',
    language: 'English',
    price: '300',
    availableDateTimes: [
      {
        date: '2022/01/15',
        time: '09:00',
      },
      {
        date: '2022/05/10',
        time: '11:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'JFK Airport',
    dropoffLocation: 'Times Square',
  },
  {
    name: 'Itinerary 3',
    category: 'Festival',
    tags: ['culture', 'food'],
    activities: [activities[4], activities[6]],
    location: 'Tokyo, Japan',
    language: 'Japanese',
    price: '550',
    availableDateTimes: [
      {
        date: '2022/03/20',
        time: '16:00',
      },
      {
        date: '2022/07/08',
        time: '20:00',
      },
    ],
    accessibilities: false,
    pickupLocation: 'Tokyo Narita Airport',
    dropoffLocation: 'Shibuya Crossing',
  },
  {
    name: 'Itinerary 4',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    activities: [activities[7]],
    location: 'Dubai, UAE',
    language: 'English',
    price: '700',
    availableDateTimes: [
      {
        date: '2022/08/12',
        time: '13:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Dubai International Airport',
    dropoffLocation: 'Dubai Mall',
  },
  {
    name: 'Itinerary 5',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    activities: [activities[8], activities[9]],
    location: 'Rome, Italy',
    language: 'Italian',
    price: '400',
    availableDateTimes: [
      {
        date: '2022/10/25',
        time: '17:00',
      },
      {
        date: '2022/12/05',
        time: '15:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Rome Fiumicino Airport',
    dropoffLocation: 'Colosseum',
  },
  {
    name: 'Itinerary 1',
    category: 'Sport',
    tags: ['football', 'soccer'],
    activities: [activities[0], activities[1], activities[2]],
    location: 'Cairo, Egypt',
    language: 'English',
    price: '450',
    availableDateTimes: [
      {
        date: '2021/09/01',
        time: '10:00',
      },
      {
        date: '2021/10/05',
        time: '14:00',
      },
      {
        date: '2021/11/12',
        time: '18:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Cairo International Airport',
    dropoffLocation: 'Cairo International Airport',
  },
  {
    name: 'Itinerary 2',
    category: 'Workshop',
    tags: ['art', 'painting'],
    activities: [activities[3], activities[5]],
    location: 'New York, USA',
    language: 'English',
    price: '300',
    availableDateTimes: [
      {
        date: '2022/01/15',
        time: '09:00',
      },
      {
        date: '2022/05/10',
        time: '11:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'JFK Airport',
    dropoffLocation: 'Times Square',
  },
  {
    name: 'Itinerary 3',
    category: 'Festival',
    tags: ['culture', 'food'],
    activities: [activities[4], activities[6]],
    location: 'Tokyo, Japan',
    language: 'Japanese',
    price: '550',
    availableDateTimes: [
      {
        date: '2022/03/20',
        time: '16:00',
      },
      {
        date: '2022/07/08',
        time: '20:00',
      },
    ],
    accessibilities: false,
    pickupLocation: 'Tokyo Narita Airport',
    dropoffLocation: 'Shibuya Crossing',
  },
  {
    name: 'Itinerary 4',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    activities: [activities[7]],
    location: 'Dubai, UAE',
    language: 'English',
    price: '700',
    availableDateTimes: [
      {
        date: '2022/08/12',
        time: '13:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Dubai International Airport',
    dropoffLocation: 'Dubai Mall',
  },
  {
    name: 'Itinerary 5',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    activities: [activities[8], activities[9]],
    location: 'Rome, Italy',
    language: 'Italian',
    price: '400',
    availableDateTimes: [
      {
        date: '2022/10/25',
        time: '17:00',
      },
      {
        date: '2022/12/05',
        time: '15:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Rome Fiumicino Airport',
    dropoffLocation: 'Colosseum',
  },
  {
    name: 'Itinerary 1',
    category: 'Sport',
    tags: ['football', 'soccer'],
    activities: [activities[0], activities[1], activities[2]],
    location: 'Cairo, Egypt',
    language: 'English',
    price: '450',
    availableDateTimes: [
      {
        date: '2021/09/01',
        time: '10:00',
      },
      {
        date: '2021/10/05',
        time: '14:00',
      },
      {
        date: '2021/11/12',
        time: '18:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Cairo International Airport',
    dropoffLocation: 'Cairo International Airport',
  },
  {
    name: 'Itinerary 2',
    category: 'Workshop',
    tags: ['art', 'painting'],
    activities: [activities[3], activities[5]],
    location: 'New York, USA',
    language: 'English',
    price: '300',
    availableDateTimes: [
      {
        date: '2022/01/15',
        time: '09:00',
      },
      {
        date: '2022/05/10',
        time: '11:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'JFK Airport',
    dropoffLocation: 'Times Square',
  },
  {
    name: 'Itinerary 3',
    category: 'Festival',
    tags: ['culture', 'food'],
    activities: [activities[4], activities[6]],
    location: 'Tokyo, Japan',
    language: 'Japanese',
    price: '550',
    availableDateTimes: [
      {
        date: '2022/03/20',
        time: '16:00',
      },
      {
        date: '2022/07/08',
        time: '20:00',
      },
    ],
    accessibilities: false,
    pickupLocation: 'Tokyo Narita Airport',
    dropoffLocation: 'Shibuya Crossing',
  },
  {
    name: 'Itinerary 4',
    category: 'Conference',
    tags: ['tech', 'innovation'],
    activities: [activities[7]],
    location: 'Dubai, UAE',
    language: 'English',
    price: '700',
    availableDateTimes: [
      {
        date: '2022/08/12',
        time: '13:30',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Dubai International Airport',
    dropoffLocation: 'Dubai Mall',
  },
  {
    name: 'Itinerary 5',
    category: 'Food & Drink',
    tags: ['wine', 'tasting'],
    activities: [activities[8], activities[9]],
    location: 'Rome, Italy',
    language: 'Italian',
    price: '400',
    availableDateTimes: [
      {
        date: '2022/10/25',
        time: '17:00',
      },
      {
        date: '2022/12/05',
        time: '15:00',
      },
    ],
    accessibilities: true,
    pickupLocation: 'Rome Fiumicino Airport',
    dropoffLocation: 'Colosseum',
  },
];

function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  const formatDateTime = (date: string, time: string) => {
    return `${date.split('/')[2]}/${date.split('/')[1]} ${time}`;
  };
  const formatLocation = (location: string) => {
    const maxLength = 12;
    if (location.length > maxLength) {
      return `${location.substring(0, maxLength)}...`;
    }
    return location;
  };
  const formatActivity = (activity: Activity) => {
    return `${formatDateTime(activity.date, activity.time)} - ${formatLocation(activity.location)}`;
  };

  return (
    <div className="w-full h-full border-black border-2">
      {/* Itinerary name */}
      <div className="text-center font-bold p-2">{itinerary.name}</div>
      {/* a vertical list of activities showing only a shortend datetime `day/month time` and the location with a max of 3 activities */}
      <div className="grid grid-rows-auto gap-2 p-4 pt-0">
        {
          itinerary.activities.length !== 0 ? (
            itinerary.activities.slice(0, 3).map((activity, index) => (
              <div className="text-center" key={index}>
                {formatActivity(activity)}
              </div>
            ))
          ) : (
            <div className="text-center">No activities</div>
          )
        }
      </div>
    </div>
  );
}

export function ItineraryList() {
  // return fake data
  return (
    <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
      {data.map((itinerary) => (
        <ItineraryCard itinerary={itinerary} />
      ))}
    </div>
  );
}
