import { useContext } from "react";
import { UserContext } from "../store/user-context";

export function RouteGuard({
  account_types,
  children,
}: {
  account_types: string[];
  children: React.ReactNode;
}) {
  const { user } = useContext(UserContext);

  if (!account_types.includes(user.account_type)) {
    throw new Error("Unauthorized Access to this Page");
  }

  return children;
}
