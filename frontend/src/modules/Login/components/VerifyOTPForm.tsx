import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useNavigation } from "react-router";
import { Form } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import toast from "react-hot-toast";

const VerifyOTPForm = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const isSubmitting = navigation.state === "loading";
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(otp);

    // Verify OTP logic here
    const resPromise = axiosInstance.post(`/users/verifyOTP`, {
      email: state.email,
      OTP: otp,
    });

    toast.promise(resPromise, {
      loading: "Verifying OTP...",
      success: "OTP verified successfully",
      error: "Failed to verify OTP",
    });

    const res = await resPromise;
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.data.token);
      navigate("/login/forgot-password/reset-password");
    }
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
            Enter OTP
          </h1>
          <p className="mb-8 text-center text-xl text-yellow-400">
            We've sent a code to your email
          </p>
        </motion.div>

        <Form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-center">
              <InputOTP
                value={otp}
                onChange={setOtp}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={1}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400"
                  />
                  <InputOTPSlot
                    index={2}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400"
                  />
                  <InputOTPSlot
                    index={3}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400"
                  />
                  <InputOTPSlot
                    index={4}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400"
                  />
                  <InputOTPSlot
                    index={5}
                    className="rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            type="submit"
            disabled={otp.length !== 6 || isSubmitting}
            className="w-full bg-yellow-500 py-3 font-bold text-black transition-all duration-200 hover:bg-yellow-600"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
        </Form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-center text-white"
        >
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-yellow-400 hover:underline"
            onClick={() => {
              // Resend OTP logic here
            }}
          >
            Resend OTP
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default VerifyOTPForm;
