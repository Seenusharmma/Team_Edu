"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const revealEase = [0.25, 0.46, 0.45, 0.94] as const;

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.15,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedIn = useRef(false);
  
  const isInView = useInView(ref, { once, amount: threshold });

  useEffect(() => {
    if (once) {
      if (isInView) {
        setIsVisible(true);
      }
    } else {
      if (isInView && !hasAnimatedIn.current) {
        setIsVisible(true);
        hasAnimatedIn.current = true;
      } else if (!isInView && hasAnimatedIn.current) {
        setIsVisible(false);
        hasAnimatedIn.current = false;
      }
    }
  }, [isInView, once]);

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
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
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