import React, { useState } from "react";
import { Profile } from "../types/Profile";

const ProfileForm = ({
  onAddProfile,
}: {
  onAddProfile: (profile: Profile) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProfile({
      username,
      password,
      accountType,
      id: function (id: any): void {
        throw new Error("Function not implemented.");
      },
    });
    setUsername("");
    setPassword("");
    setAccountType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...form fields and submit button */}
    </form>
  );
};

export default ProfileForm;
