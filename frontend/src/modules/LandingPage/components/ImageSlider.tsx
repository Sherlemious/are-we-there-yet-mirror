"use client";

import { motion, AnimatePresence } from "framer-motion";
import { imgLinks } from "../../shared/utils/constants";
import { useRef, useEffect, useState } from "react";

export default function ImageSlider({
  setIndex,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [imgs, setImgs] = useState(Object.values(imgLinks.landing_page));
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const scrollWidth = carouselRef.current?.scrollWidth ?? 0;
    const offsetWidth = carouselRef.current?.offsetWidth ?? 0;

    setWidth(scrollWidth - offsetWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % imgs.length);
      setIndex(activeImg); // Set the index to the current active image before it changes

      setTimeout(() => {
        setImgs((prevImgs) => {
          const [first, ...rest] = prevImgs;
          return [...rest, first];
        });
      }, 0);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgs, activeImg, setIndex]);

  return (
    <motion.div
      ref={carouselRef}
      className="w-2/3 cursor-grab overflow-hidden py-10"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="flex"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {imgs.map((img, index) => (
            <motion.div
              key={img}
              className="relative min-h-[650px] min-w-[550px] object-cover px-5 py-10"
              initial={{
                opacity: 0.5,
                scale: 0.95,
                y: 0,
                x: index === 1 ? "100%" : 0,
              }}
              animate={{
                opacity: index === 0 ? 1 : 0.5,
                scale: index === 0 ? 1.05 : 0.95,
                y: index === 0 ? -40 : 0,
                x: 0,
                zIndex: index === 0 ? 1 : 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 0.8, ease: "easeOut" },
                  x: { duration: 0.8, ease: "easeOut" },
                },
              }}
              exit={{
                opacity: 0.3,
                scale: 0.9,
                y: 20,
                x: "-100%",
                transition: {
                  duration: 0.8,
                  ease: "anticipate",
                },
              }}
            >
              <motion.div
                className="overflow-hidden rounded-[2rem]"
                initial={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                animate={{
                  boxShadow:
                    index === 0
                      ? "0 20px 40px rgba(0,0,0,0.2)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                }}
              >
                <motion.img
                  src={img}
                  alt={`carousel-img-${index}`}
                  className="pointer-events-none h-[650px] w-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{
                    scale: index === 0 ? 1.05 : 1.1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
