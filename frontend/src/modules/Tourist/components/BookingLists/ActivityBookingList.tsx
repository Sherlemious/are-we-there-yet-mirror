import toast from "react-hot-toast";
import axiosInstance from "../../../shared/services/axiosInstance";
import { useEffect, useState } from "react";

interface Activity {
  _id: string;
  name: string;
  booking_id: string;
  date: string;
  time: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  category: string;
  ratings: number;
  tags: {
    name: string;
    type: string;
    historical_period: string;
  }[];
  specialDiscounts: number;
  bookingOpen: boolean;
}

const formatText = (text: string) => {
  const maxLength = 5 * 3;
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
const renderStars = (rating: number) => {
  const filledStars = "★".repeat(Math.floor(rating));
  const halfStar = rating % 1 >= 0.5; 
  const emptyStars = "☆".repeat(5 - Math.floor(rating) - ((halfStar)?1:0));
  return (
    <span className="text-yellow-500 text-2xl">
      {filledStars}
      {halfStar && "⯨"}
      {emptyStars}
    </span>
  );
};
async function getMyActivities() {
  try {
    // Get the data via axios
    const resPromise = await axiosInstance.get("/users/getActivities");
    const responseData = resPromise?.data;

    // Log the raw response to debug the data structure

    // Check if the expected properties exist
    const activityBookings = responseData?.data?.activities?.activity_bookings;
    if (!Array.isArray(activityBookings)) {
      console.error("activity_bookings is not an array:", activityBookings);
      return [];
    }

    // Transform the data into the desired format
    const res = activityBookings.map((booking) => {
      const { _id, activity } = booking;
      return {
        _id: activity?._id ?? "",
        booking_id: _id ?? "",
        datetime: activity?.datetime ?? "",
        location: activity?.location ?? {
          name: "N/A",
          latitude: 0,
          longitude: 0,
        },
        name: activity?.name ?? "N/A",
        price: activity?.price ?? -1,
        category: activity?.category ?? "N/A",
        tags: activity?.tags ?? [],
        specialDiscounts: activity?.specialDiscounts ?? 0,
        bookingOpen: activity?.bookingOpen ?? false,
        created_by: activity?.created_by ?? "",
        createdAt: activity?.createdAt ?? "",
        updatedAt: activity?.updatedAt ?? "",
        __v: activity?.__v ?? 0,
        average_rating: activity?.average_rating ?? 0,
        reviews: activity?.reviews ?? [],
      };
    });

    // Format data into the Activity type
    const data: Activity[] = res.map((item) => {
      const datetime = item.datetime ?? "N/A";
      const date = new Date(datetime).toLocaleDateString();
      const time = new Date(datetime).toLocaleTimeString();

      const location = {
        name: item.location.name ?? "N/A",
        latitude: item.location.latitude ?? 0,
        longitude: item.location.longitude ?? 0,
      };
      const name = item.name ?? "N/A";
      const tags = item.tags?.map((tag) => tag.name) ?? [];
      const ratings = Math.floor(Math.random() * 5) + 1; // Mock ratings

      return {
        _id: item._id,
        booking_id: item.booking_id,
        date,
        time,
        location,
        name,
        ratings,
        price: item.price ?? -1,
        category: item.category ?? "N/A",
        tags,
        specialDiscounts: item.specialDiscounts ?? 0,
        bookingOpen: item.bookingOpen ?? false,
      };
    });

    data.sort((a, b) => a.price - b.price);

    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}

async function cancelBooking(activity_id: string, booking_id: string) {
  try {
    const response = await axiosInstance.patch("/users/cancelActivityBooking", {
      activity_id,
      booking_id,
    });

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

function ActivityCard({ activity,
  onCardClick,
  onCancelClick,

 }: { activity: Activity,
  onCardClick: () => void;
  onCancelClick: () => void;
  }) {
  return (
    <div
    className="grid h-full w-full cursor-pointer rounded-lg border border-gray-300 bg-card p-4 shadow-lg transition duration-200 hover:shadow-sm"
    onClick={onCardClick}
  >
    {/* Activity Name */}
    <div className="grid gap-3 px-6 pb-4 pt-2">
    <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
      {activity.name}
    </div>
    <div className="text-center text-gray-600">
      {activity.date} {activity.time} - {activity.location.name}
    </div>
    <div className="text-center text-gray-600">
      ${activity.price.toFixed(2)} 
    </div>
    </div>
    <div>
    <div className="col-span-9 justify-self-end">
      <button
        className="col-span-9 justify-self-end rounded bg-red-600 px-3 py-2 text-white hover:bg-red-800"
        onClick={(event) => {
          event.stopPropagation(); // Prevent the card's click event
          onCancelClick(); // Call the cancel handler
        }}
        disabled={!activity.bookingOpen}
      >
        Cancel
      </button>
      </div>
      </div>
      </div>
  );
}

export function ActivityBookingList() {
  // get the data using axios
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // handle the sorting state
  const [sortingOption, setSortingOption] = useState<{
    isSortedByPrice: boolean;
    isAscending: boolean;
  }>({
    isSortedByPrice: true,
    isAscending: true,
  });
  const handleCancel = async (activity: Activity) => {
      const loadingToastId = toast.loading("Processing");
      try {
        const success = await cancelBooking(activity._id, activity.booking_id);
        if (success) {
          setData(data.filter((item) => item._id !== activity._id));
          toast.success("Booking cancelled successfully.", { id: loadingToastId });
        } else {
          toast.error("Failed to cancel booking.", { id: loadingToastId });
        }
      } catch (error) {
        toast.error("An error occurred while cancelling the booking.", { id: loadingToastId });
      }
  };
  // useEffect to get the data
  useEffect(() => {
    getMyActivities()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // handle the sorting
  useEffect(() => {
    if (!data) return;
    setData(
      [...data].sort((a, b) =>
        sortingOption.isSortedByPrice
          ? (a.price - b.price) * (sortingOption.isAscending ? 1 : -1)
          : (a.ratings - b.ratings) * (sortingOption.isAscending ? 1 : -1),
      ),
    );
  }, [sortingOption]);

  // handle the search and filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  // the rest of the tool bar
  const [budget, setBudget] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [ratings, setRatings] = useState<number | null>(null);

  const [filteredData, setFilteredData] = useState<Activity[]>([]);

  useEffect(() => {
    setFilteredData(
      data?.filter((item) => {
        // Check each filter criteria
        const matchesSearchQuery =
          searchQuery === "" ||
          item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        const matchesBudget = budget === null || item.price <= budget;

        const matchesDate =
          date === "" || new Date(item.date) >= new Date(date);

        const matchesRatings = ratings === null || item.ratings >= ratings;

        // Return true if all conditions match
        return (
          matchesSearchQuery && matchesBudget && matchesDate && matchesRatings
        );
      }),
    );
  }, [searchQuery, budget, date, ratings, data]);
  const handleRedirect = (activity: Activity) => {
    const baseLink = window.location.origin;
    // get the activity link
    const activityLink: string = "/all-activities";
    
    // get the activity id
    const activityId: string = activity._id;
    console.log(activityId);
    // format the actual link
    const link: string = `${baseLink}${activityLink}/${activityId}`;
    console.log(link);
    // redirect to the link
    window.location.href  = link;
  };
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* tool bar */}
      <div className="grid grid-cols-6 gap-6 p-4">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full rounded-md border border-gray-300 p-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className="w-full rounded-md border border-gray-300 p-3"
          value={budget ?? ""}
          onChange={(e) =>
            setBudget(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <input
          type="date"
          className="w-full rounded-md border border-gray-300 p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Ratings"
          className="w-full rounded-md border border-gray-300 p-3"
          value={ratings ?? ""}
          onChange={(e) =>
            setRatings(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <button
          className="col-span-1 rounded-md bg-accent-gold p-3 font-semibold text-white"
          onClick={() => {
            setSortingOption({
              isSortedByPrice: !sortingOption.isSortedByPrice,
              isAscending: true,
            });
          }}
        >
          Sort by {sortingOption.isSortedByPrice ? "Price" : "Ratings"}
        </button>
        <button
          className="col-span-1 rounded-md bg-accent-gold p-3 font-semibold text-white"
          onClick={() =>
            setSortingOption({
              ...sortingOption,
              isAscending: !sortingOption.isAscending,
            })
          }
        >
          {sortingOption.isAscending ? "Ascending" : "Descending"}
        </button>
      </div>
      {/* body */}
      {loading && (
        <div className="text-center text-xl font-semibold">Loading...</div>
      )}
      {error && (
        <div className="text-center text-xl font-semibold text-red-600">
          {error}
        </div>
      )}
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData ? (
        filteredData?.map((activity, index) => (
          <ActivityCard key={index} activity={activity} 
          onCardClick={() => handleRedirect(activity)}
          onCancelClick={() => handleCancel(activity)}
          />
        ))
      ) : (
        <div className="text-center text-xl font-semibold">No data found</div>
      )}
    </div>
        </div>
  );
}
