// import { imgLinks } from "@/modules/shared/utils/constants";
import {
  Mail,
  Camera,
  Calendar,
  Briefcase,
  Wallet,
  Phone,
  Flag,
  Globe,
  Info,
  Clock,
  Coins,
} from "lucide-react";
import { useState, useRef, useContext } from "react";
import EditModal, { formModalRef } from "../../shared/components/FormEditModal";
import { UserContext } from "@/modules/shared/store/user-context";
import toast from "react-hot-toast";
import { requestAccountDeletion } from "../services/apiDeleteUser";
import { useNavigate } from "react-router";
import { apiAddDocs } from "@/modules/Register/services/apiAddDocs";
import { updateUser } from "../services/apiUpdateUser";
import { validateFormDataValue } from "@/modules/Register/utils/helpers";
import { fieldNames } from "../constants/inputNames";
import { updatePassword } from "../services/apiUpdatePassword";

interface NewProfProps {
import axiosInstance from "../../shared/services/axiosInstance";

const imgs = Object.values(imgLinks.landing_page);

const NewProf = ({
  countries = [],
  fieldsIncludeNationality = false,
  mappingNeeded = false,
  APICallFields,
  accountTypeNeededInAPICall = false,
  endpoint,
  initialFormValues,
}: {
  countries?: { name: { common: string } }[];
  fieldsIncludeNationality?: boolean;
  mappingNeeded?: boolean;
  APICallFields: string[];
  accountTypeNeededInAPICall?: boolean;
  initialFormValues: { [key: string]: string };
  endpoint: (
    id: string,
    data: { [key: string]: FormDataEntryValue },
  ) => Promise<unknown>;
}

const NewProf: React.FC<NewProfProps> = ({
  countries = [],
  fieldsIncludeNationality = false,
  mappingNeeded = false,
  APICallFields,
  accountTypeNeededInAPICall = false,
  endpoint,
  initialFormValues,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<formModalRef>(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRedeemPoints = async () => {
    if (user.loyaltyPoints) {
      try {
        const response = await axiosInstance.post("/redeem", {
          points: user.loyaltyPoints,
        });
        const cashEquivalent = response.data.cashEquivalent; // Assuming the API returns the cash equivalent
        setUser((prevUser) => ({
          ...prevUser,
          wallet: (prevUser.wallet ?? 0) + cashEquivalent,
          loyaltyPoints: 0,
        }));
        toast.success(`You have redeemed EGP ${cashEquivalent}`);
      } catch (error) {
        toast.error("Failed to redeem points");
        console.error("Error redeeming points:", error);
      }
    } else {
      toast.error("You have no loyalty points to redeem");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiAddDocs(formData);
      const id = res.data._id;
      const url = res.data.url;

      await updateUser(user._id, {
        account_type: user.account_type,
        profile_pic: id,
      });

      setUser((prev) => ({
        ...prev,
        profile_pic: { url, _id: id },
      }));

      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (data: Record<string, string>) => {
    // validate nationality
    if (
      fieldsIncludeNationality &&
      data["Nationality"] &&
      !countries?.find((country) => country.name.common === data["Nationality"])
    ) {
      toast.error("Invalid country name");
      return;
    }

    // map form keys to API fields => { formKey: APIField }
    const fieldsMap: Record<string, string> = {};
    if (mappingNeeded) {
      for (const key in initialFormValues) {
        fieldsMap[key] =
          APICallFields[Object.keys(initialFormValues).indexOf(key)];
      }
    }

    // map data to API fields -> { APIField: value }, where APIField is the field name in the API and value is the value from the form
    const mappedData = Object.entries(data).reduce<Record<string, string>>(
      (acc, [key, value]) => ({
        ...acc,
        [fieldsMap[key] || key]: value,
      }),
      {},
    );

    // Update password
    console.log("Mapped Data:", mappedData);
    if (mappedData.password) {
      if (
        !validateFormDataValue(
          fieldNames.password,
          mappedData.password as string,
        )
      ) {
        return toast.error(
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
        );
      }
      await updatePassword(mappedData.password);
    }

    // append account type if needed
    if (accountTypeNeededInAPICall) {
      mappedData["account_type"] = user.account_type;
    }

    // Remove dob field if present
    if (mappedData["dob"]) delete mappedData["dob"];

    // call API
    try {
      const res = (await endpoint(user._id, mappedData)) as { status: number };

      if (res.status === 200) {
        setUser((prev) => ({ ...prev, ...mappedData }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onDeleteReq = async () => {
    try {
      await requestAccountDeletion();

      navigate("/home");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Request to delete account failed");
    }
  };

  const openModal = () => {
    modalRef.current?.open({
      ...initialFormValues,
    });
  };

  const renderProfileContent = () => {
    switch (user.account_type.toLowerCase()) {
      case "advertiser":
        return (
          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 pt-10 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span className="truncate">{user.email || "NA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span>{user.hotline || "NA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span>{user.website || "NA"}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "seller":
        return (
          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 pt-10 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span className="truncate">{user.email || "NA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Info className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span>{user.description || "NA"}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "tourguide":
        return (
          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 pt-10 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
                Guide Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span className="truncate">{user.email || "NA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span>{user.mobile_number || "NA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span>
                    {user.years_of_experience || "NA"}
                    {user.years_of_experience ? " years of experience" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default: // Tourist profile
        return (
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
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-secondary-light_grey bg-secondary-light_grey p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-12 lg:flex-row">
              <div className="flex flex-col items-center lg:items-center">
                <div className="relative">
                  {user.profile_pic ? (
                    <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <img
                        src={user.profile_pic.url}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-blue to-primary-green shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {user.username?.[0]?.toUpperCase() || "NA"}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleCameraClick}
                    className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md transition-shadow hover:shadow-lg disabled:opacity-50"
                    disabled={isUploading}
                  >
                    <Camera className="h-5 w-5 text-primary-blue" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <h1 className="mt-4 text-2xl font-bold text-accent-dark-blue">
                  {user.username}
                </h1>
                <p className="mt-1 text-primary-blue">
                  {user.account_type.toLowerCase() === "tourguide"
                    ? "Tour Guide"
                    : user.account_type || "NA"}
                </p>
              </div>

              {/* Dynamic Content Based on Account Type */}
              {renderProfileContent()}
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={openModal}
                className="rounded-lg bg-accent-dark-blue px-8 py-3 text-white transition-colors hover:bg-accent-dark-blue/80"
              >
                Edit Profile
              </button>
              <EditModal
                ref={modalRef}
                fields={Object.keys(initialFormValues)}
                onSave={handleSave}
                onDeleteAccount={() => onDeleteReq()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProf;
