import { BookOpenCheck, BookX, Tag, Share } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import Modal, { ModalRef } from "@/modules/shared/components/Modal";
import { UserContext } from "../../shared/store/user-context";
import axiosInstance from "../services/axiosInstance";
import ShareLink from "./ShareLink";
import toast from "react-hot-toast";
import Map from "./Map";

interface Activity {
  name: string;
  date: string;
  time: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  ratings: number;
  category: {name: string};
  tags: {
    name: string;
    type: string;
    historical_period: string;
  }[];
  specialDiscounts: number;
  bookingOpen: boolean;
}
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
const handleLocation = (activity: Activity) => {
  const value = {
    lat: activity.location.latitude,
    lng: activity.location.longitude,
    name: activity.location.name,
  };
  console.log(value);
  return value;
}
const formatText = (text: string) => {
  const maxLength = 5 * 3;
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

async function getMyActivities() {
  try {
    // get the data via axios
    const resPromise = await axiosInstance.get("/activities");

    // format the data
    const res = resPromise.data;
    const data: Activity[] = res.data.map(
      (item: {
        _id: string;
        name: string;
        datetime: string;
        location: {
          name: string;
          latitude: number;
          longitude: number;
        };
        category: {name: string};
        price: number;
        tags: {
          name: string;
          type: string;
          historical_period: string;
        }[];
        specialDiscounts: number;
        bookingOpen: boolean;
        average_rating: number;
      }) => {
        const id = item._id;
        const name = item.name;
        const datetime = item.datetime ?? "N/A";
        const date = new Date(datetime).toLocaleDateString();
        const time = new Date(datetime).toLocaleTimeString();

        const location = {
          name: item.location.name ?? "N/A",
          latitude: item.location.latitude ?? 0,
          longitude: item.location.longitude ?? 0,
        };
        const price = item.price ?? -1;

        const tags = item.tags.map((tag) => tag.name ?? "N/A") ?? [];
        const category = item.category === null ? "N/A" : item.category;

        const specialDiscounts = item.specialDiscounts ?? 0;
        const bookingOpen = item.bookingOpen ?? false;
        const ratings = item.average_rating ?? 0;

        return {
          id,
          name,
          date,
          time,
          location,
          ratings,
          category,
          price,
          tags,
          specialDiscounts,
          bookingOpen,
        };
      },
    );

    data.sort((a, b) => a.price - b.price);
    console.log(data);
    return data;
  } catch (error) {
    toast.error("Error fetching activities");
    throw error;
  }
}
async function getAllCategories() {
  try {
    // get the data via axios
    const resPromise = await axiosInstance.get("/categories");

    // format the data
    const res = resPromise.data.data.categories;
    const data = res.map((item: { name: string; _id: string }) => {
      return {
        name: item.name,
        id: item._id,
      };
    });

    return data;
  } catch (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    throw error;
  }
}

function availablePill({ text }: { text: string }) {
  const open = "bg-primary-green";
  const close = "bg-destructive";
  const className = `rounded-full px-4 py-1 text-text-white text-center flex items-center justify-center ${
    text === "Open" ? open : close
  }`;
  return (
    <div className={className}>
      {text === "Open" ? <BookOpenCheck /> : <BookX />}
    </div>
  );
}
function ActivityCard({
  activity,
  onCardClick,
}: {
  activity: Activity;
  onCardClick: () => void;
}) {
  return (
    <div
      className="h-full w-full cursor-pointer rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      onClick={onCardClick}
    >
      {/* Activity Name */}
      <div className="grid gap-3 px-6 pb-4 pt-2">
      <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
        {activity.name}  {renderStars(activity.ratings)}
      </div>
      <div className="text-center text-gray-600">
        {activity.date} {activity.time}
      </div>
      </div>
      </div>
  );
}
function ActivityModal({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  // states for the animation
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { user } = useContext(UserContext);
  const isUserTourist = user?.account_type === "Tourist" || false;

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

  // function to handle booking
  const handleBooking = async () => {
    try {
      // make sure that booking is open
      if (!activity.bookingOpen) {
        console.log("Booking is open");
        toast.error("Booking is closed for this activity");
        return;
      }
      console.log(activity);
      // init body
      const body = {
        activity_id: activity.id,
      };

      // make the booking
      const resPromise = await axiosInstance.post("activities/bookings", body);
      const res = await resPromise.data;

      // show success message
      toast.success(res.message);
    } catch (error) {
      toast.error(`Error booking activity: ${error.message}`);
    }
  };
  // functions to handle the sharing modal
  const shareRef = useRef<ModalRef>(null);
  const [shareLink, setShareLink] = useState<string>("");
  const handleShare = (activity: Activity) => {
    // get the base link
    const baseLink = window.location.origin;
    // get the activity link
    const activityLink: string = "/all-activities";
    
    // get the activity id
    const activityId: string = activity.id;
    
    // format the actual link
    const link: string = `${baseLink}${activityLink}/${activityId}`;

    // set the link
    setShareLink(link);

    // open the modal
    shareRef.current?.open();
  };
  return (
    <>
      <Modal open>
        <div
          className="flex items-center justify-center backdrop-blur-sm"
          style={modalOverlayStyle}
        >
          <div
            className="relative h-auto w-full max-w-[85vw] rounded-lg border border-borders-primary bg-secondary-white p-8 shadow-lg transition-transform duration-300"
            style={modalContentStyle}
          >
            {/* Close button */}
            <button
              onClick={handleModalClose}
              className="absolute right-4 top-4 rounded-full p-2 text-accent-dark-blue transition-colors hover:bg-secondary-light_grey"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="space-y-8">
              {/* activity name */}
              <div className="inline-block">
                <div className="flex flex-row items-center justify-between gap-4">
                  <Share
                    onClick={() => {
                      handleShare(activity);
                    }}
                    className="cursor-pointer transition-all duration-150 hover:scale-110"
                  />
                  <h2 className="text-headline font-headline text-accent-dark-blue">
                    {activity.name} {renderStars(activity.ratings)}
                  </h2>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-primary-blue"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:grid-rows-1 relative">
              <div className="space-y-6 rounded-lg bg-secondary-light_grey p-6 lg:col-span-2 lg:row-span-2">
              {[
                    { label: "Price", value: activity.price.toFixed(2) },
                    { label: "Category", value: activity.category.name || "N/A" },
                    { label: "Tags", value: activity.tags.join(", ") || "N/A"},
                    { label: "Special Discounts", value: activity.specialDiscounts },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-sub-headings font-sub_headings text-accent-dark-blue">
                        {item.label}
                      </div>
                      <div className="text-body text-text-primary">
                        {item.value}
                      </div>
                    </div>
                  ))}
                    </div>
                    <div className="space-y-4">
                  <h3 className="text-sub-headings font-sub_headings text-accent-dark-blue">
                  Location
                  </h3>
                  <div className="col-span-2 h-96">
                    <Map className="w-full h-full" defaultCenter = {handleLocation(activity)} value = {handleLocation(activity)}/>
                    </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sub-headings font-sub_headings text-accent-dark-blue">
                    Available Dates & Times
                  </h3>
                  <div className="text-body text-text-primary">
                          {activity.date}, {activity.time}
                        </div>
                    </div>
                  </div>
              <div className="col-span-2 mt-5 flex justify-end">
                  {isUserTourist && (
                    <button
                      onClick={handleBooking}
                      className="flex items-center gap-2 rounded-lg bg-accent-dark-blue px-10 py-3 font-bold text-white text-text-primary transition-all duration-150 hover:opacity-80"
                      >                    
                      <h4 className="text-sub-headings font-sub_headings text-white">
                        Book Now
                      </h4>
                    </button>
                  )}
                  </div>
                  </div>
                  </div>
          </div>
      </Modal>
      <ShareLink ref={shareRef} link={shareLink} />
    </>
  );
}

export function ActivityList() {
  // get the url
  const url = window.location.href;
  const activityId: string = url.split("/").pop() ?? "";

  // get the user context
  const { user } = useContext(UserContext);

  // get the data using axios
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    [],
  );

  // handle the sorting state
  const [sortingOption, setSortingOption] = useState<{
    isSortedByPrice: boolean;
    isAscending: boolean;
  }>({
    isSortedByPrice: true,
    isAscending: true,
  });

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

    getAllCategories().then((data) => setCategories(data));
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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  // the rest of the tool bar
  const [budget, setBudget] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [ratings, setRatings] = useState<number | null>(null);

  const [filteredData, setFilteredData] = useState<Activity[]>([]);
  const handleCardClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };
  const handleCloseModal = () => {
    setSelectedActivity(null);
  };
  // update the filtered data
  useEffect(() => {
    if (!data) return;
    setFilteredData(
      data.filter((item) => {
        // Check each filter criteria
        const matchesSearchQuery =
          searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase());

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

  // if the activityId from the query param is valid set the search filed to the activity name
  useEffect(() => {
    // early exit if data hasnt loaded
    if (!data) return;
    // get the activity name given the id
    for (const activity of data) {
      if (activity._id === activityId) {
        setSearchQuery(activity.name);
        break;
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* tool bar */}
      <div className="grid grid-cols-7 gap-6 rounded-lg bg-secondary-light_grey px-4 py-8 shadow-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={budget ?? ""}
          onChange={(e) =>
            setBudget(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <input
          type="date"
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Ratings"
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={ratings ?? ""}
          onChange={(e) =>
            setRatings(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        {categories.length !== 0 ? (
          <select
            className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (e.target.value === "") {
                setFilteredData(data ?? []);
              }
              setFilteredData(
                data?.filter(
                  (item) =>
                    item.category.name === e.target.value || e.target.value === "",
                ) ?? [],
              );
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
        ) : (
          <div className="flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm shadow-lg transition-colors hover:border-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log in to view categories
          </div>
        )}
        <button
          className="col-span-1 rounded-md bg-accent-dark-blue p-3 font-semibold text-white"
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
          className="col-span-1 rounded-md bg-accent-dark-blue p-3 font-semibold text-white"
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

      <div className="space-y-8 rounded-lg bg-secondary-light_grey p-8 shadow-lg">
        {/* body */}
        {loading && (
          <div className="text-center text-xl font-semibold">Loading...</div>
        )}
        {error && (
          <div className="text-center text-xl font-semibold text-red-600">
            {error}
          </div>
        )}
        {filteredData.length === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-lg bg-secondary-light_grey">
                <p className="text-body text-muted-foreground">
                  No activities found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((activity, index) => (
                  <ActivityCard
                    key={index}
                    activity={activity}
                    onCardClick={() => handleCardClick(activity)}
                  />
                ))}
              </div>
            )}
      </div>
      {selectedActivity && (
            <ActivityModal
              activity={selectedActivity}
              onClose={handleCloseModal}
            />
          )}
    </div>
  );
}
