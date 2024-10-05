import React, { useState } from 'react';
import { AddUserPopup, OpenPopupButton } from './popup';

const Header = () => {
  const [isTourismGovernorPopupOpen, setIsTourismGovernorPopupOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);

  // Function to add a user
  const addUser = async (username: string, password: string,email:string, accountType: string) => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password,email, account_type: accountType }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      console.log('User added:', newUser); // Log the added user
      // Optionally, you can trigger a state update or callback to refresh the user list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleAddTourismGovernor = (username: string, password: string, email:string ) => {
    addUser(username, password, email, 'TourismGovernor');
    setIsTourismGovernorPopupOpen(false); // Close the popup after adding
  };

  const handleAddAdmin = (username: string, password: string, email:string) => {
    addUser(username, password,email, 'Admin');
    setIsAdminPopupOpen(false); // Close the popup after adding
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4">
      <div className="flex flex-col justify-end p-14 text-text-primary">
        <div className="w-full max-w-[50vw] divide-y-2 divide-borders-bottomBorder">
          <h1 className="py-4 text-4xl font-bold">Welcome Sawy</h1>
          <h3 className="py-4 text-2xl font-bold">Profiles</h3>
        </div>
      </div>
      <div className="h-1/2 max-w-fit border-2 border-gray-300 p-14">
        <h3 className="mb-4 w-fit border-b border-borders-bottomBorder text-lg font-bold text-gray-800">Add a User</h3>
        <div className="flex space-x-4">
          <OpenPopupButton onClick={() => setIsTourismGovernorPopupOpen(true)}>Add Tourism Governor</OpenPopupButton>
          <OpenPopupButton onClick={() => setIsAdminPopupOpen(true)}>Add Admin</OpenPopupButton>

          <AddUserPopup
            isOpen={isTourismGovernorPopupOpen}
            onClose={() => setIsTourismGovernorPopupOpen(false)}
            onAdd={handleAddTourismGovernor}
            title="Add a Tourism Governor"
          />
          <AddUserPopup
            isOpen={isAdminPopupOpen}
            onClose={() => setIsAdminPopupOpen(false)}
            onAdd={handleAddAdmin}
            title="Add an Admin"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
