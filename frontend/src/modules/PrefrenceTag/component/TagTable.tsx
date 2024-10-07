import { Pencil, X } from 'lucide-react';
import { prefrenceTag } from '../types/PrefrenceTag';
import UpdatePopup from './update-popup';
import { useRef } from 'react';

interface TagTableProps {
  Tags: prefrenceTag[];
  onDeleteTag: (id: string) => void;
  setTags: React.Dispatch<React.SetStateAction<prefrenceTag[]>>;
}

function TagTable({ Tags, onDeleteTag, setTags }: TagTableProps) {
  return (
    <div className=" mx-auto max-w-2xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-4">Name</div>
            {/* <div className="col-span-3">Type</div> */}
            <div className="col-span-4">Historical Period</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {Tags.filter((Tag) => Tag.type === 'Preference').map((Tag) => {
          const dialogRef = useRef<HTMLDialogElement>();
          return (
            <div key={Tag._id} className="mb-2 rounded-md border last:mb-0">
              <div className="grid grid-cols-12 items-center p-3">
                <div className="col-span-4">{Tag.name}</div>
                {/* <div className="col-span-3">{Tag.type}</div> */}
                <div className="col-span-4">{Tag.historical_period}</div>
                <div className="col-span-2 flex justify-end">
                  <button className="text-gray-600 hover:text-gray-800">
                    <Pencil onClick={() => dialogRef.current?.showModal()} size={20} />
                  </button>
                  <UpdatePopup dialogRef={dialogRef} _id={Tag._id} title="Update a Preference Tag" setTags={setTags} />
                  <button
                    onClick={() => onDeleteTag(Tag._id)} // Delete based on _id
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TagTable;
