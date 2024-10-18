import { useState, useEffect } from "react";
import CreateItineraryModal from "./CreateItineraryModal";
import { getActivities } from "./Api";

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
  id: string;
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
  id: string;
  name: string;
  category: string;
  tags: string[];
  tagIds: Tag[];
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
  accessibility: boolean;
  accessibilities: boolean;
  pickupLocation: string;
  dropoffLocation: string;
  pick_up_location: Location;
  drop_off_location: Location;
}

function useDeleteMyItinerary() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItinerary = async (itineraryId: string) => {
    setLoading(true);
    setError(null);

    const baseUrl = "https://are-we-there-yet-mirror.onrender.com/api";
    const url = `${baseUrl}/itineraries/${itineraryId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete itinerary");
      }

      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  return { deleteItinerary, loading, error };
}

function useCreateMyItinerary(activities: Activity[]) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createItinerary = async (newItinerary: Partial<Itinerary>) => {
    setLoading(true);
    setError(null);

    const baseUrl = "https://are-we-there-yet-mirror.onrender.com/api";
    const url = `${baseUrl}/itineraries`;

    try {
      const UUID = localStorage.getItem("UUID");
      newItinerary.created_by = UUID!;
      newItinerary.available_datetimes = newItinerary.availableDateTimes2;
      newItinerary.pick_up_location = {
        name: newItinerary.pickupLocation || "",
        latitude: 0,
        longitude: 0,
      };
      newItinerary.drop_off_location = {
        name: newItinerary.dropoffLocation || "",
        latitude: 0,
        longitude: 0,
      };
      newItinerary.accessibility = newItinerary.accessibilities;
      const ids = newItinerary.activityIds || [];
      newItinerary.locations = activities
        .filter((activity) => activity.id in ids)
        .map((activity) => activity.location);

      console.table(newItinerary);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItinerary),
      });

      if (!response.ok) {
        throw new Error("Failed to create itinerary");
      }

      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  return { createItinerary, loading, error };
}

function useGetMyItineraries() {
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const UUID = localStorage.getItem("UUID");
    const baseUrl = "https://are-we-there-yet-mirror.onrender.com/api";
    const url = `${baseUrl}/itineraries/created_by/${UUID}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const parsedData = await response.json();
      const itineraries = parsedData.data.itineraries;

      const tempData: Itinerary[] = itineraries.map((item: any) => {
        const name = item.name ?? "N/A";
        const category = item.category ?? "N/A";
        // for each tag get all tags to get the name of tag
        const activities = item.activities
          ? item.activities.map((activity: Activity) => {
              return {
                duration: activity.duration ?? "N/A",
                date: activity.date ?? "N/A",
                time: activity.time ?? "N/A",
                location: activity.location ?? "N/A",
                price: activity.price ?? "N/A",
                category: activity.category ?? "N/A",
                tags: activity.tags ?? [],
                discount: activity.discount ?? "N/A",
                bookingOpen: activity.bookingOpen ?? false,
              };
            })
          : [];
        const language = item.language ?? "N/A";
        const tags = item.tags
          ? item.tags.map((tag: { name: string }) => tag.name)
          : [];
        const locations = item.locations
          ? item.locations.map((location: { name: string }) => location.name)
          : [];
        const price = item.price ?? "N/A";
        const timeline = item.timeline ?? "N/A";
        const availableDateTimes = item.available_datetimes
          ? item.available_datetimes.map((dateTime: string) => {
              return formatDateTime(dateTime);
            })
          : [];
        const accessibilities = item.accessibility ?? false;
        const pickupLocation = item.pick_up_location?.name ?? "N/A";
        const dropoffLocation = item.drop_off_location?.name ?? "N/A";
        return {
          id: item._id,
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

      setData(tempData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
}

// helper functions
const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
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
  const [start, end] = timeline.split(" - ");
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end).split(" ")[1]; // Only take the time part for the end

  return `${formattedStart} - ${formattedEnd}`;
};
const formatActivity = (activity: Activity) => {
  return `${activity.duration} min - ${formatLocation(activity.location)}`;
};

function AddItineraryCard({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center border-2 border-black"
      onClick={onAddClick}
    >
      <button className="text-6xl font-bold text-black">+</button>
    </div>
  );
}

function ItineraryModal({
  itinerary,
  onClose,
}: {
  itinerary: Itinerary;
  onClose: () => void;
}) {
  // states for the animation
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Fetch tag names
  // const { tagNames, loading: tagLoading, error: tagError } = useGetTagNames(itinerary.tags);

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
    transition: "opacity 0.3s ease-in-out",
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  const modalContentStyle = {
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    transform: isVisible && !isClosing ? "scale(1)" : "scale(0.95)",
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  // Combine activities and locations
  const combinedData = itinerary.activities.map((activity, index) => ({
    ...activity,
    location: itinerary.locations[index] || "N/A",
    timeline: itinerary.timeline || "N/A", // Add timeline to each activity
  }));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={modalOverlayStyle}
    >
      <div
        className="relative h-auto w-full max-w-[90vw] border-2 border-black bg-white p-4"
        style={modalContentStyle}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute right-2 top-2 m-4 text-xl font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>
          {/* Itinerary name */}
          <div className="my-8 w-fit text-left text-xl font-bold">
            {itinerary.name}
            {/* add an underline */}
            <div className="border-b-2 border-black"></div>
          </div>
          {/* Itinerary details */}
          <div className="mx-8 mb-8 grid grid-cols-3 gap-8">
            {/* random info*/}
            <div className="grid-rows-auto grid grid-cols-2 gap-4">
              <div className="col-span-1>">
                <div className="text-lg font-bold">Language</div>
                <div>{itinerary.language}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Price</div>
                <div>{itinerary.price}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Dropoff Location</div>
                <div>{itinerary.dropoffLocation}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Pickup Location</div>
                <div>{itinerary.pickupLocation}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Category</div>
                <div>{itinerary.category}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Tags</div>
                <div>{itinerary.tags}</div>
              </div>
              <div>
                <div className="text-lg font-bold">Accessibilities</div>
                <div>{itinerary.accessibilities ? "Yes" : "No"}</div>
              </div>
            </div>
            {/* Activities */}
            <div>
              <div className="text-lg font-bold">Activities</div>
              {combinedData.length !== 0 ? (
                /* show a table with all the activities in it the columns are DateTime (formatted), Location (formatted), Duration*/
                <table className="w-full border-collapse border-2 text-sm">
                  <thead>
                    <tr className="border-b-2 text-center">
                      <th className="w-1/3 p-4">Timeline</th>
                      <th className="w-1/3 p-4">Location</th>
                      <th className="w-1/3 p-4">Duration (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinedData.map((activity, index) => (
                      <tr key={index} className="border-b-2 text-center">
                        <td className="p-4">
                          {formatTimeline(activity.timeline)}
                        </td>
                        <td className="p-4">
                          {formatLocation(activity.location)}
                        </td>
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
              <div className="text-lg font-bold">Date & Time</div>
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

function ItineraryCard({
  itinerary,
  onCardClick,
  onDeleteClick,
}: {
  itinerary: Itinerary;
  onCardClick: () => void;
  onDeleteClick: () => void;
}) {
  const combinedData = itinerary.activities.map((activity, index) => ({
    ...activity,
    location: itinerary.locations[index] || "N/A",
    timeline: itinerary.timeline || "N/A", // Add timeline to each activity
  }));
  return (
    <div
      className="relative h-full w-full border-2 border-black"
      onClick={onCardClick}
    >
      {/* Minus button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white"
      >
        -
      </button>
      {/* Itinerary name */}
      <div className="p-2 text-center font-bold">{itinerary.name}</div>
      {/* a vertical list of activities showing only a shortend duration and the location with a max of 3 activities */}
      <div className="grid-rows-auto grid gap-2 p-4 pt-0">
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
  const {
    deleteItinerary,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteMyItinerary();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
    null,
  );
  const [isCreating, setIsCreating] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const {
    createItinerary,
    loading: createLoading,
    error: createError,
  } = useCreateMyItinerary(activities); // Extract createItinerary

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchActivities();
  });

  const handleCardClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
  };

  const handleAddClick = () => {
    setIsCreating(true);
  };

  const handleSaveNewItinerary = async (newItinerary: Partial<Itinerary>) => {
    await createItinerary(newItinerary); // Call createItinerary function
    setIsCreating(false);
    fetchData();
  };

  const handleDeleteClick = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
    fetchData();
  };

  if (loading || deleteLoading || createLoading) {
    return <div>Loading...</div>;
  }

  if (error || deleteError || createError) {
    return <div>Error: {error || deleteError || createError}</div>;
  }

  return (
    <>
      <div className="grid-rows-auto grid grid-cols-3 gap-8 p-8">
        {data.map((itinerary, index) => (
          <ItineraryCard
            itinerary={itinerary}
            key={index}
            onCardClick={() => handleCardClick(itinerary)}
            onDeleteClick={() => handleDeleteClick(itinerary.id)}
          />
        ))}
        <AddItineraryCard onAddClick={handleAddClick} />{" "}
        {/* Add the new itinerary card */}
      </div>
      {selectedItinerary && (
        <ItineraryModal
          itinerary={selectedItinerary}
          onClose={handleCloseModal}
        />
      )}
      {isCreating && (
        <CreateItineraryModal
          onClose={() => setIsCreating(false)}
          onSave={handleSaveNewItinerary}
        />
      )}
    </>
  );
}
