import { useNavigation } from "react-router";
import { fieldNames } from "../../shared/constants/inputNames";
import InputField from "../../shared/components/InputField";
import { Form, useSubmit } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import GenericDropdown from "../../shared/components/GenericDropdown";
import { useState } from "react";
import Button from "../../shared/components/Button";
import { updateUser } from "../../shared/services/apiUpdateUser";
import { userRoles } from "../../shared/constants/roles";
import type { ActionFunctionArgs } from "react-router-dom";

export default function GeneralSettings({
  account_type,
  countries,
  username,
  email,
  password,
  job,
  userNationality,
  dob,
  mobileNumber,
  wallet,
}: {
  account_type: string;
  countries: { name: { common: string } }[];
  username: string;
  email: string;
  password: string;
  job: string;
  userNationality: string;
  dob: string;
  mobileNumber: string;
  wallet: string;
}) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [nationality, setNationality] = useState<string>(userNationality);
  const [atLeastOneFilled, setAtLeastOneFilled] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);

  const hasDOB = dob !== null;

  const isSubmitting = navigation.state === "submitting";

  const countryNames = countries.map((country) => country.name.common);
  // sort country names alphabetically
  countryNames.sort();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);

    // e.currentTarget.reset();

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
            account_type={userRoles.tourist}
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
                hasDOB={hasDOB}
                className="w-full"
                defaultValue={dob?.split("T")[0]}
                inputField={fieldNames.dateOfBirth}
                hasLabel={false}
              />
              <InputField
                className="w-full"
                defaultValue={job}
                inputField={fieldNames.occupation}
                hasLabel={false}
              />
              <InputField
                className="w-full"
                wallet={wallet}
                defaultValue={wallet}
                inputField={fieldNames.wallet}
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
          <input type="hidden" name="account_type" value={account_type} />
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

export async function action({
  request,
  params,
}: ActionFunctionArgs): Promise<null> {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (!params.id) {
    throw new Error("User ID is missing");
  }
  const res = await updateUser(params.id, data);

  //reload the page with timer
  if (res && typeof res !== "string" && res.status === 200) {
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }

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
