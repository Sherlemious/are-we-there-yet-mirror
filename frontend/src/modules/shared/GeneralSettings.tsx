import { Form, useNavigation } from 'react-router-dom';
import { getPlaceholder } from './utils/helpers';

export default function GeneralSettings({ inputFields, description }: { inputFields: string[]; description?: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form
      method="PATCH"
      className="py-8 px-16 flex flex-col gap-10 justify-between text-gray-500 border-2 border-gray-300"
    >
      <h1 className=" border-b-2 font-bold border-b-gray-400 w-fit pb-1">General Settings</h1>

      <div className="flex flex-col  gap-3">
        <div className="flex gap-1">
          {inputFields.map((inputField) => (
            <div key={inputField} className="flex max-w-fit  flex-col gap-2 justify-center">
              <label className="w-fit">{inputField}</label>
              <div className="flex gap-2">
                <input
                  name={inputField}
                  type="text"
                  className="border-2 rounded-lg border-gray-200  py-2 px-4"
                  placeholder={getPlaceholder(inputField)}
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="rounded-lg px-2 py-2 bg-gray-200 hover:opacity-60 duration-200 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        {inputFields.includes('Name') && (
          <div className="flex flex-col gap-2">
            <label className="w-fit pt-6">Description</label>
            <p className="py-2 ">{description}</p>
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
