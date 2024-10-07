import React, { useEffect, useState } from 'react';
import ProfileTable from '../components/ProfileTable';
import { Profile } from '../types/Profile';
import Header from '../components/Header';

const Dashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isTourismGovernorPopupOpen, setIsTourismGovernorPopupOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

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
  // const handleAddProfile = (newProfile: Profile) => {
  //   setProfiles([...profiles, newProfile]);
  // };

  // Delete profile by _id (DELETE request)
  const handleDeleteProfile = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfiles(profiles.filter((profile) => profile._id !== id));
        setRefresh(refresh + 1);
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
      <Header
        setIsProfilePopupOpen={setIsProfilePopupOpen}
        isProfilePopupOpen={isProfilePopupOpen}
        setIsAdminPopupOpen={setIsAdminPopupOpen}
        isAdminPopupOpen={isAdminPopupOpen}
        setIsTourismGovernorPopupOpen={setIsTourismGovernorPopupOpen}
        isTourismGovernorPopupOpen={isTourismGovernorPopupOpen}
        setUsers={setProfiles}
        setRefresh={setRefresh}
      />
      <ProfileTable profiles={profiles} onDeleteProfile={handleDeleteProfile} />
      {/* <ProfileForm onAddProfile={handleAddProfile} /> */}
    </div>
  );
};

export default Dashboard;
