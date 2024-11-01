import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imgLinks } from "@/modules/shared/utils/constants";
import { useLoaderData, useNavigation } from "react-router";
import { Form, useSubmit } from "react-router-dom";
import { validateFormDataValue } from "../utils/helpers";
import toast from "react-hot-toast";
import { fieldNames } from "../../shared/constants/inputNames";
import { handleUserRegistration } from "../services/apiHandleUserRegistration";
import { userRoles } from "@/modules/shared/constants/roles";
import { motion, AnimatePresence } from "framer-motion";

const imgs = Object.values(imgLinks.landing_page);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const formVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: 20,
  },
  visible: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
      opacity: { duration: 0.3, delay: 0.1 },
      y: { duration: 0.3, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -20,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};

const RegistrationForm = () => {
  const [userType, setUserType] = useState("");
  const [nationality, setNationality] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [oneOfFieldsIsEmpty, setOneOfFieldsIsEmpty] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const countries = useLoaderData() as { name: { common: string } }[];

  const countryNames = countries.map((country) => country.name.common);
  countryNames.sort();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const userTypes = [
    { id: userRoles.tourist, label: "Tourist" },
    { id: userRoles.advertiser, label: "Advertiser" },
    { id: userRoles.seller, label: "Seller" },
    { id: userRoles.tourGuide, label: "Tour Guide" },
  ];

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    for (const key in data) {
      if (data[key] === "") {
        setOneOfFieldsIsEmpty(true);
        return;
      }
    }

    setOneOfFieldsIsEmpty(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!validateFormDataValue(fieldNames.email, data.email as string)) {
      return toast.error("Invalid email address");
    }

    if (!validateFormDataValue(fieldNames.password, data.password as string)) {
      return toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      );
    }

    if (
      userType === "tourist" &&
      !validateFormDataValue(
        fieldNames.mobileNumber,
        data.mobileNumber as string,
      )
    ) {
      return toast.error("Invalid mobile number");
    }

    submit(e.currentTarget);
  };

  useEffect(() => {
    formRef.current?.reset();
    setNationality("");
    setOneOfFieldsIsEmpty(true);
  }, [userType]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {imgs.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              transform: "scale(1.1)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl rounded-lg bg-black bg-opacity-30 p-8 backdrop-blur-sm"
      >
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
          className="mb-6 flex transform flex-col gap-2"
        >
          <Label className="text-white">Who are you?</Label>
          <Select value={userType} onValueChange={handleUserTypeChange}>
            <SelectTrigger className="bg-white bg-opacity-20 text-white">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {userTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence mode="wait">
          {userType && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <Form
                ref={formRef}
                method="POST"
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                className="transform space-y-4"
              >
                <input type="hidden" name="userRole" value={userType} />
                {userType === userRoles.tourist && (
                  <input
                    type="hidden"
                    name={fieldNames.nationality}
                    value={nationality}
                  />
                )}

                <div
                  className={`grid ${
                    userType === userRoles.tourist
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  } gap-4`}
                >
                  <motion.div
                    variants={fadeIn}
                    className="flex transform flex-col gap-2"
                  >
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name={fieldNames.email}
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="bg-white bg-opacity-20 text-white placeholder-white"
                    />
                  </motion.div>

                  <motion.div
                    variants={fadeIn}
                    className="flex transform flex-col gap-2"
                  >
                    <Label htmlFor="username" className="text-white">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name={fieldNames.username}
                      type="text"
                      placeholder="Choose a username"
                      required
                      className="bg-white bg-opacity-20 text-white placeholder-white"
                    />
                  </motion.div>

                  <motion.div
                    variants={fadeIn}
                    className="flex transform flex-col gap-2"
                  >
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name={fieldNames.password}
                      type="password"
                      placeholder="Create a password"
                      required
                      className="bg-white bg-opacity-20 text-white placeholder-white"
                    />
                  </motion.div>

                  {userType === userRoles.tourist && (
                    <>
                      <motion.div
                        variants={fadeIn}
                        className="flex transform flex-col gap-2"
                      >
                        <Label htmlFor="nationality" className="text-white">
                          Nationality
                        </Label>
                        <Select
                          value={nationality}
                          onValueChange={setNationality}
                        >
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

                      <motion.div
                        variants={fadeIn}
                        className="flex transform flex-col gap-2"
                      >
                        <Label htmlFor="mobileNumber" className="text-white">
                          Mobile Number
                        </Label>
                        <Input
                          id="mobileNumber"
                          name={fieldNames.mobileNumber}
                          type="tel"
                          placeholder="Your mobile number"
                          required
                          className="bg-white bg-opacity-20 text-white placeholder-white"
                        />
                      </motion.div>

                      <motion.div
                        variants={fadeIn}
                        className="flex transform flex-col gap-2"
                      >
                        <Label htmlFor="dateOfBirth" className="text-white">
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          name={fieldNames.dateOfBirth}
                          type="date"
                          required
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
                        <Input
                          id="occupation"
                          name={fieldNames.occupation}
                          type="text"
                          placeholder="Your occupation"
                          required
                          className="bg-white bg-opacity-20 text-white placeholder-white"
                        />
                      </motion.div>
                    </>
                  )}
                </div>

                <motion.div
                  variants={fadeIn}
                  className="flex transform flex-col gap-2"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting || oneOfFieldsIsEmpty}
                    className="w-full bg-yellow-500 font-bold text-black hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating account..." : "Create my account"}
                  </Button>
                </motion.div>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-center text-white"
        >
          Already have an account?
          <a href="#" className="ml-2 text-yellow-400 hover:underline">
            Sign in
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.userRole === userRoles.tourist) {
    return await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
        job: data.occupation,
        nationality: data.nationality,
        dob: data[fieldNames.dateOfBirth],
        mobile_number: data[fieldNames.mobileNumber],
      },
      successRedirect: "/tourist-profile",
    });
  } else if (data.userRole === userRoles.tourGuide) {
    return await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: userRoles.tourGuide,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/tour-guide-profile",
    });
  } else if (data.userRole === userRoles.advertiser) {
    return await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/advertiser-profile",
    });
  } else {
    return await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/seller-profile",
    });
  }
}

export async function loader() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  return data;
}
