import React, { useState } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  message: string;
}

interface NotificationBellProps {
  notifications: Notification[];
  onClearNotifications: () => void; // Callback to clear notifications
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onClearNotifications,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block rounded-full bg-accent-gold">
      {/* Notification Bell */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {/* Notification Badge */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 w-64 mt-2 bg-white border rounded-lg shadow-lg">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-699">Notifications</h3>
            <ul className="mt-2 space-y-2">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    {notification.message}
                  </li>
                ))
              ) : (
                <li className="p-2 text-sm text-gray-600">No new notifications</li>
              )}
            </ul>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-b-lg"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
