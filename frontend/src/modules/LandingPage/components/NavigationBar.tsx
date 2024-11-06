import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import { UserContext } from "@/modules/shared/store/user-context";
import { AccountType } from "@/modules/shared/types/User.types";
import Button from "@/modules/shared/components/Button";
import NavigationDropdown from "./NavigationDropDown";

export default function NavigationBar({ fontColor }: { fontColor: string }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [dropdownIndex, setDropdownIndex] = useState(-1);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLAnchorElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Navigation items with their dropdown options
  const navigationItems = [
    {
      label: "Home",
      path: user.account_type === AccountType.None ? "/" : "/home",
      dropdown: [], // Empty array means no dropdown
    },
    {
      label: "Activities",
      path: "/activity",
      dropdown: [
        { label: "Browse All", path: "/activity" },
        { label: "Featured", path: "/activity/featured" },
        { label: "Categories", path: "/activity/categories" },
      ],
    },
    {
      label: "Historical Places",
      path: "/historical-places",
      dropdown: [
        { label: "All Locations", path: "/historical-places" },
        { label: "Heritage Sites", path: "/historical-places/heritage" },
        { label: "Museums", path: "/historical-places/museums" },
      ],
    },
    {
      label: "Itineraries",
      path: "/itineraries",
      dropdown: [
        { label: "View All", path: "/itineraries" },
        { label: "Create New", path: "/itineraries/create" },
        { label: "Popular", path: "/itineraries/popular" },
      ],
    },
    {
      label: "Products",
      path: "/products",
      dropdown: [
        { label: "All Products", path: "/products" },
        { label: "Featured", path: "/products/featured" },
        { label: "Deals", path: "/products/deals" },
      ],
    },
  ];

  const updateIndicator = (index: number) => {
    if (index === -1) {
      const activeLink = linkRefs.current.findIndex((link) =>
        link?.classList.contains("is-active"),
      );
      if (activeLink !== -1) {
        index = activeLink;
      }
    }

    if (index !== -1 && linkRefs.current[index]) {
      const link = linkRefs.current[index];
      const navRect = navRef.current?.getBoundingClientRect() ?? { left: 0 };
      const linkRect = link.getBoundingClientRect();

      setIndicatorStyle({
        left: `${linkRect.left - navRect.left}px`,
        width: `${linkRect.width}px`,
      });
    }
  };

  function handleStyles(props: { isActive: boolean }) {
    const baseStyles =
      "relative text-sub-headings hover:text-accent-gold transition-colors duration-200 ease-in-out";

    if (props.isActive) {
      return `${baseStyles} is-active text-accent-gold underline underline-thickness-2 underline-offset-[8px]`;
    }

    return baseStyles + " " + fontColor;
  }

  useEffect(() => {
    updateIndicator(hoveredIndex);
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    setIndicatorStyle({});
    setHoveredIndex(-1);
    setDropdownIndex(-1);
  };

  return (
    <div className="z-10 flex items-center bg-secondary-light_grey/50 py-7">
      <div className="flex w-full justify-center">
        <nav ref={navRef} className="relative ml-52 flex w-1/2 justify-around">
          <div
            className="absolute bottom-0 h-0.5 bg-accent-gold transition-all duration-200 ease-in-out"
            style={indicatorStyle}
          />

          {navigationItems.map(
            (item, index) =>
              (user.account_type !== AccountType.None || index !== 4) && (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    ref={(el) => (linkRefs.current[index] = el!)}
                    to={item.path}
                    className={(props) => handleStyles(props)}
                  >
                    {item.label}
                  </NavLink>
                  <NavigationDropdown
                    items={item.dropdown}
                    isOpen={dropdownIndex === index}
                    onMouseEnter={() => setDropdownIndex(index)}
                    onMouseLeave={() => setDropdownIndex(-1)}
                  />
                </div>
              ),
          )}
        </nav>
      </div>

      <div className="flex w-[15%] items-center gap-7">
        {user.account_type !== AccountType.None && (
          <UserCog
            onClick={() => {
              if (user.account_type === AccountType.TourGuide) {
                return navigate(`/home/tour-guide-profile/${user._id}`);
              }

              if (user.account_type === AccountType.Admin) {
                return navigate("/home/admin-dashboard");
              }

              return navigate(
                `/home/${user.account_type.toLowerCase()}-profile/${user._id}`,
              );
            }}
            size={45}
            className="rounded-full bg-accent-gold p-2 transition-all duration-150 hover:cursor-pointer hover:opacity-80"
          />
        )}
        {user.account_type === AccountType.None && (
          <Button
            onClick={() => navigate("/register")}
            className="min-w-fit rounded-2xl bg-accent-gold p-2 text-body text-black transition-all duration-150 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Register Now
          </Button>
        )}
      </div>
    </div>
  );
}

// const navigationItemsAdvertiser = [
//   {
//     label: "Home",
//     path: "/home",
//     dropdown: [], // Empty array means no dropdown
//   },
//   {
//     label: "Activities",
//     path: "/activity",
//     dropdown: [
//      all activities
//       my activities
//     ],
//   },
//   {
//     label: "Historical Places",
//     path: "/historical-places",
//     dropdown: [
//      my historical places
// ],
//   },
//   {
//     label: "Itineraries",
//     path: "/itineraries",
//     dropdown: [
//      my itineraries
//     ],
//   },
//   {
//     label: "Products",
//     path: "/products",
//     dropdown: [
//       my products
//     ],
//   },
// ];

// const navigationItemsSeller = [
//   {
//     label: "Home",
//     path: "/home",
//     dropdown: [], // Empty array means no dropdown
//   },
//   {
//     label: "Activities",
//     path: "/activity",
//     dropdown: []
//   },
//   {
//     label: "Historical Places",
//     path: "/historical-places",
//     dropdown: []
//   },
//   {
//     label: "Itineraries",
//     path: "/itineraries",
//     dropdown: [],
//   },
//   {
//     label: "Products",
//     path: "/products",
//     dropdown: [
//       all products
//       my products
//     ],
//   },
// ];

// const navigationItemsTourGuide = [
//   {
//     label: "Home",
//     path: "/home",
//     dropdown: [], // Empty array means no dropdown
//   },
//   {
//     label: "Activities",
//     path: "/activity",
//     dropdown: [
//      all activities
//       my activities
//     ],
//   },
//   {
//     label: "Historical Places",
//     path: "/historical-places",
//     dropdown: [
//      my historical places
// ],
//   },
//   {
//     label: "Itineraries",
//     path: "/itineraries",
//     dropdown: [
//      my itineraries
//     ],
//   },
//   {
//     label: "Products",
//     path: "/products",
//     dropdown: [
//       my products
//     ],
//   },
// ];

// const navigationItemsTourismGovern = [
//   {
//     label: "Home",
//     path: "/home",
//     dropdown: [], // Empty array means no dropdown
//   },
//   {
//     label: "Activities",
//     path: "/activity",
//     dropdown: []
//   },
//   {
//     label: "Historical Places",
//     path: "/historical-places",
//     dropdown: []
//   },
//   {
//     label: "Itineraries",
//     path: "/itineraries",
//     dropdown: []
//   },
//   {
//     label: "Products",
//     path: "/products",
//     dropdown: []
//   },
// {
//     label: "Tags",
//     path: "/products",
//     dropdown: [],
//   },
// ];
