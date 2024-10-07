import { useState } from "react";
import Greeting from "../../shared/components/Greeting";
import Dropdown from "../components/Dropdown";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="flex h-screen flex-col gap-20 p-24">
      <Greeting signedIn={false} />
      <Dropdown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
      <RegisterForm userRole={selectedRole} />
    </div>
  );
}
