import { X } from 'lucide-react';
import { Profile } from '../types/Profile';

interface ProfileTableProps {
  profiles: Profile[];
  onDeleteProfile: (id: string) => void;
}

function ProfileTable({ profiles, onDeleteProfile }: ProfileTableProps) {
  return (
    <div className="container mx-auto max-w-5xl p-4">
      <div className="rounded-md border p-4">
        <div className="mb-4 rounded-md border">
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold">
            <div className="col-span-3">Username</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-3">Account Type</div>
            <div className="col-span-2 flex justify-end">Actions</div>
          </div>
        </div>
        {profiles.map((profile, index) => (
          <div key={profile._id} className="mb-2 rounded-md border last:mb-0">
            <div className="grid grid-cols-12 items-center p-3">
              <div className="col-span-3">{profile.username}</div>
              <div className="col-span-4">{profile.email}</div>
              <div className="col-span-3">{profile.account_type}</div>
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => onDeleteProfile(profile._id)} // Delete based on _id
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileTable;
