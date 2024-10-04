import { X } from "lucide-react";
import { Profile } from "../types/Profile";

interface UserAccountListProps {
  profiles: Profile[];
}
function ProfileTable({ profiles }: UserAccountListProps) {

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-3">Username</div>
            <div className="col-span-3">Password</div>
            <div className="col-span-4">Account Type</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {profiles.map((profile, index) => (
          <div key={index} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-3">{profile.username}</div>
              <div className="col-span-3">{profile.password}</div>
              <div className="col-span-4">{profile.accountType}</div>
              <div className="col-span-2 flex justify-end">
                <button className="text-gray-600 hover:text-gray-800">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTable;
