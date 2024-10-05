import React, { useEffect, useState } from 'react';
import ActivityTable from '../component/ActivityTable';
import ActivityForm from '../component/ActivityForm';
import { Activity } from '../types/Activity';
import Header from '../component/Header';

const Dashboard = () => {
  const [Activities, setActivities] = useState<Activity[]>([]);

  // Fetch profiles (GET request)
  const fetchActivities = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/users');
      const data = await response.json();
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Add activity (for frontend state)
  const handleAddActivity = (newActivity: Activity) => {
    setActivities([...Activities, newActivity]);
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setActivities(Activities.filter((Activity) => Activity._id !== id));
      } else {
        console.error('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  useEffect(() => {
    fetchActivities(); // Fetch profiles when the component mounts
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <ActivityTable Activities={Activities} onDeleteActivity={handleDeleteActivity} />
      {/* <ProfileForm onAddProfile={handleAddProfile} /> */}
    </div>
  );
};

export default Dashboard;
