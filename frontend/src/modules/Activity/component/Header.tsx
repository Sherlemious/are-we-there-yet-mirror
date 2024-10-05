import React, { useState } from 'react';
import { AddActivityPopup, OpenPopupButton } from './popup';

const Header = () => {
  const [isActivityPopupOpen, setIsActivityPopupOpen] = useState(false);

  // Function to add an activity
  const addActivity = async (date: string, time: string, location: string, price:string, category: string ,tags:string ,specialDiscount:string ,booking:string) => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, location, price, category,tags,specialDiscount,booking }),
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }

      const newActivity = await response.json();
      console.log('Activity added:', newActivity); // Log the added user
      // Optionally, you can trigger a state update or callback to refresh the user list
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleAddActivity = (date: string, time: string, location: string, price:string, category: string ,tags:string ,specialDiscount:string ,booking:string) => {
    addActivity(date, time, location, price, category,tags,specialDiscount,booking);
    setIsActivityPopupOpen(false); // Close the popup after adding
  };



  return (
    <header className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex flex-col justify-end p-14 text-text-primary">
        <div className="w-full max-w-[50vw] divide-y-2 divide-borders-bottomBorder">
          <h1 className="py-4 text-4xl font-bold">Welcome Sawy</h1>
          <h3 className="py-4 text-2xl font-bold">Activities</h3>
        </div>
      </div>
      <div className="h-1/2 max-w-fit border-2 border-gray-300 p-14">
        <h3 className="mb-4 w-fit border-b border-borders-bottomBorder text-lg font-bold text-gray-800">Add an Activity</h3>
        <div className="flex space-x-4">
          <OpenPopupButton onClick={() => setIsActivityPopupOpen(true)}>Add Activity</OpenPopupButton>

          <AddActivityPopup
            isOpen={isActivityPopupOpen}
            onClose={() => setIsActivityPopupOpen(false)}
            onAdd={handleAddActivity}
            title="Add an Activity"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
