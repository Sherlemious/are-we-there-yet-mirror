import { Eye, EyeOff } from "lucide-react";
import { LoginOrRegisterInput } from "@/modules/shared/components/LoginOrRegisterInput";
import { fieldNames } from "@/modules/shared/constants/inputNames";

const GeneralRegister = ({
  showPassword,
  setShowPassword,
  hasPassword,
  handlePasswordChange,
}: {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  hasPassword: boolean;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div>
        <label htmlFor="username" className="mb-2 block text-sm text-white">
          Username
        </label>
        <LoginOrRegisterInput
          type="text"
          id="username"
          name={fieldNames.username}
          className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-white">
          Email
        </label>
        <LoginOrRegisterInput
          type="email"
          id="email"
          name={fieldNames.email}
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
            name={fieldNames.password}
            className="w-full rounded-lg border border-white/20 bg-black bg-opacity-30 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
          />
          {hasPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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
      </div>
    </>
  );
};

export default GeneralRegister;
