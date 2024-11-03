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
  return (
    <div className="grid h-fit w-full grid-cols-9 border-2 border-black px-2 py-8">
      <div className="text-left">{activity.date}</div>
      <div className="text-left">{activity.time}</div>
      <div className="text-left">{activity.location.name}</div>
      <div className="text-left">{activity.price}</div>
      <div className="text-left">{activity.ratings}/5</div>
      <div className="text-left">{activity.category}</div>
      <div className="text-left">
        {activity.tags.map(formatText).join(", ")}
      </div>
      <div className="text-left">{activity.specialDiscounts}</div>
      <div className="text-left">
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
    <div className="flex flex-col gap-8 p-8">
      {/* tool bar */}
      <div className="grid grid-cols-4 gap-8 p-4">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full border-2 border-black p-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className="w-full border-2 border-black p-4"
          value={budget ?? ""}
          onChange={(e) =>
            setBudget(e.target.value ? parseInt(e.target.value) : null)
          }
        />
        <input
          type="date"
          className="w-full border-2 border-black p-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Ratings"
          className="w-full border-2 border-black p-4"
          value={ratings ?? ""}
          onChange={(e) =>
            setRatings(e.target.value ? parseInt(e.target.value) : null)
          }
        />
      </div>
      {/* header */}
      <div className="grid h-fit w-full grid-cols-9 border-2 border-black px-2 py-4">
        <div className="text-left text-xl font-bold">Date</div>
        <div className="text-left text-xl font-bold">Time</div>
        <div className="text-left text-xl font-bold">Location</div>
        <div className="text-left text-xl font-bold">Price</div>
        <div className="text-left text-xl font-bold">Ratings</div>
        <div className="text-left text-xl font-bold">Category</div>
        <div className="text-left text-xl font-bold">Tags</div>
        <div className="text-left text-xl font-bold">Discount</div>
        <div className="text-left text-xl font-bold">Booking</div>
      </div>
      {/* body */}
      {/* {loading && <div className="text-center text-2xl font-bold">Loading...</div>} */}
      {/* {error && <div className="text-center text-2xl font-bold text-red-500">{error}</div>} */}
      {filteredData ? (
        filteredData?.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))
      ) : (
        <div className="text-center text-2xl font-bold">No data found</div>
      )}
    </div>
  );
}
