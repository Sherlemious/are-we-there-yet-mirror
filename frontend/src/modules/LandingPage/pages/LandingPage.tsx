import { useEffect, useState } from "react";
import { imgLinks } from "../../shared/utils/constants";
import ImageSlider from "../components/ImageSlider";
import NameAndDescription from "../components/NameAndDescription";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const imgs = Object.values(imgLinks.landing_page);
  const [imgIndex, setImgIndex] = useState(imgs.length - 1);
  const [fontColor, setFontColor] = useState("text-black");

  useEffect(() => {
    if (imgIndex === 0 || imgIndex === 1) {
      setFontColor("text-secondary-white");
    } else {
      setFontColor("text-black");
    }
  }, [imgIndex]);

  return (
    <motion.div className="h-full">
      <AnimatePresence initial={false}>
        <motion.div
          key={imgIndex}
          className="absolute inset-0 -z-10 h-full w-screen"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <img
            src={imgs[imgIndex]}
            className="h-full w-full object-cover"
            alt="landing page"
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex pt-48">
        <NameAndDescription fontColor={fontColor} />
        <ImageSlider setIndex={setImgIndex} />
      </div>
    </motion.div>
  );
}
