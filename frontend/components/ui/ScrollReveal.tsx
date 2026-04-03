"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 50 };
      case "down": return { y: -50 };
      case "left": return { x: 50 };
      case "right": return { x: -50 };
      default: return { y: 50 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}
