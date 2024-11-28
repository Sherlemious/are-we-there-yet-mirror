import { imgLinks } from "@/modules/shared/utils/constants";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function Login() {
  const imgs = Object.values(imgLinks.landing_page);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Background Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
              transform: "scale(1.1)",
            }}
          />
        ))}
        <div className="absolute inset-0 h-screen bg-black opacity-50" />
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
