import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";

export default function Register() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RegisterForm />
    </motion.div>
  );
}
