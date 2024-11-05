import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";

interface Activity {
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
    const res = await resPromise.data;
    const data: Activity[] = await res.data.map((item: any) => {
      const datetime = item.datetime ?? "N/A";
      const date = new Date(datetime).toLocaleDateString();
      const time = new Date(datetime).toLocaleTimeString();

      const location = {
        name: item.location.name ?? "N/A",
        latitude: item.location.latitude ?? 0,
        longitude: item.location.longitude ?? 0,
      };
      const price = item.price ?? -1;
      let category = item.category ?? "N/A";
      category = category.name ?? "N/A";

      let tags = item.tags ?? [];
      tags = tags.map((tag) => tag.name ?? "N/A");

      const specialDiscounts = item.specialDiscounts ?? 0;
      const bookingOpen = item.bookingOpen ?? false;
      const ratings = Math.floor(Math.random() * 5) + 1; // TODO: Replace with actual ratings

      return {
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
    });

    // sort on price
    await data.sort((a, b) => a.price - b.price); // TODO: make sorting based on a user preference

    return await data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

function ActivityCard({ activity }: { activity: Activity }) {
  const classes = "text-left text-[18px] text-ellipsis";
  return (
    <div className="bg-card grid min-h-[8rem] w-full grid-cols-9 gap-8 rounded-lg border border-gray-300 px-4 py-4">
      <div className={classes}>{activity.date}</div>
      <div className={classes}>{activity.time}</div>
      <div className={classes}>{activity.location.name}</div>
      <div className={classes}>{activity.price}</div>
      <div className={classes}>{activity.ratings}/5</div>
      <div className={classes}>{activity.category}</div>
      <div className={classes}>
        {activity.tags.map(formatText).join(", ") || "N/A"}
      </div>
      <div className="text-left text-base">{activity.specialDiscounts}</div>
      <div className="text-left text-base">
        {activity.bookingOpen ? "Open" : "Closed"}
      </div>
    </div>
  );
}

export function ActivityList() {
  // get the data using axios
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // handle the search and filter
  const [searchQuery, setSearchQuery] = useState<string>("");

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
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* tool bar */}
      <div className="grid grid-cols-4 gap-6 p-4">
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
      </div>

      {/* header */}
      <div className="bg-card grid w-full grid-cols-9 rounded-lg border border-gray-300 px-4 py-4">
        <div className="text-left text-lg font-semibold">Date</div>
        <div className="text-left text-lg font-semibold">Time</div>
        <div className="text-left text-lg font-semibold">Location</div>
        <div className="text-left text-lg font-semibold">Price</div>
        <div className="text-left text-lg font-semibold">Ratings</div>
        <div className="text-left text-lg font-semibold">Category</div>
        <div className="text-left text-lg font-semibold">Tags</div>
        <div className="text-left text-lg font-semibold">Discount</div>
        <div className="text-left text-lg font-semibold">Booking</div>
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
      {filteredData ? (
        filteredData?.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))
      ) : (
        <div className="text-center text-xl font-semibold">No data found</div>
      )}
    </div>
  );
}
