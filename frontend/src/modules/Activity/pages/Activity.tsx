import { useEffect, useState } from 'react';
import ActivityTable from '../component/ActivityTable';
import { Activity } from '../types/Activity';
import Header from '../component/Header';

const Dashboard = () => {
  const [Activities, setActivities] = useState<Activity[]>([]);

  // Fetch profiles (GET request)
  const fetchActivities = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/activities');
      const data = await response.json();
      console.log(data);
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Error fetching activities');
    }
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setActivities((prev) => prev.filter((Activity) => Activity._id !== id));
      } else {
        console.error('Failed to delete activity response:', response);
        alert('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity error:', error);
      alert('Error deleting activity');
    }
  };

  useEffect(() => {
    fetchActivities(); // Fetch profiles when the component mounts
  }, []);

  return (
    <div className="w-full">
      <Header />
      <ActivityTable Activities={Activities} onDeleteActivity={handleDeleteActivity} />
    </div>
  );
};

export default Dashboard;
