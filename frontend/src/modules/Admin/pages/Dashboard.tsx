import React, { useEffect, useState } from 'react';
import ProfileTable from '../components/ProfileTable';
import ProfileForm from '../components/ProfileForm';
import { Profile } from '../types/Profile';
import Header from '../components/Header';

const Dashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Fetch profiles (GET request)
  const fetchProfiles = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/users');
      const data = await response.json();
      setProfiles(data.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Add profile (for frontend state)
  const handleAddProfile = (newProfile: Profile) => {
    setProfiles([...profiles, newProfile]);
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteProfile = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfiles(profiles.filter((profile) => profile._id !== id));
      } else {
        console.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch profiles when the component mounts
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <ProfileTable profiles={profiles} onDeleteProfile={handleDeleteProfile} />
      {/* <ProfileForm onAddProfile={handleAddProfile} /> */}
    </div>
  );
};

export default Dashboard;
