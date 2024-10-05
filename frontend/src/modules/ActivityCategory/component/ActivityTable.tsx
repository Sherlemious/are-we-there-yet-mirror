import { X } from 'lucide-react';
import { Activity } from '../types/Activity';

interface ActivityTableProps {
  Activities: Activity[];
  onDeleteActivity: (id: string) => void;
}

function ActivityTable({ Activities, onDeleteActivity }: ActivityTableProps) {
  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Booking</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {Activities.map((Activity, index) => (
          <div key={Activity._id} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-2">{Activity.date}</div>
              <div className="col-span-2">{Activity.time}</div>
              <div className="col-span-2">{Activity.price}</div>
              <div className="col-span-2">{Activity.category}</div>
              <div className="col-span-2">{Activity.booking}</div>
              <div className="col-span-2 flex justify-end">
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
