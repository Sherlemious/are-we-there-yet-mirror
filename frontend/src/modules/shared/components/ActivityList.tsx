import { useEffect, useState } from 'react';

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

function useGetMyActivities() {
  // init the states
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the data
  useEffect(() => {
    const runner = async () => {
      // init the url
      const baseUrl = 'https://are-we-there-yet-mirror.onrender.com/api';
      const url = `${baseUrl}/activities/`;

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
        const tempData: Activity[] = await parsedData.data.map((item: any) => ({
          date: item.date === null ? 'N/A' : item.date,
          time: item.time === null ? 'N/A' : item.time,
          location: {
            name: item.location.name === null ? 'N/A' : item.location.name,
            latitude: item.location.latitude === null ? 0 : item.location.latitude,
            longitude: item.location.longitude === null ? 0 : item.location.longitude,
          },
          price: item.price === null ? 0 : item.price,
          category: item.category === null ? 'N/A' : item.category,
          tags: item.tags === null ? [] : item.tags,
          specialDiscounts: item.specialDiscounts === undefined ? 0 : item.specialDiscounts,
          bookingOpen: item.bookingOpen === null ? false : item.bookingOpen,
        }));
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

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="w-full h-fit border-black border-2 grid grid-cols-8 py-8 px-2">
      <div className="text-left">{activity.date}</div>
      <div className="text-left">{activity.time}</div>
      <div className="text-left">{activity.location.name}</div>
      <div className="text-left">{activity.price}</div>
      <div className="text-left">{activity.category}</div>
      <div className="text-left">{activity.tags.map(formatText).join(', ')}</div>
      <div className="text-left">{activity.specialDiscounts}</div>
      <div className="text-left">{activity.bookingOpen ? 'Open' : 'Closed'}</div>
    </div>
  );
}

export function ActivityList() {
  // get the data
  const { data, loading, error } = useGetMyActivities();
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* header */}
      <div className="w-full h-fit border-black border-2 grid grid-cols-8 py-4 px-2">
        <div className="text-left font-bold text-xl">Date</div>
        <div className="text-left font-bold text-xl">Time</div>
        <div className="text-left font-bold text-xl">Location</div>
        <div className="text-left font-bold text-xl">Price</div>
        <div className="text-left font-bold text-xl">Category</div>
        <div className="text-left font-bold text-xl">Tags</div>
        <div className="text-left font-bold text-xl">Discount</div>
        <div className="text-left font-bold text-xl">Booking</div>
      </div>
      {/* body */}
      {loading && <div className="text-center text-2xl font-bold">Loading...</div>}
      {error && <div className="text-center text-2xl font-bold text-red-500">{error}</div>}
      {!loading && !error && data.map((activity, index) => <ActivityCard key={index} activity={activity} />)}
    </div>
  );
}
