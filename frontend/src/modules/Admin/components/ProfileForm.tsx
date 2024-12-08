import React, { useState } from "react";
import { Profile } from "../types/Profile";
import axiosInstance from "../../shared/services/axiosInstance";

interface ProfileFormProps {
  onAddProfile: (newProfile: Profile) => void; // This function adds the new profile to the state
}

const ProfileForm = ({ onAddProfile }: ProfileFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [account_type, setAccountType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the new profile object
    const newProfile: Profile = {
      username,
      password,
      email,
      account_type,
      _id: "",
    };

    try {
      // Send the POST request to the backend
      // const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newProfile),
      // });

      // if (response.ok) {
      // const addedProfile = await response.json();
      const response = await axiosInstance.post("/users", newProfile); // Directly pass the object
      const addedProfile = response.data; // Adjust according to your response structure

      // Call the onAddProfile function to update the state with the newly added profile
      onAddProfile(addedProfile);

      // Clear form fields
      setUsername("");
      setPassword("");
      setEmail("");
      setAccountType("");
      // } else {
      //   console.error('Error adding profile:', response.statusText);
      // }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-md border p-4 shadow-md"
    >
      <h2 className="mb-4 text-lg font-semibold">Add New Profile</h2>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium" htmlFor="email">
          email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-medium"
          htmlFor="account_type"
        >
          Account Type
        </label>
        <input
          type="text"
          id="account_type"
          value={account_type}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        Add Profile
      </button>
    </form>
  );
};

export default ProfileForm;
