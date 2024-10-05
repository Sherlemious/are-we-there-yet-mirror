import { useLoaderData, useNavigation } from "react-router";
import { fieldNames } from "../../shared/constants/inputNames";
import InputField from "../../shared/components/InputField";
import { Form, useSubmit } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import GenericDropdown from "../../shared/components/GenericDropdown";
import { useState } from "react";
import Button from "../../shared/components/Button";
import { useSelector } from "react-redux";

export default function GeneralSettings() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [nationality, setNationality] = useState<string>("");
  const [atLeastOneFilled, setAtLeastOneFilled] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  const countries = useLoaderData() as { name: { common: string } }[];
  const countryNames = countries.map((country) => country.name.common);
  // sort country names alphabetically
  countryNames.sort();

  interface UserState {
    username: string;
    email: string;
    password: string;
    dateOfBirth: string;
    occupation: string;
    mobileNumber: string;
    nationality: string;
  }

  const {
    username,
    email,
    password,
    dateOfBirth,
    occupation,
    mobileNumber,
    nationality: userNationality,
  } = useSelector((state: { user: UserState }) => state.user);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
    e.currentTarget.reset();
    setResetDropdown(true);
    setNationality("");
    setAtLeastOneFilled(false);
  }

  const handleResetComplete = () => {
    setResetDropdown(false);
  };

  function handleFormChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Include nationality in the form change check
    if (nationality) {
      setAtLeastOneFilled(true);
      return;
    }

    for (const key in data) {
      if (data[key] !== "") {
        setAtLeastOneFilled(true);
        return;
      }
    }
    setAtLeastOneFilled(false);
  }

  // Handle nationality change separately
  function handleNationalityChange(value: string) {
    setNationality(value);
    setAtLeastOneFilled(value !== "");
  }

  return (
    <div className={customStyles.outerContainer}>
      <div className="flex justify-evenly">
        <div>
          <h1 className={customStyles.h1}>General Settings</h1>
        </div>

        <Form
          onChange={(e) => handleFormChange(e)}
          method="PATCH"
          className={customStyles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <CircleUserRound size={300} color="#d1d5db" strokeWidth={1.25} />

          <InputField
            defaultValue={username}
            inputField={fieldNames.username}
            hasLabel={false}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <InputField
                defaultValue={email}
                inputField={fieldNames.email}
                hasLabel={false}
              />
              <InputField
                defaultValue={password}
                inputField={fieldNames.password}
                hasLabel={false}
              />
            </div>
            <div className="flex flex-col gap-4">
              <InputField
                className="w-full"
                defaultValue={dateOfBirth}
                inputField={fieldNames.dateOfBirth}
                hasLabel={false}
              />
              <InputField
                className="w-full"
                defaultValue={occupation}
                inputField={fieldNames.occupation}
                hasLabel={false}
              />
            </div>
            <div className="flex gap-4">
              <InputField
                defaultValue={mobileNumber}
                inputField={fieldNames.mobileNumber}
                hasLabel={false}
              />
              <GenericDropdown
                defaultValue={userNationality}
                setNationality={handleNationalityChange}
                countryNames={countryNames}
                label={fieldNames.nationality}
                shouldReset={resetDropdown}
                onResetComplete={handleResetComplete}
              />
            </div>
          </div>
          <input type="hidden" name="nationality" value={nationality} />
          <Button
            disabled={isSubmitting || !atLeastOneFilled}
            type="submit"
            onClick={() => {}}
            className={customStyles.button}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
}

const customStyles = {
  outerContainer: "items-center border-2 border-borders-primary px-16 py-8",
  h1: "w-fit border-b-2 border-b-borders-bottomBorder pb-1 ",
  form: "flex items-center gap-2 flex-col justify-between text-text-primary",
  inputContainer: "flex max-w-fit flex-col justify-center gap-2 mt-2",
  button:
    "w-full rounded-lg px-4 py-2 font-bold text-white transition-all duration-150 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
};
