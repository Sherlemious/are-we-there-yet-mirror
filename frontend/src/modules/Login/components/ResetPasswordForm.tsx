import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useNavigation } from "react-router";
import { Form } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoginOrRegisterInput } from "@/modules/shared/components/LoginOrRegisterInput";
import { Eye, EyeOff } from "lucide-react";
import { updatePassword } from "@/modules/shared/services/apiUpdatePassword";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "loading";

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [hasValue, setHasValue] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const checkValues = () => {
      const passwordValue = Boolean(passwordRef.current?.value);
      const confirmPasswordValue = Boolean(confirmPasswordRef.current?.value);

      setHasValue({
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
      });

      // Reset showPassword state when fields are cleared
      if (!passwordValue) {
        setShowPassword((prev) => ({ ...prev, password: false }));
      }
      if (!confirmPasswordValue) {
        setShowPassword((prev) => ({ ...prev, confirmPassword: false }));
      }
    };

    const passwordInput = passwordRef.current;
    const confirmPasswordInput = confirmPasswordRef.current;

    if (passwordInput && confirmPasswordInput) {
      passwordInput.addEventListener("input", checkValues);
      confirmPasswordInput.addEventListener("input", checkValues);
    }

    return () => {
      if (passwordInput && confirmPasswordInput) {
        passwordInput.removeEventListener("input", checkValues);
        confirmPasswordInput.removeEventListener("input", checkValues);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Reset password logic here
    const res = await updatePassword(data.password);
    console.log(res);
    if (res.status === 200) {
      navigate("/login");
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-lg bg-black bg-opacity-30 p-8 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="mb-2 text-center text-4xl font-bold text-white">
            Reset Password
          </h1>
          <p className="mb-8 text-center text-xl text-yellow-400">
            Enter your new password
          </p>
        </motion.div>

        <Form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-white">
              New Password
            </label>
            <div className="relative">
              <LoginOrRegisterInput
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                ref={passwordRef}
                className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your new password"
              />
              {hasValue.password && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                >
                  {showPassword.password ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <LoginOrRegisterInput
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                ref={confirmPasswordRef}
                className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Confirm your new password"
              />
              {hasValue.confirmPassword && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              !hasValue.password || !hasValue.confirmPassword || isSubmitting
            }
            className="w-full bg-yellow-500 py-3 font-bold text-black transition-all duration-200 hover:bg-yellow-600"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </Form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordForm;
