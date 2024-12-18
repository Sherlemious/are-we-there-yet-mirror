import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { LoaderDataType } from "../pages/Activity";
import axiosInstance from "../../shared/services/axiosInstance";
import type { TableColumn } from "../../shared/components/Table";
import type { TagType } from "../../shared/types/Tag.types";
import Table from "../../shared/components/Table";
import { CircleX, Plus } from "lucide-react";
import { Link } from "react-router-dom";
const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-GB");
};

const formatTime = (time: string) => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString("en-GB");
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
const handleLocation = (activity: Activity) => {
const value = {
  lat: activity.location.latitude,
  lng: activity.location.longitude,
  name: activity.location.name,
};
console.log(value);
return value;
};
const formatText = (text: string) => {
const maxLength = 5 * 3;
return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
function AddActivityCard() {
  return (
    <Link
    to="add"
    className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
  >
      <button className="flex items-center justify-center text-6xl text-gray-400">
        <Plus size={40}/>
      </button>
    </Link>
  );
}
function ActivityCard({
  activity,
  onCardClick,
  onDeleteClick,
}: {
  activity: Activity;
  onCardClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <div
      className="h-full w-full cursor-pointer rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      onClick={onCardClick}
    >
       <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full text-red-500 text-xl font-bold hover:bg-secondary-light_grey "
        >
          <CircleX className="text-red-500"/>
        </button>
      {/* Activity Name */}
      <div className="grid gap-3 px-6 pb-4 pt-2">
        <div className="p-4 text-center text-lg font-semibold text-accent-dark-blue">
          {activity.name} {renderStars(activity.average_rating)}
        </div>
        <div className="text-center text-gray-600">
          {formatDate(activity.datetime)} {formatTime(activity.datetime)}
        </div>
      </div>
    </div>
  );
}
function ActivityTable() {
  const { activites: loaded_activites } = useLoaderData() as LoaderDataType;
  const [activities, setActivities] = useState(loaded_activites);
  const navigate = useNavigate();

  const tableColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Date",
      accessor: "datetime",
      render: (value: string) => formatDate(value),
    },
    {
      header: "Time",
      accessor: "datetime",
      render: (value: string) => formatTime(value),
    },
    {
      header: "Location",
      accessor: "location.name",
    },
    {
      header: "Price",
      accessor: "price.toFixed(2)",
    },
    {
      header: "Category",
      accessor: "category.name",
    },
    {
      header: "Tags",
      accessor: "tags",
      render: (value: TagType[]) => (
        <span>
          {value.length === 0
            ? "No tags"
            : value.map(
                (tag, index) =>
                  `${tag.name}${value.length - 1 !== index ? ", " : ""}`,
              )}
        </span>
      ),
    },
    {
      header: "Special Discount",
      accessor: "specialDiscounts",
    },
    {
      header: "Booking",
      accessor: "bookingOpen",
      render: (value: boolean) => (
        <span
          className={`${value ? "bg-green-500" : "bg-orange-500"} rounded-full p-3 text-white`}
        >
          {value ? "Open" : "Booked"}
        </span>
      ),
    },
  ];

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleEditActivity = (id: string) => {
    const activity = activities.find((activity) => activity._id === id);
    if (!activity) {
      console.error("Activity not found");
      return;
    }
    navigate(`edit/${activity._id}`);
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/activities/${id}`);

      if (response.status < 400) {
        setActivities((prev) => prev.filter((activity) => activity._id !== id));
      } else {
        console.error("Failed to delete activity response:", response);
        alert("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity error:", error);
      alert("Error deleting activity");
    }
  };

  return (
      <div className="bg-secondary-light_grey p-12 shadow-lg">
         {activities.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-lg bg-secondary-light_grey">
            <p className="text-body text-muted-foreground">
              No activities found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity,index) => (
          <ActivityCard
          key={index}
          activity={activity}
          onCardClick={() => handleEditActivity(activity._id)} 
          onDeleteClick={() => handleDeleteActivity(activity._id)}
        />
      ))}
      <AddActivityCard/>{" "}
      </div>
    )}
    </div>
  );
}

export default ActivityTable;
