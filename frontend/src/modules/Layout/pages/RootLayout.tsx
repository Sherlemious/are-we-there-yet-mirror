import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { AccountType, UserType } from "../../shared/types/User.types";
import axiosInstance from "../../shared/services/axiosInstance";
import { ApiResponse } from "../../shared/types/Response.types";
import { useContext, useEffect } from "react";
import { UserContext } from "../../shared/store/user-context";

export default function RootLayout() {
  const userData = useLoaderData() as UserType;
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData, setUser]);

  if (user.account_type === AccountType.None) return null;

  return (
    <main>
      <Outlet />
    </main>
  );
}

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/register");

  try {
    const response =
      await axiosInstance.get<ApiResponse<{ user: UserType }>>("/auth/me");
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
