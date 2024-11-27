import { Button } from "@/components/ui/button";
import { fadeIn } from "../styles/animations";
import { motion } from "framer-motion";

export default function SubmitButton({
  isSubmitting,
  oneOfFieldsIsEmpty,
  logIn,
}: {
  isSubmitting: boolean;
  oneOfFieldsIsEmpty: boolean;
  logIn: boolean;
}) {
  return (
    <motion.div
      variants={fadeIn}
      className={`flex transform flex-col gap-2 ${!logIn ? "px-3" : ""}`}
    >
      <Button
        type="submit"
        disabled={isSubmitting || oneOfFieldsIsEmpty}
        className="w-full bg-yellow-500 font-bold text-black transition-all duration-200 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? logIn
            ? "Signing in..."
            : "Creating Your Account..."
          : logIn
            ? "Sign in"
            : "Sign up"}
      </Button>
    </motion.div>
  );
}
