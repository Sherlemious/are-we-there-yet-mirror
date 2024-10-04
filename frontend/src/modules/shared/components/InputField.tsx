import { capitalizeFirstLetter, getPlaceholder } from "../utils/helpers";

export default function InputField({
  inputField,
  signedIn,
}: {
  inputField: string;
  signedIn?: boolean;
}) {
  if (!signedIn) {
    return (
      <div className="flex flex-col">
        <label className={customStyles.label} htmlFor={inputField}>
          {capitalizeFirstLetter(inputField)}
        </label>
        <input
          name={inputField}
          type="text"
          className={customStyles.input}
          placeholder={getPlaceholder(inputField)}
        />
      </div>
    );
  }
  return (
    <>
      <input
        name={inputField}
        type="text"
        className={customStyles.input}
        placeholder={getPlaceholder(inputField)}
      />
    </>
  );
}

const customStyles = {
  input:
    "rounded-lg border-2  border-borders-primary px-4 py-2 text-text-primary",
  label: "text-text-primary font-medium",
};
