import React, { useState } from "react";
import { Bell } from "lucide-react";
import { NotificationTypeEnum } from "@/modules/shared/types/User.types";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import toast from "react-hot-toast";

interface Notification {
  _id?: string;
  title?: string;
  message?: string;
  notificationType: NotificationTypeEnum;
  read: boolean;
  createdAt: Date;
}

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string | undefined) => void; // Callback to mark as read
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMarkAsRead = async (id: string | undefined) => {
    if (id) {
      onMarkAsRead(id);
    }
    try {
      await axiosInstance.put(`/notifications/read/${id}`);
      toast.success("Notification Marked as Read");
    } catch (e) {
      toast.error("Failed to Mark as Read", e);
    }
  };

  const getNotificationStyle = (notificationType: NotificationTypeEnum) => {
    switch (notificationType) {
      case NotificationTypeEnum.SUCCESS:
        return "bg-green-100 text-green-800";
      case NotificationTypeEnum.ERROR:
        return "bg-red-100 text-red-800";
      case NotificationTypeEnum.INFORMATION:
        return "bg-blue-100 text-blue-800";
      case NotificationTypeEnum.WARNING:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const sortedNotifications =
    notifications && notifications.length > 1
      ? [...notifications].sort((a, b) => {
          if (a.read === b.read) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ); // If both are read or unread, sort by date
          }
          return a.read ? 1 : -1; // Put unread notifications first
        })
      : notifications || [];

  return (
    <div className="relative inline-block rounded-full bg-accent-gold">
      {/* Notification Bell */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="h-8 w-8" />
        {/* Notification Badge */}
        {notifications &&
          notifications.length > 0 &&
          notifications.filter((notif) => !notif.read).length > 0 && (
            <span className="absolute right-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {notifications.filter((notif) => !notif.read).length}
            </span>
          )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-[6px] w-64 rounded-lg border border-accent-gold bg-white shadow-lg">
          <div className="p-3">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            <ul className="no-scrollbar mt-2 max-h-64 space-y-2 overflow-y-auto">
              {notifications && notifications.length > 0 ? (
                sortedNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    className={`cursor-pointer rounded-lg p-2 text-sm hover:bg-gray-200 ${
                      notification.read ? "text-gray-500" : "font-semibold"
                    } ${getNotificationStyle(notification.notificationType)}`}
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    <div className="flex justify-between">
                      <span>{notification.title}</span>
                      {!notification.read && (
                        <span className="text-xs text-gray-500">(New)</span>
                      )}
                    </div>
                    <p className="text-xs">{notification.message}</p>
                  </li>
                ))
              ) : (
                <li className="p-2 text-sm text-gray-600">
                  No new notifications
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
