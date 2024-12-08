import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
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
  
  const formatLocation = (location: string) => {
    const maxLength = 12;
    if (location.length > maxLength) {
      return `${location.substring(0, maxLength)}...`;
    }
    return location;
  };
  const formatActivity = (activity: Activity) => {
    return `${activity.name} - ${formatDateTime(activity.date, activity.time)}`;
  };
  
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-GB");
  };
  
  const formatTime = (time: string) => {
    const parsedTime = new Date(time);
    return parsedTime.toLocaleTimeString("en-GB");
  };
  const formatTimeline = (timeline: string) => {
    if(timeline=="N/A"){
      return "N/A";
    }
    const [start, end] = timeline.split(" - ");
    const formattedStart = `${formatDate(start)} ${formatTime(start)}`;
    const formattedEnd = `${formatDate(end)} ${formatTime(end)}`;
    return `${formattedStart} - ${formattedEnd}`;
  };
  async function getMyBookmarks() {
    try {
      // get the data via axios
      const resPromise = await axiosInstance.get("/users/bookmarks");
      // format the data
        const data = resPromise.data.data.bookmarks;
        return data;
    } catch (err) {
        console.error("Error getting itineraries:", err);
        }
}
function ActivityCard({ activity,
    onCancelClick,
   }: { activity: Activity,
    onCancelClick: () => void;
    }) {
    return (
      <div
      className="grid h-full w-full cursor-pointer rounded-lg border border-gray-300 bg-card p-4 shadow-lg transition duration-200 hover:shadow-sm"
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
          className="col-span-9 justify-self-end px-3 py-3 rounded-lg border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={
            onCancelClick // Call the cancel handler
          }
        >
          Remove
        </button>
        </div>
        </div>
        </div>
    );
  }
  function ItineraryCard({
    itinerary,
    onCancelClick,
  }: {
    itinerary: Itinerary;
    onCancelClick: (activity) => void;
  }) {
    return (
      <div
        className="grid h-full w-full cursor-pointer rounded-lg border border-gray-300 bg-card p-4 shadow-lg transition duration-200 hover:shadow-sm"
      >
        {/* Itinerary name */}
        <div className="grid gap-3 px-6 pt-2">
        <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
        {itinerary.name}
        </div>
        {/* Vertical list of activities showing shortened datetime and location, max 3 activities */}
        <div className="text-center text-gray-600">
          <div className="overflow-hidden rounded-lg">
            <div>
             <div className="text-body text-text-primary">
                ${itinerary.price.toFixed(2)}
             </div>
            </div>
            </div>

                  </div>
                  <div className="text-center text-gray-600">
        {itinerary.drop_off_location.name}
      </div>
        <div className="text-center text-gray-600">
          <div className="col-span-9 justify-self-end">
            <button
          className="col-span-9 justify-self-end px-3 py-3 rounded-lg border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onCancelClick}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
export function Bookmarks() {
    const [currentTab, setCurrentTab] = useState("activities");
    const [activities, setActivities] = useState<Activity[]>([]);
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
      };
      useEffect(() =>
        {
            getMyBookmarks().then((data) => {
            console.log(data);
            // Filter the data into activities and itineraries
            const activities = data.filter((item) => item.activity).map((item) => ({
                ...item.activity,
                bookmark_id: item._id,
              }));
            ;
            const itineraries = data.filter((item) => item.itinerary) .map((item) => ({
                ...item.itinerary,
                bookmark_id: item._id,
              }));
            ;
            console.log(activities);
            console.log(itineraries);
            setActivities(activities);
            setItineraries(itineraries);
            });
        }, []);
const handleCancelItinerary = async (itinerary: Itinerary) => {
          try {
            console.log(itinerary);
            const bookmarkId = itinerary.bookmark_id;
            console.log(itinerary._id);
            await axiosInstance.delete(`/users/bookmarks/${bookmarkId}`);
            setItineraries(itineraries.filter((item) => item.bookmark_id !== bookmarkId));
            console.log(itineraries);
            toast.success("Itinerary removed from bookmarks");
          } catch (error) {
            console.error("Error removing itinerary from bookmarks:", error);
            toast.error(
              (error as any).response?.data?.message ||
                "Failed to remove bookmark",
            );
          }
      }
      const handleCancelActivity = async (activity: Activity) => {
        try {
          const bookmarkId = activity.bookmark_id;
          await axiosInstance.delete(`/users/bookmarks/${bookmarkId}`);
          setActivities(activities.filter((item) => item.bookmark_id !== bookmarkId));
          console.log(activities);
          toast.success("Activity removed from bookmarks");
        } catch (error) {
          console.error("Error removing bookmark:", error);
          toast.error(
            (error as any).response?.data?.message ||
              "Failed to remove bookmark",
          );
        }
      } 

return (
    <div className="mx-7 flex flex-col gap-8">
      {/* tab to choose which asset to view */}
      <div className="flex h-fit w-full flex-row justify-around border-2 bg-primary-green">
        <button
          className={`my-4 h-full w-fit self-center text-xl ${currentTab === "activities" ? "font-bold text-white" : "text-gray-900"} hover:text-white`}
          onClick={() => handleTabChange("activities")}
        >
          Activities
        </button>
        <button
          className={`my-4 h-full w-fit self-center text-xl ${currentTab === "itinerary" ? "font-bold text-white" : "text-gray-900"} hover:text-white`}
          onClick={() => handleTabChange("itinerary")}
        >
          Itineraries
        </button>
      </div>
      {/* This is the main content */}
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 bg-green gap-6 md:grid-cols-2 lg:grid-cols-3">
  {currentTab === "activities" ? (
    activities.map((activity, index) => (
      <ActivityCard
        key={index}
        activity={activity} // Map the correct activity
        onCancelClick={() => handleCancelActivity(activity)} // Use a function to prevent immediate execution
      />
    ))
  ) : currentTab === "itinerary" ? (
    itineraries.map((itinerary, index) => (
    <ItineraryCard 
      key={index}
      itinerary={itinerary} 
      onCancelClick={() => handleCancelItinerary(itinerary)} // Pass a handler for cancel action
    />
  ))) : null}
</div>
</div>
    </div>
  );
}
export default Bookmarks;
