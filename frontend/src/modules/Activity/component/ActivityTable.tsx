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
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  return (
    <div className="container mx-auto p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-3">Date</div>
            <div className="col-span-1">Time</div>
            {/* <div className="col-span-2">Location</div> */}
            <div className="col-span-1">Price</div>
            <div className="col-span-2">Category</div>
            {/* <div className="col-span-2">Tags</div> */}
            <div className="col-span-2">Special Discount</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {Activities.map((Activity, index) => (
          <div key={Activity._id} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-3">{formatDate(Activity.date)}</div>
              <div className="col-span-1">{Activity.time}</div>
              {/* <div className="col-span-2">{Activity.location}</div> */}
              <div className="col-span-1">{Activity.price}</div>
              <div className="col-span-2">{Activity.category}</div>
              {/* <div className="col-span-2">{Activity.tags}</div> */}
              <div className="col-span-2">{Activity.specialDiscount}</div>
              <div className="col-span-2 flex justify-end">
              <button
                 className="text-gray-600 hover:text-gray-800">
                  <Pencil size={20}/>
                </button>
                <button
                  onClick={() => onDeleteActivity(Activity._id)} // Delete based on _id
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTable;
