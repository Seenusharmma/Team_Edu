"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: "y" | "x";
  className?: string;
}

export function ParallaxElement({ children, speed = 0.5, direction = "y", className }: ParallaxElementProps) {
  const { scrollYProgress } = useScroll();
  
  const motionValue: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "y" 
      ? [`${speed * 50}px`, `${-speed * 50}px`] 
      : [`${speed * 50}px`, `${-speed * 50}px`]
  );

  return (
    <motion.div style={{ [direction]: motionValue }} className={className}>
      {children}
    </motion.div>
  );
}

interface ParallaxFloatProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxFloat({ children, speed = 0.5, className }: ParallaxFloatProps) {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -speed * 80, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + speed * 0.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div style={{ y, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxBackground({ children, className }: { children: ReactNode; className?: string }) {
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.5]);

  return (
    <motion.div style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
