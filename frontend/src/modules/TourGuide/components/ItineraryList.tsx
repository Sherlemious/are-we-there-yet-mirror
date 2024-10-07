import { useState, useEffect } from 'react';

interface Activity {
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

interface Itinerary {
  id: string;
  name: string;
  category: string;
  tags: string[];
  activities: Activity[];
  locations: string[];
  language: string;
  timeline: string;
  price: string;
  availableDateTimes: {
    date: string;
    time: string;
  }[];
  accessibilities: boolean;
  pickupLocation: string;
  dropoffLocation: string;
}

function useDeleteMyItinerary() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItinerary = async (itineraryId: string) => {
    setLoading(true);
    setError(null);

    const baseUrl = 'https://are-we-there-yet-mirror.onrender.com/api';
    const url = `${baseUrl}/itineraries/${itineraryId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete itinerary');
      }

      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  return { deleteItinerary, loading, error };
}

function useGetMyItineraries() {
  // init the states
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // init the url
    const userId = '6702970588d93fa6bce6432b';
    const baseUrl = 'https://are-we-there-yet-mirror.onrender.com/api';
    const url = `${baseUrl}/itineraries/created_by/${userId}`;

    // main logic
    try {
      // fetch the data
      const response = await fetch(url, {
        method: 'GET',
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // parse the response
      const parsedData = await response.json();
      console.log('Fetched Data:', parsedData);

      // format the data
      const tempData: Itinerary[] = parsedData.data.itineraries.map((item: any) => {
        const name = item.name ?? 'N/A';
        const category = item.category ?? 'N/A';
        const tags = item.tags ? item.tags.map((tag: { name: string }) => tag.name) : [];
        const activities = item.activities ? item.activities.map((activity: Activity) => {
          return {
            duration: activity.duration ?? 'N/A',
            date: activity.date ?? 'N/A',
            time: activity.time ?? 'N/A',
            location: activity.location ?? 'N/A',
            price: activity.price ?? 'N/A',
            category: activity.category ?? 'N/A',
            tags: activity.tags ?? [],
            discount: activity.discount ?? 'N/A',
            bookingOpen: activity.bookingOpen ?? false,
          };
        }) : [];
        const language = item.language ?? 'N/A';
        const locations = item.locations ? item.locations.map((location: { name: string }) => location.name) : [];
        const price = item.price ?? 'N/A';
        const timeline = item.timeline ?? 'N/A';
        const availableDateTimes = item.available_datetimes ? item.available_datetimes.map((dateTime: string) => {
          return formatDateTime(dateTime);
        }) : [];
        const accessibilities = item.accessibility ?? false;
        const pickupLocation = item.pick_up_location?.name ?? 'N/A';
        const dropoffLocation = item.drop_off_location?.name ?? 'N/A';
        return {
          id: item._id, // Assuming the ID is stored in _id
          name,
          category,
          timeline,
          tags,
          activities,
          locations,
          language,
          price,
          availableDateTimes,
          accessibilities,
          pickupLocation,
          dropoffLocation,
        };
      });

      // set the data
      setData(tempData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  // fetch the data
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
}

// helper functions
const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`,
  };
};
const formatLocation = (location: string) => {
  const maxLength = 25;
  if (location.length > maxLength) {
    return `${location.substring(0, maxLength)}...`;
  }
  return location;
};

const formatTimeline = (timeline: string) => {
  const [start, end] = timeline.split(' - ');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end).split(' ')[1]; // Only take the time part for the end

  return `${formattedStart} - ${formattedEnd}`;
};
const formatActivity = (activity: Activity) => {
  return `${activity.duration} min - ${formatLocation(activity.location)}`;
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

  // Combine activities and locations
  const combinedData = itinerary.activities.map((activity, index) => ({
    ...activity,
    location: itinerary.locations[index] || 'N/A',
    timeline: itinerary.timeline || 'N/A', // Add timeline to each activity
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={modalOverlayStyle}>
      <div className="w-full max-w-[90vw] h-auto border-black border-2 bg-white p-4 relative" style={modalContentStyle}>
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
              {combinedData.length !== 0 ? (
                /* show a table with all the activities in it the columns are DateTime (formatted), Location (formatted), Duration*/
                <table className="w-full border-collapse border-2 text-sm">
                  <thead>
                    <tr className="border-b-2 text-center">
                      <th className="p-4 w-1/3">Timeline</th>
                      <th className="p-4 w-1/3">Location</th>
                      <th className="p-4 w-1/3">Duration (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinedData.map((activity, index) => (
                      <tr key={index} className="border-b-2 text-center">
                        <td className="p-4">{formatTimeline(activity.timeline)}</td>
                        <td className="p-4">{formatLocation(activity.location)}</td>
                        <td className="p-4">{activity.duration}</td>
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
                <table className="w-full border-collapse border-2 text-sm">
                  <thead>
                    <tr className="border-b-2 text-center">
                      <th className="p-4">Date</th>
                      <th className="p-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itinerary.availableDateTimes.map((dateTime, index) => (
                      <tr key={index} className="border-b-2 text-center">
                        <td className="p-4">{dateTime.date}</td>
                        <td className="p-4">{dateTime.time}</td>
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

function ItineraryCard({ itinerary, onCardClick, onDeleteClick }: { itinerary: Itinerary; onCardClick: () => void; onDeleteClick: () => void }) {
  const combinedData = itinerary.activities.map((activity, index) => ({
    ...activity,
    location: itinerary.locations[index] || 'N/A',
    timeline: itinerary.timeline || 'N/A', // Add timeline to each activity
  }));
  return (
    <div className="w-full h-full border-black border-2 relative" onClick={onCardClick}>
      {/* Minus button */}
      <button onClick={(e) => { e.stopPropagation(); onDeleteClick(); }} className="absolute top-2 right-2 text-xl font-bold bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
        -
      </button>
      {/* Itinerary name */}
      <div className="text-center font-bold p-2">{itinerary.name}</div>
      {/* a vertical list of activities showing only a shortend duration and the location with a max of 3 activities */}
      <div className="grid grid-rows-auto gap-2 p-4 pt-0">
        {itinerary.activities.length !== 0 ? (
          combinedData.slice(0, 3).map((activity, index) => (
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
  const { data, loading, error, fetchData } = useGetMyItineraries();
  const { deleteItinerary, loading: deleteLoading, error: deleteError } = useDeleteMyItinerary();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);

  const handleCardClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
  };

  const handleDeleteClick = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
    // Refresh the itineraries list after deletion
    fetchData();
  };

  if (loading || deleteLoading) {
    return <div>Loading...</div>;
  }

  if (error || deleteError) {
    return <div>Error: {error || deleteError}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
        {data.map((itinerary, index) => (
          <ItineraryCard
            itinerary={itinerary}
            key={index}
            onCardClick={() => handleCardClick(itinerary)}
            onDeleteClick={() => handleDeleteClick(itinerary.id)}
          />
        ))}
      </div>
      {selectedItinerary && <ItineraryModal itinerary={selectedItinerary} onClose={handleCloseModal} />}
    </>
  );
}