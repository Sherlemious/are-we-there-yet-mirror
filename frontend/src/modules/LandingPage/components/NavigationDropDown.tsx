import { NavLink } from "react-router-dom";

const NavigationDropdown = ({
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  items: { label: string; path: string }[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-0 top-full min-w-[200px] rounded-md bg-black/80 py-2 shadow-lg transition-all duration-200 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className="block px-4 py-2 text-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold"
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavigationDropdown;
