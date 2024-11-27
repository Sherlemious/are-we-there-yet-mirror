import { cn } from "@/lib/utils";
import { UserContext } from "@/modules/shared/store/user-context";
import { AccountType } from "@/modules/shared/types/User.types";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBarDropdown({
  list,
  linkName,
}: {
  list: { name: string; url: string }[];
  linkName: string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHoveringOnDiv, setIsHoveringOnDiv] = useState(false);
  const [, setIsVisible] = useState(false);
  const { user } = useContext(UserContext);

  const { pathname } = useLocation();

  console.log(list);

  function handleDropdownStyles(props: { isActive: boolean }) {
    return cn(
      "block h-full w-full px-10 py-5 font-medium text-white/90 hover:text-yellow-400 duration-200 transition-all",
      props.isActive ? "text-yellow-400" : "text-white/90",
    );
  }

  useEffect(() => {
    setShowDropdown(false);
    setIsHoveringOnDiv(false);
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (showDropdown) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [showDropdown]);

  console.log(pathname);
  console.log(
    user?.account_type === AccountType.TourismGovernor &&
      pathname.includes("activity-categories"),
  );
  console.log(user.account_type, AccountType.Admin);
  console.log(pathname.includes(linkName.toLowerCase()));

  return (
    <div
      className="relative flex h-fit flex-col items-start hover:cursor-pointer"
      onMouseEnter={() => {
        setShowDropdown(true);
        setIsHoveringOnDiv(true);
      }}
      onMouseLeave={() => {
        setShowDropdown(false);
        setIsHoveringOnDiv(false);
      }}
    >
      <div className="flex h-[83px] items-center">
        <NavLink
          to={list[0].url}
          className={
            pathname.includes(linkName.toLowerCase()) ||
            (pathname.includes("museums") &&
              user?.account_type === AccountType.TourismGovernor) ||
            (pathname.includes("/home/admin-dashboard/activity-categories") &&
              user?.account_type === AccountType.Admin &&
              linkName === "Activities")
              ? "hover:drop-shadow-glow drop-shadow-glow py-2 font-medium text-accent-gold transition-all"
              : "font-medium text-black"
          }
        >
          <span
            className={`${isHoveringOnDiv ? "text-accent-gold" : ""} text-sub-headings transition-colors duration-200`}
          >
            {linkName}
          </span>
        </NavLink>
      </div>
      <ul
        className={cn(
          "absolute top-[83px] z-50 min-w-fit list-none overflow-hidden text-nowrap rounded-lg text-start shadow-xl transition-all duration-200",
          showDropdown ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {list.map((item, index) => (
          <li
            key={item.url}
            className={cn(
              "cursor-pointer bg-gray-900/95 text-body",
              index === 0 && "rounded-t-lg",
              index === list.length - 1 && "rounded-b-lg",
              index !== list.length - 1 && "border-b border-gray-700/50",
            )}
          >
            <NavLink
              className={(props: { isActive: boolean }) =>
                handleDropdownStyles(props)
              }
              to={item.url}
              onClick={() => setShowDropdown(false)}
              end
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
