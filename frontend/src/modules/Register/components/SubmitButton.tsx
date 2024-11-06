import { Button } from "@/components/ui/button";
import { fadeIn } from "../styles/animations";
import { motion } from "framer-motion";

export default function SubmitButton({
  isSubmitting,
  oneOfFieldsIsEmpty,
}: {
  isSubmitting: boolean;
  oneOfFieldsIsEmpty: boolean;
}) {
  return (
    <motion.div variants={fadeIn} className="flex transform flex-col gap-2">
      <Button
        type="submit"
        disabled={isSubmitting || oneOfFieldsIsEmpty}
        className="w-full bg-yellow-500 font-bold text-black hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create my account"}
      </Button>
    </motion.div>
  );
}
