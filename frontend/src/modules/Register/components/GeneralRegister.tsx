import { Label } from "@/components/ui/label";
import { fieldNames } from "@/modules/shared/constants/inputNames";
import { motion } from "framer-motion";
import { fadeIn } from "../styles/animations";
import { LoginOrRegisterInput } from "@/modules/shared/components/LoginOrRegisterInput";

export default function GeneralRegister() {
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
    </>
  );
}
