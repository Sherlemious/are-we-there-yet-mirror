import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoles } from "@/modules/shared/constants/roles";
import { motion } from "framer-motion";

const userTypes = [
  { id: userRoles.tourist, label: "Tourist" },
  { id: userRoles.advertiser, label: "Advertiser" },
  { id: userRoles.seller, label: "Seller" },
  { id: userRoles.tourGuide, label: "Tour Guide" },
];

export default function FormHeader({
  setUserType,
  userType,
}: {
  setUserType: (value: string) => void;
  userType: string;
}) {
  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="transform transition-all duration-500 ease-in-out"
      >
        <h1 className="mb-2 text-center text-4xl font-bold text-white">
          Are we there yet?
        </h1>
        <h2 className="mb-6 text-center text-2xl text-yellow-400">Almost!</h2>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6 flex transform flex-col gap-2 px-3"
      >
        <Label className="text-white">Who are you?</Label>
        <Select value={userType} onValueChange={handleUserTypeChange}>
          <SelectTrigger className="bg-white bg-opacity-20 text-white">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            {userTypes.map((type) => (
              <SelectItem
                key={type.id}
                value={type.id}
                className="text-lg text-black"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </>
  );
}
