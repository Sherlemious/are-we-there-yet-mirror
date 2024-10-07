import { Pencil, X } from 'lucide-react';
import { Category } from '../types/Category';
import UpdatePopup from './update-popup';
import { useRef } from 'react';

interface CategoryTableProps {
  Categories: Category[];
  onDeleteCategory: (id: string) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

function CategoryTable({ Categories, onDeleteCategory, setCategories }: CategoryTableProps) {
  console.log(Categories);
  return (
    <div className=" mx-auto max-w-2xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-8">Name</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {/* {Categories.filter((Category) => Category.name).map((Category) => { */}
        {Categories.map((category) => {
          const dialogRef = useRef<HTMLDialogElement>();
          return (
            <div key={category._id} className="mb-2 rounded-md border last:mb-0">
              <div className="grid grid-cols-12 items-center p-3">
                <div className="col-span-8">{category.name}</div>
                <div className="col-span-2 flex justify-end">
                  <button className="text-gray-600 hover:text-gray-800">
                    <Pencil onClick={() => dialogRef.current?.showModal()} size={20} />
                  </button>
                  <UpdatePopup
                    dialogRef={dialogRef}
                    _id={category._id}
                    title="Update a Preference Category"
                    setCategories={setCategories}
                  />
                  <button
                    onClick={() => onDeleteCategory(category._id)} // Delete based on _id
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

export default CategoryTable;
