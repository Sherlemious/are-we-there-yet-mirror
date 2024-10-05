import { useState } from 'react';
import { AddTagPopup, OpenPopupButton } from './popup';

const Header = () => {
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);

  // Function to add an Tag
  const addTag = async (name:string ,type:string ,historical_period:string) => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,type,historical_period }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tag');
      }

      const newTag = await response.json();
      console.log('Tag added:', newTag); // Log the added user
      // Optionally, you can trigger a state update or callback to refresh the user list
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleAddTag = (name:string,type:string,historical_period:string) => {
    addTag(name,type,historical_period);
    setIsTagPopupOpen(false); // Close the popup after adding
  };



  return (
    <header className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex flex-col justify-end p-14 text-text-primary">
        <div className="w-full max-w-[50vw] divide-y-2 divide-borders-bottomBorder">
          <h1 className="py-4 text-4xl font-bold">Welcome Sawy</h1>
          <h3 className="py-4 text-2xl font-bold">Tags</h3>
        </div>
      </div>
      <div className="h-1/2 max-w-fit border-2 border-gray-300 p-14">
        <h3 className="mb-4 w-fit border-b border-borders-bottomBorder text-lg font-bold text-gray-800">Add an Tag</h3>
        <div className="flex space-x-4">
          <OpenPopupButton onClick={() => setIsTagPopupOpen(true)}>Add Tag</OpenPopupButton>

          <AddTagPopup
            isOpen={isTagPopupOpen}
            onClose={() => setIsTagPopupOpen(false)}
            onAdd={handleAddTag}
            title="Add an Tag"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
