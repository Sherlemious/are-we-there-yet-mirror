import { Form, useLoaderData, useNavigation } from "react-router-dom";
import InputField from "../../shared/components/InputField";
import { fieldNames } from "../../shared/constants/inputNames";
import Button from "../../shared/components/Button";
import GenericDropdown from "../../shared/components/GenericDropdown";
import { useState } from "react";

export default function RegisterForm({ userRole }: { userRole: string }) {
  const navigation = useNavigation();
  const countries = useLoaderData() as { name: { common: string } }[];
  const countryNames = countries.map((country) => country.name.common);

  const isSubmitting = navigation.state === "submitting";

  const [nationality, setNationality] = useState("");

  if (userRole && userRole === "Tourist")
    return (
      <div className="mt-32 space-y-5">
        <Form
          method="POST"
          className="space-y-4 rounded border-2 border-borders-primary p-8"
        >
          <div className="flex items-center gap-4">
            <InputField inputField={fieldNames.email} signedIn={false} />
            <InputField inputField={fieldNames.username} signedIn={false} />
            <InputField inputField={fieldNames.password} signedIn={false} />
            <GenericDropdown
              setNationality={setNationality}
              countryNames={countryNames}
              label={fieldNames.nationality}
            />
          </div>
          <div className="flex gap-4">
            <InputField inputField={fieldNames.mobileNumber} signedIn={false} />
            <InputField inputField={fieldNames.dateOfBirth} signedIn={false} />
            <InputField inputField={fieldNames.occupation} signedIn={false} />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className={customStyles.button}
            onClick={() => console.log("clicked")}
          >
            Submit
          </Button>
          <input type="hidden" name="nationality" value={nationality} />
        </Form>
      </div>
    );
  if (userRole)
    return (
      <div className="mt-1 flex flex-col items-center justify-center gap-2">
        <Form method="POST" className="flex gap-4">
          <div className="space-y-4 rounded border-2 border-borders-primary p-8">
            <InputField inputField={fieldNames.email} signedIn={false} />
            <InputField inputField={fieldNames.username} signedIn={false} />
            <InputField inputField={fieldNames.password} signedIn={false} />
            <Button
              disabled={isSubmitting}
              type="submit"
              className={customStyles.button}
              onClick={() => console.log("clicked")}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  return null;
}

export async function loader() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  return data;
}

const customStyles = {
  button:
    "bg-primary w-full rounded-lg px-4 py-2 font-bold text-white transition-all duration-150 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
};
