import {
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserType } from "../../shared/types/User.types";
import axiosInstance, {
  setupInterceptors,
} from "../../shared/services/axiosInstance";
import { ApiResponse } from "../../shared/types/Response.types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../shared/store/user-context";

import { imgLinks } from "../../shared/utils/constants";
import NewNavBar from "@/modules/LandingPage/components/NewNavBar";
// import NavigationBar from "@/modules/LandingPage/components/NavigationBar";

export default function RootLayout() {
  const { state } = useLocation();
  const isNewUser = state?.from === "/register";

  const userData = useLoaderData() as UserType;
  const { setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgs = Object.values(imgLinks.landing_page);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userData) setUser(userData);
    else navigate("/register");
  }, [userData, setUser]);

  if (!isMounted) return null;

  return (
    <div className="h-full">
      <div className="absolute inset-0 -z-50">
        {imgs.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* <NavigationBar fontColor={"text-black"} /> */}
      <NewNavBar isNewUser={isNewUser} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/");

  try {
    const response =
      await axiosInstance.get<ApiResponse<{ user: UserType }>>("/auth/me");
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
