import { fieldNames } from "../constants/inputNames";
import { userRoles } from "../constants/roles";
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
  account_type,
  wallet,
  hasDOB,
}: {
  inputField: string;
  hasLabel?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  className?: string;
  defaultValue?: string | number;
  account_type?: string;
  wallet?: string;
  hasDOB?: boolean;
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
        disabled={
          (inputField === fieldNames.dateOfBirth && hasDOB) ||
          (account_type === userRoles.tourist &&
            inputField === fieldNames.username) ||
          (inputField === fieldNames.wallet && !!wallet)
        }
        max={
          inputField === fieldNames.dateOfBirth
            ? new Date(new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10)
            : ""
        }
        placeholder={getPlaceholder(inputField)}
      />
    </div>
  );
}

const customStyles = {
  input:
    "rounded-lg border-2  border-borders-primary px-4 py-2 text-text-primary disabled:cursor-not-allowed",
  label: "text-text-primary font-medium",
};
