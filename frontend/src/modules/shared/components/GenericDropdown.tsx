import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import styles from "../../Register/styles/GenericDropdown.module.css";
import { capitalizeFirstLetter } from "../utils/helpers";

const customStyles = {
  container: "relative w-full",
  label: "text-md block font-medium text-text-primary",
  buttonWrapper: "relative",
  button:
    "w-full rounded-md border-2 border-borders-primary px-4 py-2 text-left text-gray-400 focus:outline-none",
  chevronWrapper: "absolute inset-y-0 right-0 flex items-center pr-2",
  dropdownContainer: `absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base border-2 border-borders-primary text-gray-400 ${styles.customScrollbar}`,
  option:
    "relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100",
};

const GenericDropdown = ({
  countryNames,
  label,
  setNationality,
}: {
  countryNames: string[];
  label: string;
  setNationality: (nationality: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className={customStyles.container}>
      <label className={customStyles.label}>
        {capitalizeFirstLetter(label)}
      </label>
      <div className={customStyles.buttonWrapper}>
        <button
          name="nationality"
          type="button"
          className={`${customStyles.button} ${selectedOption ? "text-text-primary" : "text-gray-400"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || `Select a ${label}`}
          <span className={customStyles.chevronWrapper}>
            {isOpen && <ChevronUp size={20} />}
            {!isOpen && <ChevronDown size={20} />}
          </span>
        </button>

        {isOpen && (
          <div className={customStyles.dropdownContainer}>
            {countryNames.map((name: string) => (
              <div
                key={name}
                className={customStyles.option}
                onClick={() => {
                  setSelectedOption(name);
                  setNationality(name);
                  setIsOpen(false);
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericDropdown;
