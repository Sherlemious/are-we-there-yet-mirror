import { useState, useEffect } from 'react';

function useGetMyItineraries() {
  // init some states
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the data
  useEffect(() => {
    const runner = async () => {
      // init the url
      const baseUrl = 'https://are-we-there-yet-mirror.onrender.com/api';
      const url = `${baseUrl}/itineraries/get/`;

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

        // format the data
        const tempData: Itinerary[] = await parsedData.data.itineraries.map((item) => {
          const name = item.name === null ? 'N/A' : item.name;
          const category = item.category === null ? 'N/A' : item.category;
          const tags = item.tags === null ? [] : item.tags.map((tag) => tag.name);
          let activities = [];
          activities = item.activities.map((activity) => {
            if (activity.activity === null) {
              return {
                date: 'N/A',
                time: 'N/A',
                location: 'N/A',
                price: 0,
              };
            }
            return {
              date: activity.activity.date,
              time: activity.activity.time,
              location: activity.activity.location.name,
              price: activity.price,
            };
          });
          const language = item.language === null ? 'N/A' : item.language;
          const price = item.price === null ? 'N/A' : item.price;
          const availableDateTimes = item.available_datetimes.map((date: string) => ({
            date: date,
            time: date,
          }));
          const accessibilities = item.accessibility;
          const pickupLocation = item.pick_up_location.name;
          const dropoffLocation = item.drop_off_location.name;
          return {
            name,
            category,
            tags,
            activities,
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
        setError(error.message);
        setLoading(false);
      }
    };
    runner();
  }, []);

  return { data, loading, error };
}

// helper functions
const formatDateTime = (date: string, time: string) => {
  if (date === 'N/A' || time === 'N/A') {
    return 'N/A';
  }
  const parsedDate = new Date(date);
  const parsedTime = new Date(time);
  const formattedDate = parsedDate.toLocaleDateString('en-GB');
  const formattedTime = parsedTime.toLocaleTimeString('en-GB');
  return `${formattedDate} ${formattedTime}`;
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
const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('en-GB');
};
const formatTime = (time: string) => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString('en-GB');
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
                        <td>{formatDate(dateTime.date)}</td>
                        <td>{formatTime(dateTime.time)}</td>
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

  // get the data
  const { data, loading, error } = useGetMyItineraries();

  return (
    <>
      {loading && <div className="text-center text-2xl font-bold">Loading...</div>}
      {error && <div className="text-center text-2xl font-bold text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
            {data.map((itinerary, index) => (
              <ItineraryCard itinerary={itinerary} key={index} onCardClick={() => handleCardClick(itinerary)} />
            ))}
          </div>
          {selectedItinerary && <ItineraryModal itinerary={selectedItinerary} onClose={handleCloseModal} />};
        </>
      )}
    </>
  );
}
