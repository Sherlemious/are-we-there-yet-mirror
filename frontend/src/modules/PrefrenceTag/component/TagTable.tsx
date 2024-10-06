import { Pencil, X } from 'lucide-react';
import { prefrenceTag } from '../types/PrefrenceTag';
import { AddTagPopup } from './popup';

interface TagTableProps {
  Tags: prefrenceTag[];
  onDeleteTag: (id: string) => void;
}

function TagTable({
  Tags,
  onDeleteTag,
  isTagPopupOpen2,
  setIsTagPopupOpen2,
}: TagTableProps & {
  isTagPopupOpen2: boolean;
  setIsTagPopupOpen2: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className=" mx-auto max-w-3xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-4">Historical Period</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {Tags.filter((Tag) => Tag.type === 'Preference').map((Tag) => (
          <div key={Tag._id} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-3">{Tag.name}</div>
              <div className="col-span-3">{Tag.type}</div>
              <div className="col-span-4">{Tag.historical_period}</div>
              <div className="col-span-2 flex justify-end">
                <button className="text-gray-600 hover:text-gray-800">
                  <Pencil onClick={() => setIsTagPopupOpen2(true)} size={20} />
                </button>
                <AddTagPopup
                  _id={Tag._id}
                  isOpen={isTagPopupOpen2}
                  onClose={() => setIsTagPopupOpen2(false)}
                  title="Update a Preference Tag"
                  isHeader={false}
                />
                <button
                  onClick={() => onDeleteTag(Tag._id)} // Delete based on _id
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

export default TagTable;
