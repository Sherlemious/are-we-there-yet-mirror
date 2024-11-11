import { BookOpenCheck, BookX, Tag, Share } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import { ModalRef } from "@/modules/shared/components/Modal";
import { UserContext } from "../../shared/store/user-context";
import axiosInstance from "../services/axiosInstance";
import ShareLink from "./ShareLink";
import toast from "react-hot-toast";

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
        price: number;
        category: {
          name: string;
        };
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
        const category = item.category.name ?? "N/A";

        const tags = item.tags.map((tag) => tag.name ?? "N/A") ?? [];

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
          price,
          category,
          tags,
          specialDiscounts,
          bookingOpen,
        };
      },
    );

    data.sort((a, b) => a.price - b.price);

    return data;
  } catch (error) {
    toast.error("Error fetching activities");
    throw error;
  }
}

async function getAllCategories(user: any) {
  try {
    // check if there is a user
    if (user?.account_type === "None") return [];
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

function ActivityTable({ activities }: { activities: Activity[] }) {
  // get the user context
  const { user } = useContext(UserContext);
  const isUserTourist = user?.account_type === "Tourist" || false;

  // set the class names
  const headerClassName = "bg-accent-dark-blue text-white px-4 py-4";
  const rowClassName =
    "text-text-primary px-4 py-4 text-center max-w-[200px] truncate";

  // function to handle booking
  const handleBooking = async (activity: Activity) => {
    try {
      // make sure that booking is open
      if (!activity.bookingOpen) {
        toast.error("Booking is closed for this activity");
        return;
      }
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
      toast.error(`Error booking itinerary: ${error.message}`);
    }
  };

  // functions to handle the sharing modal
  const shareRef = useRef<ModalRef>(null);
  const [shareLink, setShareLink] = useState<string>("");
  const handleShare = (activity: Activity) => {
    // get the base link
    const baseLink: string = import.meta.env.VITE_FRONT_BASE_URL as string;

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

  // return the table
  return (
    <>
      <table className="w-full rounded-lg bg-white p-4 shadow-lg">
        <thead>
          <tr>
            <th className={headerClassName + " rounded-tl-lg"}>Name</th>
            <th className={headerClassName}>Date</th>
            <th className={headerClassName}>Time</th>
            <th className={headerClassName}>Location</th>
            <th className={headerClassName}>Price</th>
            <th className={headerClassName}>Ratings</th>
            <th className={headerClassName}>Category</th>
            <th className={headerClassName}>Tags</th>
            <th className={headerClassName}>Special Discounts</th>
            <th className={headerClassName}>Booking Status</th>
            {isUserTourist && <th className={headerClassName}>Actions</th>}
            <th className={headerClassName + " rounded-tr-lg"}></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className={rowClassName}>{activity.name}</td>
              <td className={rowClassName}>{activity.date}</td>
              <td className={rowClassName}>{activity.time}</td>
              <td className={rowClassName}>{activity.location.name}</td>
              <td className={rowClassName}>{activity.price}</td>
              <td className={rowClassName}>{activity.ratings}/5</td>
              <td className={rowClassName}>{activity.category}</td>
              <td className={rowClassName}>
                {activity.tags.map(formatText).join(", ") || "N/A"}
              </td>
              <td className={rowClassName}>{activity.specialDiscounts}</td>
              <td className={rowClassName}>
                {availablePill({
                  text: activity.bookingOpen ? "Open" : "Closed",
                })}
              </td>
              {/* booking option only for tourist */}
              {isUserTourist && (
                <td className={rowClassName}>
                  <button
                    onClick={() => handleBooking(activity)}
                    className="cursor-pointer rounded-lg bg-accent-dark-blue p-4 text-white transition-all duration-150 hover:scale-105"
                  >
                    <Tag />
                  </button>
                </td>
              )}
              <td
                className={rowClassName}
                onClick={() => handleShare(activity)}
              >
                <Share className="cursor-pointer transition-all duration-150 hover:scale-110" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

    getAllCategories(user).then((data) => setCategories(data));
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
      if (activity.id === activityId) {
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
                    item.category === e.target.value || e.target.value === "",
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
        {filteredData ? (
          <ActivityTable activities={filteredData} />
        ) : (
          <div className="text-center text-xl font-semibold">No data found</div>
        )}
      </div>
    </div>
  );
}
