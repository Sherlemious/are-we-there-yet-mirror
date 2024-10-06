import { useState, useEffect } from 'react';

// data
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

// helper functions
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

// main components
function ItineraryModal({ itinerary, onClose }: { itinerary: Itinerary; onClose: () => void }) {
  // states for the animation
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // handle the close button
  useEffect(() => {
    // Trigger opening animation when component mounts
    setIsVisible(true);
  }, []);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300); // Match timeout to the animation duration
  };

  // Animation styles
  const modalOverlayStyle = {
    transition: 'opacity 0.3s ease-in-out',
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  const modalContentStyle = {
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    transform: isVisible && !isClosing ? 'scale(1)' : 'scale(0.95)',
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={modalOverlayStyle}>
      <div className="w-full max-w-[80vw] h-auto border-black border-2 bg-white p-4 relative" style={modalContentStyle}>
        {/* Close button */}
        <button onClick={handleModalClose} className="absolute top-2 right-2 text-xl font-bold m-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          {/* Itinerary name */}
          <div className="text-left font-bold text-xl w-fit my-8">
            {itinerary.name}
            {/* add an underline */}
            <div className="border-b-2 border-black"></div>
          </div>
          {/* Itinerary details */}
          <div className="grid grid-cols-3 gap-8 mx-8 mb-8">
            {/* random info*/}
            <div className="grid grid-cols-2 grid-rows-auto gap-4">
              <div className="col-span-1>">
                <div className="font-bold text-lg">Language</div>
                <div>{itinerary.language}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Price</div>
                <div>{itinerary.price}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Dropoff Location</div>
                <div>{itinerary.dropoffLocation}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Pickup Location</div>
                <div>{itinerary.pickupLocation}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Accessibilities</div>
                <div>{itinerary.accessibilities ? 'Yes' : 'No'}</div>
              </div>
            </div>
            {/* Activities */}
            <div>
              <div className="font-bold text-lg">Activities</div>
              {itinerary.activities.length !== 0 ? (
                /* show a table with all the activities in it the columns are DateTime (formatted), Location (formatted), Price*/
                <table className="w-full border-collapse border-2">
                  <thead>
                    <tr className="border-b-2 text-left">
                      <th>DateTime</th>
                      <th>Location</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itinerary.activities.map((activity, index) => (
                      <tr key={index} className="border-b-2 text-left">
                        <td>{formatDateTime(activity.date, activity.time)}</td>
                        <td>{formatLocation(activity.location)}</td>
                        <td>{activity.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-left">No activities</div>
              )}
            </div>
            {/* Date and Time */}
            <div>
              <div className="font-bold text-lg">Date & Time</div>
              {itinerary.availableDateTimes.length !== 0 ? (
                // show a table with all the available date and time the columns are Date (formatted), Time (formatted)
                <table className="w-full border-collapse border-2">
                  <thead>
                    <tr className="border-b-2 text-left">
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itinerary.availableDateTimes.map((dateTime, index) => (
                      <tr key={index} className="border-b-2 text-left">
                        <td>{dateTime.date}</td>
                        <td>{dateTime.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No available date and time</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryCard({ itinerary, onCardClick }: { itinerary: Itinerary; onCardClick: () => void }) {
  return (
    <div className="w-full h-full border-black border-2" onClick={onCardClick}>
      {/* Itinerary name */}
      <div className="text-center font-bold p-2">{itinerary.name}</div>
      {/* a vertical list of activities showing only a shortend datetime `day/month time` and the location with a max of 3 activities */}
      <div className="grid grid-rows-auto gap-2 p-4 pt-0">
        {itinerary.activities.length !== 0 ? (
          itinerary.activities.slice(0, 3).map((activity, index) => (
            <div className="text-center" key={index}>
              {formatActivity(activity)}
            </div>
          ))
        ) : (
          <div className="text-center">No activities</div>
        )}
      </div>
    </div>
  );
}

export function ItineraryList() {
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const handleCardClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
  };
  const handleCloseModal = () => {
    setSelectedItinerary(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
        {data.map((itinerary, index) => (
          <ItineraryCard itinerary={itinerary} key={index} onCardClick={() => handleCardClick(itinerary)} />
        ))}
      </div>
      {selectedItinerary && <ItineraryModal itinerary={selectedItinerary} onClose={handleCloseModal} />};
    </>
  );
}
