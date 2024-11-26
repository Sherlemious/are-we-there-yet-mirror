import { motion } from "framer-motion";
import { fadeIn } from "../styles/animations";
import { Label } from "@/components/ui/label";
import { fieldNames } from "@/modules/shared/constants/inputNames";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { LoginOrRegisterInput } from "@/modules/shared/components/LoginOrRegisterInput";

export default function TouristRegister({
  nationality,
  setNationality,
  countryNames,
}: {
  nationality: string;

  setNationality: React.Dispatch<React.SetStateAction<string>>;

  countryNames: string[];
}) {
  return (
    <>
      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <LoginOrRegisterInput
          id="email"
          name={fieldNames.email}
          type="email"
          placeholder="Enter your email"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>

      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="username" className="text-white">
          Username
        </Label>
        <LoginOrRegisterInput
          id="username"
          name={fieldNames.username}
          type="text"
          placeholder="Choose a username"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>

      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <LoginOrRegisterInput
          id="password"
          name={fieldNames.password}
          type="password"
          placeholder="Create a password"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>

      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="nationality" className="text-white">
          Nationality
        </Label>
        <Select value={nationality} onValueChange={setNationality}>
          <SelectTrigger className="bg-white bg-opacity-20 text-white">
            <SelectValue placeholder="Select your nationality" />
          </SelectTrigger>
          <SelectContent>
            {countryNames.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="mobileNumber" className="text-white">
          Mobile Number
        </Label>
        <LoginOrRegisterInput
          id="mobileNumber"
          name={fieldNames.mobileNumber}
          type="tel"
          placeholder="Your mobile number"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>

      <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
        <Label htmlFor="dateOfBirth" className="text-white">
          Date of Birth
        </Label>
        <LoginOrRegisterInput
          id="dateOfBirth"
          name={fieldNames.dateOfBirth}
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="col-span-2 flex transform flex-col gap-2"
      >
        <Label htmlFor="occupation" className="text-white">
          Occupation
        </Label>
        <LoginOrRegisterInput
          id="occupation"
          name={fieldNames.occupation}
          type="text"
          placeholder="Your occupation"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white"
        />
      </motion.div>
    </>
  );
}
