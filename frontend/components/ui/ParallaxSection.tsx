"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
  enabled?: boolean;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
  enabled = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, direction === "vertical" ? -100 * speed : 0]);
  const x = useTransform(scrollYProgress, [0, 1], [0, direction === "horizontal" ? -100 * speed : 0]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        x,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxItemProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function ParallaxItem({
  children,
  speed = 50,
  direction = "up",
  className = "",
}: ParallaxItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return [speed, -speed];
      case "down":
        return [-speed, speed];
      case "left":
        return [speed, -speed];
      case "right":
        return [-speed, speed];
      default:
        return [speed, -speed];
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [getTransform()[0], getTransform()[1]]);
  const x = useTransform(scrollYProgress, [0, 1], [direction === "left" || direction === "right" ? getTransform()[0] : 0, direction === "left" || direction === "right" ? getTransform()[1] : 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === "up" || direction === "down" ? y : 0,
        x: direction === "left" || direction === "right" ? x : 0,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, speed = 0.3, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          willChange: "transform",
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
