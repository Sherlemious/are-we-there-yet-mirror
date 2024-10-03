import { Form, useNavigation } from "react-router-dom";
import { getPlaceholder } from "./utils/helpers";

export default function GeneralSettings({
  inputFields,
  description,
}: {
  inputFields: string[];
  description?: string;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="PATCH"
      className="flex flex-col justify-between gap-10 border-2 border-gray-300 px-16 py-8 text-gray-500"
    >
      <h1 className="w-fit border-b-2 border-b-gray-400 pb-1 font-bold">
        General Settings
      </h1>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          {inputFields.map((inputField) => (
            <div
              key={inputField}
              className="flex max-w-fit flex-col justify-center gap-2"
            >
              <label className="w-fit">{inputField}</label>
              <div className="flex gap-2">
                <input
                  name={inputField}
                  type="text"
                  className="rounded-lg border-2 border-gray-200 px-4 py-2"
                  placeholder={getPlaceholder(inputField)}
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-background-button px-2 py-2 font-bold text-white duration-200 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        {inputFields.includes("Name") && (
          <div className="flex flex-col gap-2">
            <label className="w-fit pt-6">Description</label>
            <p className="py-2">{description}</p>
          </div>
        )}
      </div>
    </Form>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(data);

  return null;
}
