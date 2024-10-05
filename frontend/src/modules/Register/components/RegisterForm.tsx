import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import InputField from "../../shared/components/InputField";
import { fieldNames } from "../../shared/constants/inputNames";
import Button from "../../shared/components/Button";
import GenericDropdown from "../../shared/components/GenericDropdown";

import { useState } from "react";
import toast from "react-hot-toast";
import { handleUserRegistration } from "../services/apiHandleUserRegistration";
import { validateFormDataValue } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice";

export default function RegisterForm({ userRole }: { userRole: string }) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const dispatch = useDispatch();

  const countries = useLoaderData() as { name: { common: string } }[];
  const countryNames = countries.map((country) => country.name.common);
  // sort country names alphabetically
  countryNames.sort();

  const [resetDropdown, setResetDropdown] = useState(false);
  const [oneOfFieldsIsEmpty, setOneOfFieldsIsEmpty] = useState(true);

  const isSubmitting = navigation.state === "submitting";

  const [nationality, setNationality] = useState("");

  const handleResetComplete = () => {
    setResetDropdown(false);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    //validation  /////////////////////////
    if (!validateFormDataValue(fieldNames.email, data.email as string)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validateFormDataValue(fieldNames.password, data.password as string)) {
      toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      );
      return;
    }

    ////////////////////////////////////////
    //save user data to redux store
    dispatch(setUser(data));

    //submit form
    submit(e.currentTarget);
    // reset form
    e.currentTarget.reset();
    //reset dropdown to default value
    setResetDropdown(true);
    //set all fields empty to true
    setOneOfFieldsIsEmpty(true);
  }

  function handleFormChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Loop over data to check if any of the fields are empty
    for (const key in data) {
      if (data[key] === "") {
        setOneOfFieldsIsEmpty(true);
        return;
      }
    }

    // If all fields are filled, set allFieldsEmpty to false
    setOneOfFieldsIsEmpty(false);
  }

  if (userRole && userRole === "Tourist")
    return (
      <div className="mt-32 space-y-5">
        <Form
          onChange={(e) => handleFormChange(e)}
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
          className="space-y-4 rounded border-2 border-borders-primary p-8"
        >
          <div className="flex items-center gap-4">
            <InputField inputField={fieldNames.email} />
            <InputField inputField={fieldNames.username} />
            <InputField inputField={fieldNames.password} />
            <GenericDropdown
              setNationality={setNationality}
              countryNames={countryNames}
              label={fieldNames.nationality}
              shouldReset={resetDropdown}
              onResetComplete={handleResetComplete}
            />
          </div>
          <div className="flex gap-4">
            <InputField inputField={fieldNames.mobileNumber} />
            <InputField inputField={fieldNames.dateOfBirth} />
            <InputField inputField={fieldNames.occupation} />
          </div>
          <input type="hidden" name="nationality" value={nationality} />
          <input type="hidden" name="userRole" value={userRole} />
          <Button
            disabled={isSubmitting || oneOfFieldsIsEmpty}
            type="submit"
            className={customStyles.button}
            onClick={() => console.log("clicked")}
          >
            Create my account
          </Button>
        </Form>
      </div>
    );
  if (userRole)
    return (
      <div className="mt-1 flex flex-col items-center justify-center gap-2">
        <Form
          onChange={(e) => handleFormChange(e)}
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
          className="flex gap-4"
        >
          <div className="space-y-4 rounded border-2 border-borders-primary p-8">
            <InputField inputField={fieldNames.email} />
            <InputField inputField={fieldNames.username} />
            <InputField inputField={fieldNames.password} />
            <Button
              disabled={isSubmitting || oneOfFieldsIsEmpty}
              type="submit"
              className={customStyles.button}
              onClick={() => console.log("clicked")}
            >
              Create my account
            </Button>
            <input type="hidden" name="userRole" value={userRole} />
          </div>
        </Form>
      </div>
    );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.userRole === "Tourist") {
    return await handleUserRegistration({
      url: "https://are-we-there-yet-mirror.onrender.com/api/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
        job: data.occupation,
        nationality: data.nationality,
        dob: data.dateOfBirth,
      },
      successRedirect: "/tourist-profile",
    });
  } else if (data.userRole === "Tour Guide") {
    return await handleUserRegistration({
      url: "https://are-we-there-yet-mirror.onrender.com/api/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/tour-guide-profile",
    });
  } else if (data.userRole === "Adviser") {
    return await handleUserRegistration({
      url: "https://are-we-there-yet-mirror.onrender.com/api/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/adviser-profile",
    });
  } else {
    return await handleUserRegistration({
      url: "https://are-we-there-yet-mirror.onrender.com/api/auth/register",
      requestData: {
        account_type: data.userRole,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      successRedirect: "/seller-profile",
    });
  }

  return null;
}

export async function loader() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  return data;
}

const customStyles = {
  button:
    "w-full rounded-lg px-4 py-2 font-bold text-white transition-all duration-150 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
};
