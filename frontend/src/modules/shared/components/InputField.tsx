import { capitalizeFirstLetter, getPlaceholder } from "../utils/helpers";

export default function InputField({
  inputField,
  signedIn,
  hasLabel,
  onChange,
}: {
  inputField: string;
  signedIn?: boolean;
  hasLabel?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (hasLabel && signedIn) {
    return (
      <>
        <input
          onChange={onChange}
          name={inputField}
          type="text"
          className={customStyles.input}
          placeholder={getPlaceholder(inputField)}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <label className={customStyles.label} htmlFor={inputField}>
        {capitalizeFirstLetter(inputField)}
      </label>
      <input
        onChange={onChange}
        name={inputField}
        type="text"
        className={customStyles.input}
        placeholder={getPlaceholder(inputField)}
      />
    </div>
  );
}

const customStyles = {
  input:
    "rounded-lg border-2  border-borders-primary px-4 py-2 text-text-primary",
  label: "text-text-primary font-medium",
};
