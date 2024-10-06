import { AddCategoryPopup, OpenPopupButton } from './popup';

const Header = ({
  isCategoryPopupOpen,
  setIsCategoryPopupOpen,
  setCategories,
  setRefresh,
}: {
  isCategoryPopupOpen: boolean;
  setIsCategoryPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Function to add an Category
  const addCategory = async (name: string) => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to add Category');
      }

      const newCategory = await response.json();
      console.log('Category added:', newCategory); // Log the added user
      // Optionally, you can trigger a state update or callback to refresh the user list
      const CategoryId = newCategory.data.categoryId;
      const Category = await getCategory(CategoryId);
      console.log('Category:', Category); // Log the added user
      setCategories((prevCategories) => [...prevCategories, { _id: Category._id, name: Category.name }]);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error adding Category:', error);
    }
  };
  async function getCategory(id: string) {
    console.log(id);
    return fetch(`https://are-we-there-yet-mirror.onrender.com/api/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        return data.data.category;
      });
  }

  const handleAddCategory = (name: string) => {
    addCategory(name);
    setIsCategoryPopupOpen(false); // Close the popup after adding
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex flex-col justify-end p-14 text-text-primary">
        <div className="w-full max-w-[50vw] divide-y-2 divide-borders-bottomBorder">
          <h1 className="py-4 text-4xl font-bold">Welcome Sawy</h1>
          <h3 className="py-4 text-2xl font-bold">Categories</h3>
        </div>
      </div>
      <div className="h-1/2 max-w-fit border-2 border-gray-300 p-14">
        <h3 className="mb-4 w-fit border-b border-borders-bottomBorder text-lg font-bold text-gray-800">
          Add a Category
        </h3>
        <div className="flex space-x-4">
          <OpenPopupButton onClick={() => setIsCategoryPopupOpen(true)}>Add Category</OpenPopupButton>
          <AddCategoryPopup
            isOpen={isCategoryPopupOpen}
            onClose={() => setIsCategoryPopupOpen(false)}
            onAdd={handleAddCategory}
            title="Add a Preference Category"
            isHeader={true}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
