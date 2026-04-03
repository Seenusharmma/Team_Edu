"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { viewportConfig, transitionConfig } from "./framer";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export default function AnimatedSection({
  children,
  className = "",
  variants,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
      transition={transitionConfig}
    >
      {children}
    </motion.section>
  );
}
