import { Form, useNavigation } from "react-router-dom";
import { getPlaceholder } from "../utils/helpers";
import { CircleUserRound } from "lucide-react";
import Button from "./Button";

export default function GeneralSettings({
  inputFields,
  description,
}: {
  inputFields: string[];
  description?: string;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const isSeller = inputFields.includes("Name");
  const fieldsLength = inputFields.length;

  return (
    <div className={customStyles.outerContainer}>
      <Form method="PATCH" className={customStyles.form}>
        <h1 className={customStyles.h1}>General Settings</h1>

        <div className={`flex gap-3 ${fieldsLength <= 1 ? "flex-col" : ""}`}>
          <div className={`flex gap-1 ${fieldsLength > 1 ? "flex-col" : ""}`}>
            {inputFields.map((inputField) => (
              <div key={inputField} className={customStyles.inputContainer}>
                <label className="w-fit">{inputField}</label>
                <div className="flex gap-2">
                  <input
                    name={inputField}
                    type="text"
                    className={customStyles.input}
                    placeholder={getPlaceholder(inputField)}
                  />
                  {fieldsLength <= 1 && (
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full rounded-lg bg-background-button px-2 py-2 font-bold text-white duration-200 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            ))}
            {fieldsLength > 1 && (
              <Button
                type="submit"
                onClick={() => console.log("clicked", isSubmitting)}
                disabled={isSubmitting}
                className="mt-1 rounded-lg px-2 py-2 font-bold duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update
              </Button>
            )}
          </div>
          {isSeller && (
            <div className="flex flex-col gap-2">
              <label className="w-fit pt-6">Description</label>
              <p className="py-2">{description}</p>
            </div>
          )}
        </div>
      </Form>
      {!isSeller && (
        <CircleUserRound size={350} color="#d1d5db" strokeWidth={1.25} />
      )}
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
  outerContainer:
    "flex items-center gap-40 border-2 border-borders-primary px-16 py-8",
  h1: "w-fit border-b-2 border-b-borders-primary pb-1 ",
  form: "flex flex-col justify-between gap-10 text-text-primary",
  inputContainer: "flex max-w-fit flex-col justify-center gap-2 mt-4",
  input: "rounded-lg border-2 border-gray-200 px-4 py-2 text-text-primary",
};
