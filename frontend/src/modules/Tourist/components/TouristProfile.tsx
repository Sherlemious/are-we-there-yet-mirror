import { TagType } from "@/modules/shared/types/Tag.types";
import { UserType } from "@/modules/shared/types/User.types";
import {
  Award,
  Briefcase,
  Calendar,
  Coins,
  Flag,
  Mail,
  Phone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import TouristSearchMultiSelect, {
  MultiSelectOption,
} from "./TouristSearchMultiSelect";
import { updateUser } from "@/modules/shared/services/apiUpdateUser";
import bronzeBadge from "../../../../../assets/badges/Bronze.png";
import silverBadge from "../../../../../assets/badges/Silver.png";
import goldBadge from "../../../../../assets/badges/Gold.png";

export default function TouristProfile({
  user,
  handleRedeemPoints,
  tags,
}: {
  user: UserType;
  handleRedeemPoints: (
    loyaltyPoints: number,
    setLoyaltyPoints: React.Dispatch<React.SetStateAction<number>>,
  ) => void;
  tags: TagType[];
}) {
  const [selectedTags, setSelectedTags] = useState<MultiSelectOption[]>(
    user.preferences?.map((tag) => ({
      value: tag._id,
      label: tag.name,
      payload: tag,
    })) ?? [],
  );
  const [loyaltyPointsToRedeem, setLoyaltyPointsToRedeem] = useState(0);

  async function handleUpdateTags() {
    const newTagIds = selectedTags.map((tag) => tag.value);
    await updateUser(user._id, undefined, undefined, undefined, newTagIds);
  }

  function getBadge(level: number) {
    switch (level) {
      case 3:
        return goldBadge;
      case 2:
        return silverBadge;
      case 1:
      default:
        return bronzeBadge;
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      {/* Contact Details */}
      <div className="space-y-6 pt-10">
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

      {/* Personal Info and Payment Info Row */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Personal Info */}
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

        {/* Payment Info */}
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
                {user.loyalty_points} Points
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 flex-shrink-0 text-primary-blue" />
              <span className="text-slate-600">level {user.loyalty_level}</span>
              <img
                src={getBadge(user.loyalty_level || 1)}
                alt="badge"
                className="h-6 w-6"
              />
            </div>
            <form
              className="flex flex-col items-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleRedeemPoints(
                  loyaltyPointsToRedeem,
                  setLoyaltyPointsToRedeem,
                );
              }}
            >
              <input
                type="number"
                className="w-full rounded-lg border border-secondary-light_grey px-4 py-2 text-slate-600"
                placeholder="Enter points to redeem"
                value={String(loyaltyPointsToRedeem)}
                onChange={(e) =>
                  setLoyaltyPointsToRedeem(Number(e.target.value))
                }
                min={0}
                max={user.loyalty_points}
              />
              <button className="mt-4 w-full rounded-lg bg-accent-gold px-6 py-3 font-semibold transition-all duration-150 hover:opacity-80">
                Redeem Points
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Preference Tags */}
      <div className="flex flex-col space-y-6">
        <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
          Preference Tags
        </h3>
        <TouristSearchMultiSelect
          initialSelectedItems={user.preferences?.map((tag) => ({
            value: tag._id,
            label: tag.name,
            payload: tag,
          }))}
          onUpdate={handleUpdateTags}
          options={tags?.map((tag) => ({
            value: tag._id,
            label: tag.name,
            payload: tag,
          }))}
          selectedItems={selectedTags}
          onSelect={(tag) => {
            setSelectedTags((prev) => [...prev, tag]);
          }}
          onRemove={(tag) => {
            setSelectedTags((prev) =>
              prev.filter((t) => t.value !== tag.value),
            );
          }}
        />
      </div>
    </div>
  );
}
