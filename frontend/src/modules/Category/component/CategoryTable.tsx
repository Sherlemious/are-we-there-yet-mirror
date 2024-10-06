import { Pencil, X } from 'lucide-react';
import { Category } from '../types/Category';

interface CategoryTableProps {
  Categories: Category[];
  onDeleteCategory: (id: string) => void;
}

function CategoryTable({ Categories, onDeleteCategory }: CategoryTableProps) {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-5">Name</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {/* {Tags.filter((Tag) => Tag.type === 'Preference').map((Tag) => ( */}
        {Categories.map((Category, index) => (
          <div key={Category._id} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-5">{Category.name}</div>
              <div className="col-span-2 flex justify-end">
                <button className="text-gray-600 hover:text-gray-800">
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDeleteCategory(Category._id)} // Delete based on _id
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

export default CategoryTable;
