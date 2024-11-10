import { Activity } from "./Types";

export const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`,
    };
  };

export const formatLocation = (location: string) => {
    const maxLength = 25;
    if (location.length > maxLength) {
      return `${location.substring(0, maxLength)}...`;
    }
    return location;
  };

export const formatTimeline = (timeline: string) => {
    const [start, end] = timeline.split(" - ");
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
  
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end).split(" ")[1]; // Only take the time part for the end
  
    return `${formattedStart} - ${formattedEnd}`;
  };

export const formatActivity = (activity: Activity) => {
    return `${activity.duration} min - ${formatLocation(activity.location)}`;
  };