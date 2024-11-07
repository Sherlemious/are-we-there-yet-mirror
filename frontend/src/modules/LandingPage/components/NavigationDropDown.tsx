import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = React.forwardRef<
  React.ElementRef<typeof NavLink>,
  React.ComponentPropsWithoutRef<typeof NavLink> & {
    children: React.ReactNode;
    title: string;
  }
>(({ className, title, to, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          to={to}
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-accent-gold/10 hover:text-accent-gold",
            "focus:bg-accent-gold/10 focus:text-accent-gold",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-accent-gold">
            {title}
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ListItem;
