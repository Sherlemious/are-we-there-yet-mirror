import { Pencil, X } from "lucide-react";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderDataType } from "../pages/Activity";
import axiosInstance from "../../shared/services/axiosInstance";

function ActivityTable() {
  const { activites: loaded_activites } = useLoaderData() as LoaderDataType;
  const [activities, setActivities] = useState(loaded_activites);

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

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`$/activities/${id}`);

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

  console.log(activities);
  
  return (
    <div className="p-4">
      <table className="w-full rounded-md border p-4">
        <thead>
          <tr className="bg-gray-100 text-start">
            <th className="py-2">Name</th>
            <th className="py-2">Date</th>
            <th className="py-2">Time</th>
            <th className="py-2">Location</th>
            <th className="py-2">Price</th>
            <th className="py-2">Category</th>
            <th className="py-2">Tags</th>
            <th className="py-2">Special Discount</th>
            <th className="py-2">Booking</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id} className="text-center">
              <td className="p-2">{activity.name}</td>
              <td className="p-2">{formatDate(activity.datetime)}</td>
              <td className="p-2">{formatTime(activity.datetime)}</td>
              <td className="p-2">{activity.location?.name}</td>
              <td className="p-2">{activity.price}</td>
              <td className="p-2">{activity.category?.name}</td>
              <td className="p-2">
                {activity.tags.map((tag, index) => (
                  <span key={tag._id}>
                    {tag.name}
                    {activity.tags.length - 1 !== index ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="p-2">{activity.specialDiscounts}</td>
              <td className="p-2">
                {activity.bookingOpen ? "Open" : "Booked"}
              </td>
              <td className="flex justify-center p-2">
                <Link
                  to={`edit/${activity._id}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Pencil size={20} />
                </Link>
                <button
                  onClick={() => handleDeleteActivity(activity._id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityTable;
