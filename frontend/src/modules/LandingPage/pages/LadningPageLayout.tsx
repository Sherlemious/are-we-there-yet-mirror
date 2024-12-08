import { useEffect, useState } from "react";
// import NavigationBar from "../components/NavigationBar";
import { imgLinks } from "@/modules/shared/utils/constants";
import { Outlet } from "react-router";
import NewNavBar from "../components/NewNavBar";

export default function LandingPageLayout() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgs = Object.values(imgLinks.landing_page);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

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
      <NewNavBar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
