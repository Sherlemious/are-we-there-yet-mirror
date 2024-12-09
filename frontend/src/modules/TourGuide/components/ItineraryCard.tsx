import { CircleX } from "lucide-react";
import { Itinerary } from "./Types";
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
const renderStars = (rating: number) => {
  const filledStars = "★".repeat(Math.floor(rating));
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = "☆".repeat(5 - Math.floor(rating) - (halfStar ? 1 : 0));
  return (
    <span className="text-2xl text-yellow-500">
      {filledStars}
      {halfStar && "⯨"}
      {emptyStars}
    </span>
  );
  };
const formatTime = (time: string) => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString("en-GB");
};
const formatActivity = (activity: Activity) => {
  console.log(activity.activity);
  return `${activity.activity.name} - ${formatDate(activity.activity.datetime)} ${formatTime(activity.activity.datetime)}`;
};
export function ItineraryCard({
    itinerary,
    onCardClick,
    onDeleteClick,
  }: {
    itinerary: Itinerary;
    onCardClick: () => void;
    onDeleteClick: () => void;
  }) {
    return (
      <div
      className="h-full w-full cursor-pointer rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
        onClick={onCardClick}
      >
        {/* Minus button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full text-red-500 text-xl font-bold hover:bg-secondary-light_grey "
        >
          <CircleX className="text-red-500"/>
        </button>
        {/* Itinerary name */}
        <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
        {itinerary.name} {renderStars(itinerary.average_rating)}
        </div>
        <div className="grid gap-3 px-6 pb-4 pt-2">
        {itinerary.activities.length !== 0 ? (
          itinerary.activities.slice(0, 3).map((activity, index) => (
            <div className="text-center text-gray-600" key={index}>
              {formatActivity(activity)}
            </div>
          ))
        ) : (
          <div className="text-center italic text-gray-500">No activities</div>
        )}
      </div>
      </div>
    );
  }