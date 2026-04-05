"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import CountUpStats from "@/components/home/CountUpStats";
import TrustedBySchools from "@/components/home/TrustedBySchools";
import { theme } from "@/lib/theme";
import About from "./About";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import { transitionConfig } from "@/lib/animations/framer";

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transitionConfig },
};

const laptopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroBg1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroBg1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const heroBg1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.6, 0.3]);
  
  const heroBg2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroBg2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroBg2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.6, 0.3]);

  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <main
      ref={containerRef}
      className="relative"
      style={{ backgroundColor: theme.colors.pageBackground }}
    >
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="hero-bg-1 absolute -left-24 top-10 h-48 w-48 rounded-full sm:top-16 sm:h-72 sm:w-72"
            style={{
              backgroundColor: theme.colors.accentSoft,
              filter: "blur(80px)",
              y: heroBg1Y,
              scale: heroBg1Scale,
              opacity: heroBg1Opacity,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="hero-bg-2 absolute bottom-0 right-0 h-56 w-56 rounded-full sm:h-80 sm:w-80"
            style={{
              backgroundColor: theme.colors.accentWarm,
              filter: "blur(80px)",
              y: heroBg2Y,
              scale: heroBg2Scale,
              opacity: heroBg2Opacity,
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <motion.div
          className="mx-auto flex w-full max-w-7xl items-center px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pt-36"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <div className="grid w-full items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-heading"
                style={{ color: theme.colors.textPrimary }}
              >
                Accelerate Your Learning with{" "}
                <span
                  className="inline-block"
                  style={{
                    color: theme.colors.accent,
                    textShadow: `0 0 60px ${theme.colors.accent}50`,
                  }}
                >
                  AI Power
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed sm:mt-8 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl"
                style={{ color: theme.colors.textSecondary }}
              >
                Master concepts faster, save hours of study time, and achieve better results with our intelligent learning assistant that adapts to your unique needs.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start"
              >
                <motion.a
                  href="/contact"
                  className="group w-full rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-auto text-center"
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.white,
                    boxShadow: `0 15px 50px ${theme.colors.accent}50`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started Free
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.a>

                <motion.a
                  href="#how-it-works"
                  className="w-full rounded-2xl border-2 px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-2 sm:w-auto text-center"
                  style={{
                    borderColor: theme.colors.textPrimary,
                    color: theme.colors.textPrimary,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Watch Demo
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              variants={laptopVariants}
              className="relative mx-auto w-full max-w-[40rem]"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -80]),
                scale: useTransform(scrollYProgress, [0, 1], [1, 0.95]),
              }}
            >
              <div
                className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full border blur-sm lg:block"
                style={{
                  borderColor: theme.colors.whiteBorder,
                  backgroundColor: theme.colors.whiteGlass,
                }}
              />
              <div
                className="absolute -right-4 bottom-10 hidden h-24 w-24 rounded-[2rem] blur-2xl lg:block"
                style={{ backgroundColor: theme.colors.inkOverlay }}
              />

              <div className="relative mx-auto w-full max-w-3xl">
                <div
                  className="absolute inset-x-[16.15%] top-[19.35%] bottom-[35.9%] z-0 overflow-hidden rounded-[0.35rem] sm:rounded-[0.55rem] lg:rounded-[0.7rem]"
                  style={{
                    backgroundColor: theme.colors.inkSoft,
                    boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                  }}
                >
                  <video
                    className="h-full w-full object-cover object-center"
                    src="/hero-merged.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                </div>

                <Image
                  className="relative z-10 h-auto w-full"
                  src="/laptop.png"
                  alt="Laptop showing the Siksha platform"
                  width={2500}
                  height={2500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  style={{
                    filter: `drop-shadow(0 35px 70px rgba(79,54,37,0.3))`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          
        </motion.div>
      </motion.section>

      <TrustedBySchools />
      <FeaturesSection />
      <HowItWorks />
      <CountUpStats />
      
      <About />
      <Testimonials />
      <CTASection />

      <div
        className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left will-change-transform"
        id="scroll-progress"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left center",
          background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentWarm})`,
        }}
      />

      <motion.div
        className="fixed bottom-8 right-8 z-[100]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.white,
            boxShadow: `0 8px 30px ${theme.colors.accent}50`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </main>
  );
};

export default HomePage;
