import { Pencil, X } from 'lucide-react';
import { Activity } from '../types/Activity';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ActivityTable() {
  const { activites: loaded_activites } = useLoaderData() as { activites: Activity[] };
  const [activities, setActivities] = useState(loaded_activites);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACK_BASE_URL}/activities/${id}`);

      if (response.status < 400) {
        setActivities((prev) => prev.filter((activity) => activity._id !== id));
      } else {
        console.error('Failed to delete activity response:', response);
        alert('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity error:', error);
      alert('Error deleting activity');
    }
  };

  return (
    <div className="p-4">
      <table className="w-full rounded-md border p-4">
        <thead>
          <tr className="bg-gray-100 text-start">
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
          {activities
            .map((activity) => (
              <tr key={activity._id} className="text-center">
                <td className="p-2">{formatDate(activity.datetime)}</td>
                <td className="p-2">{formatTime(activity.datetime)}</td>
                <td className="p-2">{activity.location?.name}</td>
                <td className="p-2">{activity.price}</td>
                <td className="p-2">{activity.category?.name}</td>
                <td className="p-2">
                  {activity.tags.map((tag, index) => (
                    <span key={tag._id}>
                      {tag.name}
                      {activity.tags.length - 1 !== index ? ', ' : ''}
                    </span>
                  ))}
                </td>
                <td className="p-2">{activity.specialDiscounts}</td>
                <td className='p-2'>{activity.bookingOpen ? "Open": "Booked"}</td>
                <td className="p-2 flex justify-center">
                  <Link to={`edit/${activity._id}`} className="text-gray-600 hover:text-gray-800">
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
