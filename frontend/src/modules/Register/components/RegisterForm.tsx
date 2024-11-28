import { useState, useEffect, useRef, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import { Form, useSubmit } from "react-router-dom";
import { validateFormDataValue } from "../utils/helpers";
import toast from "react-hot-toast";
import { fieldNames } from "../../shared/constants/inputNames";
import { userRoles } from "@/modules/shared/constants/roles";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "@/modules/shared/store/user-context";
import { UserType } from "@/modules/shared/types/User.types";
import { formVariants } from "../styles/animations";
import { apiAddDocs } from "../services/apiAddDocs";
import { handleUserRegistration } from "../services/apiHandleUserRegistration";
import FormHeader from "./FormHeader";
import GeneralRegister from "./GeneralRegister";
import TouristRegister from "./TouristRegister";
import TourGuideDocUpload from "./TourGuideDocUpload";
import AdvertiserOrSellerDocUpload from "./AdvertiserOrSellerDocUpload";
import SubmitButton from "./SubmitButton";
import { apiGetTermsAndConditions } from "../services/apiGetTermsAndConditions";

type NewData = {
  userRole: string;
  username: string;
  email: string;
  password: string;
  job?: string;
  nationality?: string;
  dob?: string;
  mobile_number?: string;
  documentIds?: string[];
  acceptedTerms?: boolean;
};

const RegistrationForm = () => {
  const [userType, setUserType] = useState("");
  const [nationality, setNationality] = useState("");
  const [oneOfFieldsIsEmpty, setOneOfFieldsIsEmpty] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const { countries, terms } = useLoaderData() as {
    countries: { name: { common: string } }[];
    terms: string;
  };

  const navigate = useNavigate();
  const countryNames = countries?.map((country) => country.name.common);
  countryNames.sort();
  const res = useActionData() as {
    status: number;
    data: {
      data: {
        user: UserType;
        jwt: string;
      };
    };
  };

  const [documents, setDocuments] = useState<{
    personalId: File | null;
    certificates: File[];
    taxDocument: File | null;
  }>({
    personalId: null,
    certificates: [],
    taxDocument: null,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (fieldName === "certificates") {
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: [...prev.certificates, ...Array.from(files)],
      }));
    } else {
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: files[0],
      }));
    }

    e.target.value = "";
  };

  useEffect(() => {
    if (res?.status === 200) {
      setUser({
        ...res.data.data.user,
      });
      navigate("/home");
    }
  }, [res]);

  const isSubmitting = navigation.state === "submitting";

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    let requiredFields = ["username", "email", "password"];

    // Add required fields based on user type
    if (userType === userRoles.tourist) {
      requiredFields = [
        ...requiredFields,
        "job",
        "nationality",
        "dob",
        "mobile_number",
      ];
    }

    // Check if any required field is empty
    const hasEmptyFields = requiredFields.some((field) => {
      const value = data[field];
      return !value || (typeof value === "string" && value.trim() === "");
    });

    // Additional check for nationality since it's handled separately
    if (userType === userRoles.tourist && !nationality) {
      setOneOfFieldsIsEmpty(true);
      return;
    }

    setOneOfFieldsIsEmpty(hasEmptyFields);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (oneOfFieldsIsEmpty) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions to continue");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.delete("personalId");
    formData.delete("certificates");
    formData.delete("taxDocument");

    const data = Object.fromEntries(formData);

    const ids = [];

    if (userType !== userRoles.tourist) {
      for (const key in documents) {
        const fileData = new FormData();
        if (
          documents[key as keyof typeof documents] &&
          key !== "certificates"
        ) {
          fileData.append(
            "file",
            documents[key as keyof typeof documents] as Blob,
          );
          const res = await apiAddDocs(fileData);
          ids.push(res.data._id);
        }

        if (key === "certificates") {
          for (const file of documents[
            key as keyof typeof documents
          ] as File[]) {
            const fileData = new FormData();
            fileData.append("file", file);
            const res = await apiAddDocs(fileData);
            ids.push(res.data._id);
          }
        }
      }
    }

    if (!validateFormDataValue(fieldNames.email, data.email as string)) {
      return toast.error("Invalid email address");
    }

    if (!validateFormDataValue(fieldNames.password, data.password as string)) {
      return toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      );
    }

    if (ids.length > 0) {
      formData.append("documentIds", JSON.stringify(ids));
    }
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    formRef.current?.reset();
    setNationality("");
    setOneOfFieldsIsEmpty(true);
    setAcceptedTerms(false);
    setDocuments({
      personalId: null,
      certificates: [],
      taxDocument: null,
    });
    setShowPassword(false);
    setHasPassword(false);
  }, [userType]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEmpty = e.target.value.length === 0;
    setHasPassword(!isEmpty);
    if (isEmpty) {
      setShowPassword(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl rounded-lg bg-black bg-opacity-30 p-8 backdrop-blur-sm"
      >
        <FormHeader setUserType={setUserType} userType={userType} />

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
                  } gap-4 px-3`}
                >
                  {userType !== userRoles.tourist && (
                    <GeneralRegister
                      handlePasswordChange={handlePasswordChange}
                      showPassword={showPassword}
                      hasPassword={hasPassword}
                      setShowPassword={setShowPassword}
                    />
                  )}

                  {userType === userRoles.tourist && (
                    <TouristRegister
                      handlePasswordChange={handlePasswordChange}
                      showPassword={showPassword}
                      hasPassword={hasPassword}
                      setShowPassword={setShowPassword}
                      countryNames={countryNames}
                      setNationality={setNationality}
                      nationality={nationality}
                    />
                  )}

                  {userType === userRoles.tourGuide && (
                    <TourGuideDocUpload
                      setDocuments={setDocuments}
                      documents={documents}
                      handleFileChange={handleFileChange}
                    />
                  )}

                  {(userType === userRoles.advertiser ||
                    userType === userRoles.seller) && (
                    <AdvertiserOrSellerDocUpload
                      setDocuments={setDocuments}
                      documents={documents}
                      handleFileChange={handleFileChange}
                    />
                  )}
                </div>
                <input
                  type="hidden"
                  name="acceptedTerms"
                  value={acceptedTerms.toString()}
                />
                <div className="flex items-center space-x-2 px-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked as boolean)
                    }
                    className="border-2 border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                  <label htmlFor="terms" className="text-sm text-white">
                    I accept the{" "}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-yellow-400 hover:underline"
                    >
                      terms and conditions
                    </button>
                  </label>
                </div>

                <SubmitButton
                  isSubmitting={isSubmitting}
                  oneOfFieldsIsEmpty={oneOfFieldsIsEmpty || !acceptedTerms}
                  logIn={false}
                />
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div
              className="mt-4 text-sm"
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          </DialogContent>
        </Dialog>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-center text-white"
        >
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
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
  const documentIds = [];
  const termsAccepted = true;

  if (
    data.userRole === userRoles.tourGuide ||
    data.userRole === userRoles.advertiser ||
    data.userRole === userRoles.seller
  ) {
    const docs = JSON.parse(data.documentIds as string);
    for (const doc of docs) {
      documentIds.push(doc);
    }
  }

  delete data.documentIds;
  delete data.acceptedTerms;

  const newData = {
    ...data,
    documentIds,
    acceptedTerms: termsAccepted,
  } as NewData;

  if (data.userRole === userRoles.tourist) {
    const res = await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: newData.userRole,
        username: newData.username,
        email: newData.email,
        password: newData.password,
        job: newData.job,
        nationality: newData.nationality,
        dob: newData.dob,
        mobile_number: newData.mobile_number,
        termsAndConditions: newData.acceptedTerms,
      },
      successRedirect: "/tourist-profile",
    });

    return res;
  } else if (data.userRole === userRoles.tourGuide) {
    const res = await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: userRoles.tourGuide,
        username: data.username,
        email: data.email,
        password: data.password,
        attachments: documentIds,
        termsAndConditions: newData.acceptedTerms,
      },
      successRedirect: "/tour-guide-profile",
    });

    return res;
  } else if (data.userRole === userRoles.advertiser) {
    const res = await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: newData.userRole,
        username: newData.username,
        email: newData.email,
        password: newData.password,
        attachments: newData.documentIds,
        termsAndConditions: newData.acceptedTerms,
      },
      successRedirect: "/advertiser-profile",
    });

    return res;
  } else {
    const res = await handleUserRegistration({
      endpoint: "/auth/register",
      requestData: {
        account_type: newData.userRole,
        username: newData.username,
        email: newData.email,
        password: newData.password,
        attachments: newData.documentIds,
        termsAndConditions: newData.acceptedTerms,
      },
      successRedirect: "/seller-profile",
    });
    return res;
  }
}

export async function loader() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  const terms = await apiGetTermsAndConditions();

  return {
    countries: data,
    terms,
  };
}
