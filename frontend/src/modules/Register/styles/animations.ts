export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const formVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: 20,
  },
  visible: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
      opacity: { duration: 0.3, delay: 0.1 },
      y: { duration: 0.3, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -20,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};
