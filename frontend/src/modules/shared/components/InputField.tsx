import { fieldNames } from "../constants/inputNames";
import {
  capitalizeFirstLetter,
  getPlaceholder,
  getType,
} from "../utils/helpers";

export default function InputField({
  inputField,
  hasLabel,
  onChange,
  value,
  className,
  defaultValue,
}: {
  inputField: string;
  hasLabel?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  defaultValue?: string;
}) {
  if (hasLabel) {
    return (
      <input
        onChange={onChange}
        name={inputField}
        value={value}
        defaultValue={defaultValue}
        type={getType(inputField)}
        min={inputField === fieldNames.yearsOfExperience ? "0" : undefined}
        className={`${customStyles.input} ${className}`}
        placeholder={getPlaceholder(inputField)}
      />
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
        value={value}
        defaultValue={defaultValue}
        type={getType(inputField)}
        className={`${customStyles.input} ${className}`}
        max={
          inputField === fieldNames.dateOfBirth
            ? new Date().toISOString().slice(0, 10)
            : ""
        }
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
