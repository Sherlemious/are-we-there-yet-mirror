import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { UserType } from "../../shared/types/User.types";
import axiosInstance, {
  setupInterceptors,
} from "../../shared/services/axiosInstance";
import { ApiResponse } from "../../shared/types/Response.types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../shared/store/user-context";

export default function RootLayout() {
  const userData = useLoaderData() as UserType;
  const { setUser } = useContext(UserContext);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  useEffect(() => {
    if (userData) setUser(userData);
    else navigate("/register");
  }, [userData, setUser]);

  if (!isMounted) return null;

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
