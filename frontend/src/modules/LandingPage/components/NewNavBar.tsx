import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Logo from "../../../../../assets/logo/Are We There Yet Logo-02.png";
import { returnNavBarContentBasedOnUser } from "../utils/returnNavBarContent";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/modules/shared/store/user-context";
import { NavBarContent } from "../utils/content";
import { AccountType } from "@/modules/shared/types/User.types";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import NavBarDropdown from "./NavBarDropdown";
import CurrencySelect from "./CurrencySelect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavBarTutorial from "./NavBarTut";

const styles = {
  nav: "relative z-10 flex h-[13vh] items-center bg-black/10 backdrop-blur-md",
  logo: {
    wrapper: "flex justify-center ml-24",
    image: "h-32 w-40",
  },
  links: {
    list: "flex w-full list-none justify-evenly text-center items-center",
    item: "flex items-center text-sub-headings",
    link: {
      base: "px-3 py-2 font-medium transition-all duration-200 hover:text-accent-gold hover:drop-shadow-glow",
      active: "text-accent-gold drop-shadow-glow",
      inactive: "text-black",
    },
  },
  actions: {
    wrapper: "mr-5 flex items-center gap-4",
    userIcon:
      "hover:shadow-glow rounded-full  p-2 transition-all duration-150 hover:cursor-pointer",
    button:
      "min-w-[180px] rounded-xl bg-accent-gold text-[20px] text-black font-semibold py-4 transition-all duration-200 hover:bg-accent-gold hover:bg-accent-dark-blue hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-50",
    buttonAnimated:
      "min-w-[180px] rounded-xl bg-accent-gold text-2xl text-black py-6 transition-all duration-200 hover:bg-accent-gold hover:bg-accent-dark-blue hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-50 motion-safe:animate-bounce",
    dropdownContent: "border-accent-gold bg-white min-w-[180px]",
    dropdownItem:
      "text-lg font-medium hover:bg-accent-gold hover:text-black focus:bg-accent-gold focus:text-black",
  },
};

