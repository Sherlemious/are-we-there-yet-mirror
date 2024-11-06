import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import { UserContext } from "@/modules/shared/store/user-context";
import { AccountType } from "@/modules/shared/types/User.types";
import Button from "@/modules/shared/components/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import ListItem from "./NavigationDropDown";

export default function NavigationBar({ fontColor }: { fontColor: string }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  function handleStyles(props: { isActive: boolean }) {
    return cn(
      "px-3 py-2  font-medium transition-all duration-200",
      "hover:text-accent-gold ",
      props.isActive ? "text-accent-gold" : fontColor,
    );
  }

  return (
    <div className="z-10 flex items-center bg-secondary-light_grey/50 py-7">
      <div className="flex w-full justify-center">
        <NavigationMenu className="relative ml-52">
          <NavigationMenuList className="flex justify-around space-x-8">
            <NavigationMenuItem className="text-sub-headings">
              <NavLink
                to={user.account_type === AccountType.None ? "/" : "/home"}
                className={(props) => handleStyles(props)}
              >
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Activities
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title="Browse All" href="/activity">
                    View all available activities
                  </ListItem>
                  <ListItem title="Featured" href="/activity/featured">
                    Check out our featured activities
                  </ListItem>
                  <ListItem title="Categories" href="/activity/categories">
                    Browse activities by category
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Historical Places
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title="All Locations" href="/historical-places">
                    Explore all historical locations
                  </ListItem>
                  <ListItem
                    title="Heritage Sites"
                    href="/historical-places/heritage"
                  >
                    Discover heritage sites
                  </ListItem>
                  <ListItem title="Museums" href="/historical-places/museums">
                    Visit our museums
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  handleStyles({ isActive: false }),
                  "bg-transparent hover:bg-transparent",
                  "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                )}
              >
                Itineraries
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title="View All" href="/itineraries">
                    Browse all itineraries
                  </ListItem>
                  <ListItem title="Create New" href="/itineraries/create">
                    Plan your own itinerary
                  </ListItem>
                  <ListItem title="Popular" href="/itineraries/popular">
                    Check out popular routes
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {user.account_type !== AccountType.None && (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    handleStyles({ isActive: false }),
                    "bg-transparent hover:bg-transparent",
                    "text-sub-headings data-[state=open]:bg-transparent data-[state=open]:text-accent-gold",
                  )}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/80 backdrop-blur-sm">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem title="All Products" href="/products">
                      View all products
                    </ListItem>
                    <ListItem title="Featured" href="/products/featured">
                      Featured products
                    </ListItem>
                    <ListItem title="Deals" href="/products/deals">
                      Special deals and offers
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
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
