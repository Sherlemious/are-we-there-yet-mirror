import { useLoaderData, useNavigation } from "react-router";
import { fieldNames } from "../../shared/constants/inputNames";
import InputField from "../../shared/components/InputField";
import { Form, useSubmit } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import GenericDropdown from "../../shared/components/GenericDropdown";
import { useState, useEffect } from "react";
import Button from "../../shared/components/Button";

export default function GeneralSettings() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [nationality, setNationality] = useState<string>("");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    occupation: "",
    mobileNumber: "",
  });
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const isSubmitting = navigation.state === "submitting";

  const countries = useLoaderData() as { name: { common: string } }[];
  const countryNames = countries.map((country) => country.name.common);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const isEmpty =
      Object.values(formValues).every((value) => !value.trim()) && !nationality;
    setIsFormEmpty(isEmpty);
  }, [formValues, nationality]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //submit form
    submit(e.currentTarget);
    // reset form
    e.currentTarget.reset();
  }

  return (
    <div className={customStyles.outerContainer}>
      <div className="flex justify-evenly">
        <div>
          <h1 className={customStyles.h1}>General Settings</h1>
        </div>

        <Form
          method="PATCH"
          className={customStyles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <CircleUserRound size={300} color="#d1d5db" strokeWidth={1.25} />

          <InputField
            inputField={fieldNames.username}
            hasLabel={false}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <InputField
                inputField={fieldNames.email}
                hasLabel={false}
                signedIn={true}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <InputField
                inputField={fieldNames.password}
                hasLabel={false}
                signedIn={true}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <InputField
                inputField={fieldNames.dateOfBirth}
                hasLabel={false}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
              />
              <InputField
                inputField={fieldNames.occupation}
                hasLabel={false}
                onChange={(e) =>
                  handleInputChange("occupation", e.target.value)
                }
              />
            </div>
            <div className="flex gap-4">
              <InputField
                inputField={fieldNames.mobileNumber}
                hasLabel={false}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
              />
              <GenericDropdown
                setNationality={setNationality}
                countryNames={countryNames}
                label={fieldNames.nationality}
              />
            </div>
          </div>
          <input type="hidden" name="nationality" value={nationality} />
          <Button
            disabled={isSubmitting || isFormEmpty}
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
