"use client";

import { motion, useReducedMotion } from "framer-motion";

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
};

export default function MotionReveal({
  children,
  className,
  delayMs = 0,
  once = true,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18, margin: "0px 0px -12% 0px" }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delayMs / 1000,
            }
      }
    >
      {children}
    </motion.div>
  );
}