export default function NewNavBar({
  isNewUser = false,
}: {
  isNewUser: boolean;
}) {
  console.log("NewNavBar isNewUser", isNewUser);

  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (isNewUser) {
      setShowTutorial(true);
    }
  }, [isNewUser]);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const navBarItems: NavBarContent = returnNavBarContentBasedOnUser(
    user?.account_type,
  );

  function handleClearUser() {
    setUser({
      _id: "",
      password: "",
      username: "",
      account_type: AccountType.None,
      accepted: false,
      rejected: false,
      deletionRequested: false,
      termsAndConditions: false,
    });
  }

  function handleStyles(props: { isActive: boolean }) {
    return cn(
      styles.links.link.base,
      props.isActive ? styles.links.link.active : styles.links.link.inactive,
    );
  }

  function handleProfileNavigation() {
    setIsOpen(false);
    if (user.account_type === AccountType.TourGuide) {
      return navigate(`/home/tour-guide-profile/${user._id}`);
    }
    if (user.account_type === AccountType.TourismGovernor) {
      return navigate(`/home/tourism-governor-profile/${user._id}`);
    }
    if (user.account_type === AccountType.Admin) {
      return navigate("/home/admin-dashboard");
    }
    return navigate(
      `/home/${user.account_type.toLowerCase()}-profile/${user._id}`,
    );
  }

  function handleLogout() {
    handleClearUser();
    setIsOpen(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  }

  const getOtherItems = () => {
    const otherItems = navBarItems?.links?.filter(
      (item) =>
        !item.list &&
        item.name !== "Home" &&
        item.name !== "Activities" &&
        item.name !== "Historical Places" &&
        item.name !== "Itineraries",
    );
    return otherItems || [];
  };

  return (
    <>
      <nav className={styles.nav}>
        <NavLink to="/home" className={styles.logo.wrapper}>
          {navigation.state === "loading" ? (
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent-gold border-t-transparent"></span>
          ) : (
            <img
              src={Logo}
              alt="Are We There Yet Logo"
              className={styles.logo.image}
            />
          )}
        </NavLink>
        <div className="flex w-full items-center">
          <ul className={styles.links.list}>
            {/* Activities Section */}
            {user.account_type !== AccountType.Advertiser &&
              user.account_type !== AccountType.Admin && (
                <NavLink
                  to={
                    user.account_type === AccountType.None
                      ? "/all-activities"
                      : "/home/all-activities"
                  }
                  className={(props) => handleStyles(props)}
                >
                  <span className="text-sub-headings">Activities</span>
                </NavLink>
              )}

            {user.account_type === AccountType.Advertiser && (
              <NavBarDropdown
                linkName="Activities"
                list={navBarItems.links[0].list!}
                key={"Activities"}
              />
            )}

            {user.account_type === AccountType.Admin && (
              <NavBarDropdown
                linkName="Activities"
                list={navBarItems.links[0].list!}
                key={"Activities"}
              />
            )}

            {/* Historical Places/Museums Section */}
            {user.account_type !== AccountType.TourismGovernor && (
              <NavLink
                to={
                  user.account_type === AccountType.None
                    ? "/all-museums"
                    : "/home/all-museums"
                }
                className={(props) => handleStyles(props)}
              >
                <span className="text-sub-headings">Historical Places</span>
              </NavLink>
            )}

            {user.account_type === AccountType.TourismGovernor && (
              <NavBarDropdown
                linkName="Historical Places"
                list={navBarItems.links[0].list!}
                key={"Historical Places"}
              />
            )}

            {/* Itineraries Section */}
            {user.account_type !== AccountType.TourGuide &&
              user.account_type !== AccountType.Admin && (
                <NavLink
                  to={
                    user.account_type === AccountType.None
                      ? "/all-itineraries"
                      : "/home/all-itineraries"
                  }
                  className={(props) => handleStyles(props)}
                >
                  <span className="text-sub-headings">Itineraries</span>
                </NavLink>
              )}

            {user.account_type === AccountType.Admin && (
              <NavBarDropdown
                linkName="Itineraries"
                list={navBarItems.links[2].list!}
                key={"Itineraries"}
              />
            )}

            {/* All NavBar Dropdown Items */}
            {navBarItems?.links?.map((item) => {
              if (
                item.list &&
                item.name !== "Activities" &&
                item.name !== "Historical Places" &&
                (item.name !== "Itineraries" ||
                  user.account_type === AccountType.TourGuide)
              ) {
                return (
                  <NavBarDropdown
                    key={item.name}
                    linkName={item.name}
                    list={item.list}
                  />
                );
              }
              return null;
            })}

            {user.account_type === AccountType.Tourist && (
              <NavLink
                to="/home/orders"
                className={(props) => handleStyles(props)}
              >
                <span className="text-sub-headings">My Orders</span>
              </NavLink>
            )}

            {/* Other Items as Individual NavLinks */}
            {getOtherItems().map((item) => (
              <NavLink
                key={item.name}
                to={item.url!}
                className={(props) => handleStyles(props)}
              >
                <span className="text-sub-headings">{item.name}</span>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className={styles.actions.wrapper}>
          {!pathname.includes("/login") && pathname !== "/register" && (
            <CurrencySelect />
          )}
          {user.account_type !== AccountType.None && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownMenu open={isOpen}>
                <DropdownMenuTrigger className="focus:outline-none">
                  <UserCog
                    size={50}
                    className={`${styles.actions.userIcon} ${isOpen ? "bg-accent-dark-blue text-accent-gold" : "bg-accent-gold"}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={styles.actions.dropdownContent}
                >
                  <DropdownMenuItem
                    onClick={handleProfileNavigation}
                    className={styles.actions.dropdownItem}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className={styles.actions.dropdownItem}
                  >
                    Logout
                  </DropdownMenuItem>
                  {user.account_type === AccountType.Admin && (
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/home/admin-dashboard/admin-complaints");
                      }}
                      className={styles.actions.dropdownItem}
                    >
                      My Complaints
                    </DropdownMenuItem>
                  )}
                  {user.account_type === AccountType.Tourist && (
                    <DropdownMenuItem
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/home/my-complaints");
                      }}
                      className={styles.actions.dropdownItem}
                    >
                      My Complaints
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {pathname !== "/register" &&
            !pathname.includes("/login") &&
            user.account_type === AccountType.None && (
              <Button
                variant="default"
                onClick={() => navigate("/login")}
                className={styles.actions.buttonAnimated}
              >
                Get Started
              </Button>
            )}
        </div>
      </nav>
      <NavBarTutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        accountType={user.account_type}
        navLinks={navBarItems}
      />
    </>
  );
}
