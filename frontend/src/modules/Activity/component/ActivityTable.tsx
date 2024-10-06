import { Pencil, X } from 'lucide-react';
import { Activity } from '../types/Activity';

interface ActivityTableProps {
  Activities: Activity[];
  onDeleteActivity: (id: string) => void;
}

function ActivityTable({ Activities, onDeleteActivity }: ActivityTableProps) {
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
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Activities.filter((Activity) => Activity.bookingOpen).map((Activity) => (
            <tr key={Activity._id} className="text-center">
              <td className="p-2">{formatDate(Activity.datetime)}</td>
              <td className="p-2">{formatTime(Activity.datetime)}</td>
              <td className="p-2">{Activity.location.name}</td>
              <td className="p-2">{Activity.price}</td>
              <td className="p-2">{Activity.category.name}</td>
              <td className="p-2">
                {Activity.tags.map((tag) => (
                  <span key={tag._id}>{tag.name}, </span>
                ))}
              </td>
              <td className="p-2">{Activity.specialDiscounts}</td>
              <td className="p-2 flex">
                <button className="text-gray-600 hover:text-gray-800">
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDeleteActivity(Activity._id)} // Delete based on _id
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
