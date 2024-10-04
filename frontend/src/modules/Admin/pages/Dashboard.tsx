import React, { useEffect, useState } from "react";
import ProfileTable from "../components/ProfileTable";
import ProfileForm from "../components/ProfileForm";
import { Profile } from "../types/Profile";
import Header from "../components/Header";

const Dashboard = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const handleAddProfile = (newProfile: Profile) => {
      setProfiles([...profiles, newProfile]);
    };
    const fetchProfiles = async () => {
      const response = await fetch("http://localhost:5173/api/users/sellers");
      const data = await response.json();
      setProfiles(data);
    };
    useEffect(() => {
      fetchProfiles();
    }, []);
  // i want to store these profiles in array and display them in the table
//   const profiles = [
//     { username: "User123", password: "pass123", accountType: "Tourists" },
//     { username: "John Doe", password: "pa$$word", accountType: "Tour Guide" },
//     { username: "Jane Doe", password: "123456789", accountType: "Seller" },
//     {
//       username: "Professio...",
//       password: "987654321",
//       accountType: "Advertiser",
//     },
//     {
//       username: "Professio...",
//       password: "987654321",
//       accountType: "Advertiser",
//     },
//     {
//       username: "Professio...",
//       password: "987654321",
//       accountType: "Advertiser",
//     },
//     {
//       username: "Professio...",
//       password: "987654321",
//       accountType: "Advertiser",
//     },
//   ];

  return (
    <div className="container mx-auto">
      <Header />
      <ProfileTable profiles={profiles} />
      <ProfileForm onAddProfile={handleAddProfile} />
    </div>
  );
};

export default Dashboard;
