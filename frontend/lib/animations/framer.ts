import type { Variants, Transition } from "framer-motion";

export type CustomEase = readonly [number, number, number, number];

export const ease: CustomEase = [0.22, 1, 0.36, 1];

export const transitionConfig: Transition = {
  duration: 0.6,
  ease: ease,
};

export const fastTransitionConfig: Transition = {
  duration: 0.4,
  ease: ease,
};

export const staggerTransition: Transition = {
  duration: 0.6,
  ease: ease,
  staggerChildren: 0.1,
  delayChildren: 0.1,
};

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -50px 0px",
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transitionConfig },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: transitionConfig },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: transitionConfig },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: transitionConfig },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitionConfig },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};
