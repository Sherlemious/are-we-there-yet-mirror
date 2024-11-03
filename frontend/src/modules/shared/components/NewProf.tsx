import { imgLinks } from "@/modules/shared/utils/constants";
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
} from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import EditModal, { formModalRef } from "../../shared/components/FormEditModal";
import { UserContext } from "@/modules/shared/store/user-context";
import toast from "react-hot-toast";
import { deleteUser } from "../services/apiDeleteUser";
import { AccountType } from "../types/User.types";
import { useNavigate } from "react-router";

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
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<formModalRef>(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSave = async (data: Record<string, string>) => {
    if (
      fieldsIncludeNationality &&
      data["Nationality"] &&
      !countries?.find((country) => country.name.common === data["Nationality"])
    ) {
      toast.error("Invalid country name");
      return;
    }

    const fieldsMap: Record<string, string> = {};
    if (mappingNeeded) {
      for (const key in initialFormValues) {
        fieldsMap[key] =
          APICallFields[Object.keys(initialFormValues).indexOf(key)];
      }
    }

    const mappedData = Object.entries(data).reduce<Record<string, string>>(
      (acc, [key, value]) => ({
        ...acc,
        [fieldsMap[key]]: value,
      }),
      {},
    );
    if (accountTypeNeededInAPICall)
      mappedData["account_type"] = user.account_type;

    await endpoint(user._id, mappedData);

    console.log("Saved data:", mappedData);

    setUser((prev) => ({ ...prev, ...mappedData }));
  };

  const openModal = () => {
    modalRef.current?.open({
      ...initialFormValues,
    });
  };

  const deleteAccount = async (id: string) => {
    console.log("Deleting account... with id: ", id);
    try {
      const res = (await deleteUser(id)) as { status: number };
      console.log(res);

      if (res.status === 200) {
        setUser({
          _id: "",
          password: "",
          username: "",
          account_type: AccountType.None,
        });
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

      default: // Tourist profile (keeping original layout)
        return (
          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 pt-10 md:grid-cols-3">
            {/* Contact Section */}
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

            {/* Personal Section */}
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

            {/* Payment Section */}
            <div className="space-y-6">
              <h3 className="border-b border-secondary-light_grey pb-2 font-semibold text-accent-dark-blue">
                Payment Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 flex-shrink-0 text-primary-blue" />
                  <span className="text-slate-600">{user.wallet}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Images */}
      <div className="fixed inset-0">
        {imgs.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              transform: "scale(1.1)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Profile Card */}
          <div className="rounded-xl border border-secondary-light_grey bg-secondary-light_grey p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Left Column - Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-center">
                <div className="relative">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-blue to-primary-green shadow-lg">
                    <span className="text-4xl font-bold text-white">
                      {user.username?.[0]?.toUpperCase() || "NA"}
                    </span>
                  </div>
                  <button className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md transition-shadow hover:shadow-lg">
                    <Camera className="h-5 w-5 text-primary-blue" />
                  </button>
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
            <div className="mt-8 flex justify-end">
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
                onDeleteAccount={() => deleteAccount(user._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProf;
