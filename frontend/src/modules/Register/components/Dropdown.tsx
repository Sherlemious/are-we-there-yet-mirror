import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { userRoles } from "../../shared/constants/roles";

const customStyles = {
  container: "flex items-center mx-auto justify-center gap-3 w-full max-w-fit",
  dropdownContainer: "relative w-64 border-2 border-borders-primary rounded-md",
  dropdownButton:
    "w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none ",
  dropdownButtonText: "block truncate",
  dropdownArrowContainer:
    "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",
  dropdownArrow: "w-5 h-5 text-gray-400",
  dropdownMenu:
    "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg",
  dropdownList: " border-2 border-borders-primary rounded-md",
  dropdownItem: "px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-400 ",
  label: "block text-lg font-medium text-text-primary",
};

export default function Dropdown({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = [
    userRoles.tourist,
    userRoles.advertiser,
    userRoles.seller,
    "Tour Guide",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={customStyles.container}>
      <label htmlFor="user-role" className={customStyles.label}>
        Who are you?
      </label>
      <div className={customStyles.dropdownContainer} ref={dropdownRef}>
        <button
          className={customStyles.dropdownButton}
          onClick={toggleDropdown}
        >
          <span
            className={`${customStyles.dropdownButtonText} ${selectedRole ? "text-text-primary" : "text-gray-400"}`}
          >
            {selectedRole || "Role"}
          </span>
          <span className={customStyles.dropdownArrowContainer}>
            <ChevronDown className={customStyles.dropdownArrow} />
          </span>
        </button>
        {isOpen && (
          <div className={customStyles.dropdownMenu}>
            <ul className={customStyles.dropdownList}>
              {roles.map((role, index) => (
                <li
                  key={role}
                  className={`${customStyles.dropdownItem} ${index !== roles.length - 1 ? "border-b-2 border-borders-primary" : ""}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
