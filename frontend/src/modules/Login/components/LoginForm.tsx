import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "@/modules/Register/components/SubmitButton";
import { useNavigate, useNavigation } from "react-router";
import { LoginOrRegisterInput } from "@/modules/shared/components/LoginOrRegisterInput";
import toast from "react-hot-toast";
import { handleUserLogin } from "../services/apiLogin";
import { UserContext } from "@/modules/shared/store/user-context";
import { Form, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [oneOfFieldsIsEmpty, setOneOfFieldsIsEmpty] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "loading";

  function handleFormChange(e: React.ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const emailIsEmpty = !data.email;
    const passwordIsEmpty = !data.password;

    setOneOfFieldsIsEmpty(emailIsEmpty || passwordIsEmpty);
    setHasPassword(!passwordIsEmpty);

    if (passwordIsEmpty) setShowPassword(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const resPromise = handleUserLogin(data);

      toast.promise(resPromise, {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: "Username or password is incorrect",
      });

      const res = await resPromise;
      if (res.status === 200) {
        localStorage.setItem("token", res.data.data.jwt);
        setUser(res.data.data.user);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Form Container */}
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
            Are we there yet?
          </h1>
          <p className="mb-8 text-center text-xl text-accent-gold">Almost!</p>
        </motion.div>

        <Form
          className="space-y-4"
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        >
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white">
              Email
            </label>
            <LoginOrRegisterInput
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-white">
              Password
            </label>
            <div className="relative">
              <LoginOrRegisterInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                placeholder="Enter your password"
              />
              {hasPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
            <div className="mt-2 text-right">
              <Link
                to="/login/forgot-password"
                className="text-sm text-yellow-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <SubmitButton
            isSubmitting={isSubmitting}
            oneOfFieldsIsEmpty={oneOfFieldsIsEmpty}
            logIn={true}
          />
        </Form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-center text-white"
        >
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Create account
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
