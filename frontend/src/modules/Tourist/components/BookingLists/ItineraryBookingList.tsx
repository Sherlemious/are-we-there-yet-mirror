import { ItineraryPostType } from "@/modules/TourGuide/components/Types";
import axiosInstance from "../../../shared/services/axiosInstance";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

async function getMyItineraries() {
  try {
    // get the data via axios
    const resPromise = await axiosInstance.get("/users/getItineraries");

    const responseData = resPromise?.data;

    // Log the raw response to debug the data structure
    console.log("Raw Response:", responseData);

    // Check if the expected properties exist
    const itineraryBookings =
      responseData?.data?.itineraries?.itinerary_bookings;

    if (!Array.isArray(itineraryBookings)) {
      console.error("itinerary_bookings is not an array:", itineraryBookings);
      return [];
    }

    // Transform the data into the desired format
    const res = itineraryBookings.map((booking) => {
      const { _id, itinerary } = booking;
      return {
        _id: itinerary?._id ?? "",
        booking_id: _id ?? "",
        name: itinerary?.name ?? "N/A",
        category: itinerary?.category ?? "N/A",
        tags: itinerary?.tags ?? [],
        activities: itinerary?.activities ?? [],
        language: itinerary?.language ?? "N/A",
        price: itinerary?.price ?? "N/A",
        available_datetimes: itinerary?.available_datetimes ?? [],
        accessibility: itinerary?.accessibility ?? false,
        pickup_location: itinerary?.pick_up_location ?? "N/A",
        dropoff_location: itinerary?.drop_off_location ?? "N/A",
        rating: itinerary?.rating ?? 0,
      };
    });

    console.log("Formatted Response:", res);

    const tempData: Itinerary[] = res.map((item: any) => {
      const name = item.name ?? "N/A";
      const category = item.category === null ? "N/A" : item.category;

      const tags = item.tags.map((tag) => tag.name ?? "N/A") ?? [];
      let activities = [];
        activities = item.activities.map((activity) => {
          if (activity.activity === null) {
            return {
              name: "N/A",
              date: "N/A",
              time: "N/A",
              location: "N/A",
              price: 0,
            };
          }
          return {
            name: activity.activity.name,
            date: activity.activity.datetime,
            time: activity.activity.datetime,
            location: activity.activity.location.name,
            price: activity.activity.price,
          };
        });
      const language = item?.language ?? "N/A";
      const price = item?.price ?? "N/A";
      const availableDateTimes = item?.available_datetimes?.map(
        (date: string) => ({
          date: date,
          time: date,
        }),
      );
      const accessibilities = item?.accessibility ?? false;
      const pickupLocation = item?.pick_up_location?.name ?? "N/A";
      const dropoffLocation = item?.drop_off_location?.name ?? "N/A";
      const rating = Math.floor(Math.random() * 5) + 1; // TODO: replace with actual rating

      return {
        _id: item._id,
        booking_id: item.booking_id,
        name,
        category,
        rating,
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

    return tempData;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

async function cancelBooking(itinerary_id: string, booking_id: string) {
  try {
    const response = await axiosInstance.patch(
      "/users/cancelItineraryBooking",
      {
        itinerary_id,
        booking_id,
      },
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error("Error cancelling booking:", error.message);
    return false;
  }
}

// helper functions
const formatDateTime = (date: string, time: string) => {
  if (date === "N/A" || time === "N/A") {
    return "N/A";
  }
  const parsedDate = new Date(date);
  const parsedTime = new Date(time);
  const formattedDate = parsedDate.toLocaleDateString("en-GB");
  const formattedTime = parsedTime.toLocaleTimeString("en-GB");
  return `${formattedDate} ${formattedTime}`;
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-GB");
};
const formatTime = (time: string) => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString("en-GB");
};

// main components
// function ItineraryModal({
//   itinerary,
//   onClose,
// }: {
//   itinerary: Itinerary;
//   onClose: () => void;
// }) {
//   // states for the animation
//   const [isVisible, setIsVisible] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);

//   // handle the close button
//   useEffect(() => {
//     // Trigger opening animation when component mounts
//     setIsVisible(true);
//   }, []);

//   const handleModalClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       setIsVisible(false);
//       onClose();
//     }, 300); // Match timeout to the animation duration
//   };

//   // Animation styles
//   const modalOverlayStyle = {
//     transition: "opacity 0.3s ease-in-out",
//     opacity: isVisible && !isClosing ? 1 : 0,
//   };

//   const modalContentStyle = {
//     transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
//     transform: isVisible && !isClosing ? "scale(1)" : "scale(0.95)",
//     opacity: isVisible && !isClosing ? 1 : 0,
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       style={modalOverlayStyle}
//     >
//       <div
//         className="relative h-auto w-full max-w-[80vw] border-2 border-black bg-white p-4"
//         style={modalContentStyle}
//       >
//         {/* Close button */}
//         <button
//           onClick={handleModalClose}
//           className="absolute right-2 top-2 m-4 text-xl font-bold"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="black"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <div>
//           {/* Itinerary name */}
//           <div className="my-8 w-fit text-left text-xl font-bold">
//             {itinerary.name}
//             {/* add an underline */}
//             <div className="border-b-2 border-black"></div>
//           </div>
//           {/* Itinerary details */}
//           <div className="mx-8 mb-8 grid grid-cols-3 gap-8">
//             {/* random info*/}
//             <div className="grid-rows-auto grid grid-cols-2 gap-4">
//               <div className="col-span-1>">
//                 <div className="text-lg font-bold">Language</div>
//                 <div>{itinerary.language}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Price</div>
//                 <div>{itinerary.price}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Dropoff Location</div>
//                 <div>{itinerary.dropoffLocation.name}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Pickup Location</div>
//                 <div>{itinerary.pickupLocation.name}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Category</div>
//                 <div>{itinerary.category.name}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Tags</div>
//                 <div>{itinerary.tags.join(", ")}</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Rating</div>
//                 <div>{itinerary.rating}/5</div>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Accessibilities</div>
//                 <div>{itinerary.accessibilities ? "Yes" : "No"}</div>
//               </div>
//             </div>
//             {/* Activities */}
//             <div>
//               <div className="text-lg font-bold">Activities</div>
//               {itinerary.activities.length !== 0 ? (
//                 /* show a table with all the activities in it the columns are DateTime (formatted), Location (formatted), Price*/
//                 <table className="w-full border-collapse border-2">
//                   <thead>
//                     <tr className="border-b-2 text-left">
//                       <th>DateTime</th>
//                       <th>Location</th>
//                       <th>Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {itinerary.activities.map((activity, index) => (
//                       <tr key={index} className="border-b-2 text-left">
//                         <td>{formatDateTime(activity.date, activity.time)}</td>
//                         <td>{formatLocation(activity.location)}</td>
//                         <td>{activity.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="text-left">No activities</div>
//               )}
//             </div>
//             {/* Date and Time */}
//             <div>
//               <div className="text-lg font-bold">Date & Time</div>
//               {itinerary.availableDateTimes.length !== 0 ? (
//                 // show a table with all the available date and time the columns are Date (formatted), Time (formatted)
//                 <table className="w-full border-collapse border-2">
//                   <thead>
//                     <tr className="border-b-2 text-left">
//                       <th>Date</th>
//                       <th>Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {itinerary.availableDateTimes.map((dateTime, index) => (
//                       <tr key={index} className="border-b-2 text-left">
//                         <td>{formatDate(dateTime.date)}</td>
//                         <td>{formatTime(dateTime.time)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div>No available date and time</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function ItineraryCard({
  itinerary,
  onCardClick,
  onCancelClick,
}: {
  itinerary: Itinerary;
  onCardClick: () => void;
  onCancelClick: () => void;
}) {
  return (
    <div
      className="grid h-full w-full cursor-pointer rounded-lg border border-gray-300 bg-card p-4 shadow-lg transition duration-200 hover:shadow-sm"
      onClick={onCardClick}
    >
      {/* Itinerary name */}
      <div className="grid gap-3 px-6 pt-2">
      <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
      {itinerary.name}
      </div>
      {/* Vertical list of activities showing shortened datetime and location, max 3 activities */}
      <div className="text-center text-gray-600">
      {itinerary.availableDateTimes.length !== 0 ? (
        <div className="overflow-hidden rounded-lg">
          <div>
           <div className="text-body text-text-primary">
              {formatDate(itinerary.availableDateTimes[0].date)} {formatTime(itinerary.availableDateTimes[0].time)} - ${itinerary.price.toFixed(2)}
           </div>
          </div>
          </div>
                  ) : (
                    <div className="rounded-lg bg-secondary-light_grey text-center text-body">
                      No available dates and times
                    </div>
                  )}
                </div>
      <div className="text-center text-gray-600">
        {itinerary.activities.length !== 0 ? (
                     <div className="text-body text-text-primary">
          {itinerary.activities[0].name}
        </div>
        ) : (
          <div className="text-center text-base text-gray-500">
            No activities
          </div>
        )}
        <div className="col-span-9 justify-self-end">
          <button
        className="col-span-9 justify-self-end px-3 py-3 rounded-lg border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={(event) => {
              event.stopPropagation(); // Prevent the card's click event
              onCancelClick(); // Call the cancel handler
            }}          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export function ItineraryBookingList() {
  // get the data
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getMyItineraries()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // handle the search and filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [budget, setBudget] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [ratings, setRatings] = useState<number | null>(null);

  const [filteredData, setFilteredData] = useState<Activity[]>([]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        // Check each filter criteria
        const matchesSearchQuery =
          searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        // handle the budget
        const matchesBudget = budget === null || item.price <= budget;

        // handle the date
        const matchesDate =
          date === "" ||
          item.availableDateTimes.some((dateTime) => {
            const formattedDate = new Date(dateTime.date).toLocaleDateString(
              "en-GB",
            );
            return formattedDate === new Date(date).toLocaleDateString("en-GB");
          });

        // handle the ratings
        const matchesRatings = ratings === null || item.rating >= ratings;

        // Return true if all conditions match
        return (
          matchesSearchQuery && matchesBudget && matchesDate && matchesRatings
        );
      }),
    );
  }, [searchQuery, budget, date, ratings, data]);

  // handle sorting
  const [isAscending, setIsAscending] = useState<boolean>(true);
  useEffect(() => {
    if (!filteredData) return;
    // data.sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));
    filteredData.sort((a, b) =>
      isAscending ? a.rating - b.rating : b.rating - a.rating,
    );
  }, [isAscending, filteredData]);
  const handleRedirect = (itinerary: Itinerary) => {
    const baseLink = window.location.origin;
    const link: string = `${baseLink}/all-itineraries/${itinerary._id}`;
    console.log(link);
    // redirect to the link
    window.location.href  = link;
  };
  const handleCancel = async (itinerary: Itinerary) => {
    const loadingToastId = toast.loading("Processing");
      try {
        console.log("Cancelling booking:", itinerary._id, itinerary.booking_id);

        const success = await cancelBooking(
          itinerary._id,
          itinerary.booking_id,
        );
        if (success) {
          setData(data.filter((item) => item._id !== itinerary._id));
          toast.success("Booking cancelled successfully.", { id: loadingToastId });
        } else {
          toast.error("Failed to cancel booking.", { id: loadingToastId });
        }
      } catch (error) {
        toast.error("An error occurred while cancelling the booking.", { id: loadingToastId });
    }
  };
  return (
    <>
      {loading && (
        <div className="text-center text-2xl font-bold">Loading...</div>
      )}
      {error && (
        <div className="text-center text-2xl font-bold text-red-500">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Toolbar */}
          <div className="grid grid-cols-5 gap-6 p-6">
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full rounded-lg border border-gray-300 px-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Budget"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={budget ?? ""}
              onChange={(e) =>
                setBudget(e.target.value ? parseInt(e.target.value) : null)
              }
            />
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min Ratings"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={ratings ?? ""}
              onChange={(e) =>
                setRatings(e.target.value ? parseInt(e.target.value) : null)
              }
            />
            <button
              className="h-full w-full rounded-lg bg-accent-dark-blue font-bold text-white"
              onClick={() => setIsAscending(!isAscending)}
            >
              {isAscending ? "Sort Descending" : "Sort Ascending"}
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((itinerary, index) => (
              <ItineraryCard
                itinerary={itinerary}
                key={index}
                onCardClick={() => handleRedirect(itinerary)}
                onCancelClick={() => handleCancel(itinerary)}              />
            ))}
          </div>

          
        </>
      )}
    </>
  );
}
