import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../../../assets/logo/Are We There Yet Logo-02.png";
import { returnNavBarContentBasedOnUser } from "../utils/returnNavBarContent";
import { useContext } from "react";
import { UserContext } from "@/modules/shared/store/user-context";
import { NavBarContent } from "../utils/content";
import { AccountType } from "@/modules/shared/types/User.types";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import NavBarDropdown from "./NavBarDropdown";

const styles = {
  nav: "relative z-10 flex h-[10vh] items-center bg-black/10 backdrop-blur-md",
  logo: {
    wrapper: "ml-24",
    image: "h-32 w-40",
  },
  links: {
    list: "flex w-full list-none justify-evenly text-center items-center",
    item: "flex items-center text-sub-headings ",
    link: {
      base: "px-3 py-2 font-medium transition-all duration-200 hover:text-accent-gold hover:drop-shadow-glow",
      active: "text-accent-gold drop-shadow-glow",
      inactive: "text-black",
    },
  },
  actions: {
    wrapper: "mr-5 flex w-[12%] items-center gap-5",
    userIcon:
      "hover:shadow-glow rounded-full bg-accent-gold p-2 transition-all duration-150 hover:cursor-pointer hover:opacity-70",
    button:
      "hover:shadow-glow min-w-fit rounded-2xl bg-accent-gold text-[20px] text-black transition-all duration-150 hover:bg-accent-gold/70 disabled:cursor-not-allowed disabled:opacity-50",
  },
};

export default function NewNavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const navBarItems: NavBarContent = returnNavBarContentBasedOnUser(
    user?.account_type,
  );

  console.log(navBarItems);

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

  return (
    <nav className={styles.nav}>
      {
        <NavLink
          to={user.account_type === AccountType.None ? "/" : "/home"}
          className={styles.logo.wrapper}
        >
          <img
            src={Logo}
            alt="Are We There Yet Logo"
            className={styles.logo.image}
          />
        </NavLink>
      }
      <ul className={styles.links.list}>
        <NavLink
          to={user.account_type === AccountType.None ? "/" : "/home"}
          className={(props) => handleStyles(props)}
          end
        >
          <span className="text-sub-headings">Home</span>
        </NavLink>

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

        {user.account_type !== AccountType.TourismGovernor && (
          <NavLink
            to={
              user.account_type === AccountType.None
                ? "/all-museums"
                : "/home/all-museums"
            }
            className={(props) => handleStyles(props)}
          >
            <span className="text-sub-headings">Historical Places/Museums</span>
          </NavLink>
        )}

        {user.account_type === AccountType.TourismGovernor && (
          <NavBarDropdown
            linkName="Historical Places/Museums"
            list={navBarItems.links[0].list!}
            key={"Historical Places/Museums"}
          />
        )}

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

        {navBarItems?.links?.map((item) => {
          console.log(item.name);
          if (!item.list) {
            return (
              <li key={item.name} className={styles.links.item}>
                <NavLink
                  to={item.url!}
                  className={(props: { isActive: boolean }) =>
                    handleStyles(props)
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            );
          }
          if (
            (user.account_type !== AccountType.Advertiser &&
              user.account_type !== AccountType.Admin &&
              user.account_type !== AccountType.TourismGovernor) ||
            (item.name !== "Activities" &&
              item.name !== "Itineraries" &&
              item.name !== "Historical Places/Museums")
          ) {
            return (
              <NavBarDropdown
                key={item.name}
                list={item.list}
                linkName={item.name}
              />
            );
          }
        })}
      </ul>

      <div className={styles.actions.wrapper}>
        {user.account_type !== AccountType.None && (
          <UserCog
            onClick={() => {
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
            }}
            size={40}
            className={styles.actions.userIcon}
          />
        )}

        <Button
          variant="default"
          onClick={() => {
            if (user.account_type !== AccountType.None) {
              handleClearUser();
              localStorage.removeItem("token");
              toast.success("Logged out successfully");
              navigate("/");
            } else navigate("/register");
          }}
          className={styles.actions.button}
        >
          {user.account_type === AccountType.None ? "Register Now" : "Logout"}
        </Button>
      </div>
    </nav>
  );
}
