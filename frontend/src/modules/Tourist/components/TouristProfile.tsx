import { UserType } from "@/modules/shared/types/User.types";
import {
  Briefcase,
  Calendar,
  Coins,
  Flag,
  Mail,
  Phone,
  Wallet,
} from "lucide-react";

export default function TouristProfile({
  user,
  handleRedeemPoints,
}: {
  user: UserType;
  handleRedeemPoints: () => void;
}) {
  return (
    <>
      <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 pt-10 md:grid-cols-3">
        <div className="space-y-6">
          <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
            Contact Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Phone className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span>{user.mobile_number || "NA"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span className="truncate">{user.email || "NA"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
            Personal Info
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span>{user.dob?.slice(0, 10) || "NA"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Briefcase className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span>{user.job || "NA"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Flag className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span>{user.nationality || "NA"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
            Payment Info
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span className="text-slate-600">EGP {user.wallet}</span>
            </div>
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span className="text-slate-600">
                {user.loyaltyPoints ?? 0} Points
              </span>
            </div>
            <button
              onClick={handleRedeemPoints}
              className="mt-4 rounded-lg bg-accent-dark-blue px-6 py-3 font-bold text-white transition-all duration-150 hover:opacity-80"
            >
              Redeem Points
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
