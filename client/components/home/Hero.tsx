"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { theme } from "../../lib/theme";

const logos = ["google", "microsoft", "amazon"];

export default function Hero() {
  return (
    <section
      className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-24 ${theme.colors.bgGradient}`}
    >
      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 px-5 py-1.5 rounded-full bg-white/70 backdrop-blur border text-sm font-medium shadow-sm text-gray-800"
      >
        AI-Powered Education Infrastructure
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${theme.typography.heroHeading} ${theme.colors.textDark} max-w-4xl px-2`}
      >
        Rebuilding Education with <br className="hidden sm:block" />
        Intelligent Infrastructure
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`mt-6 ${theme.typography.bodyText} ${theme.colors.textSecondary} max-w-2xl px-4`}
      >
        Siksha empowers schools, institutes, and governments with AI-driven
        education infrastructure—automating evaluation, enhancing learning,
        and transforming outcomes at scale.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
      >
        <button
          className={`w-full sm:w-auto px-8 py-3.5 ${theme.colors.primary} text-white rounded-full text-base font-medium ${theme.colors.primaryHover} transition`}
        >
          Get Started
        </button>

        <button className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 bg-white text-gray-800 rounded-full text-base font-medium hover:bg-black hover:text-white transition shadow-sm">
          Request Demo
        </button>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute left-[5%] lg:left-[10%] top-40 hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <div className="w-12 h-12 bg-white shadow-lg rounded-xl rotate-12 flex items-center justify-center text-xl">
          📊
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[5%] lg:right-[10%] top-[45%] hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <div className="w-14 h-14 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full shadow-lg blur-[2px]" />
      </motion.div>

      <motion.div
        className="absolute left-[15%] bottom-[20%] hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center text-2xl">
          🤖
        </div>
      </motion.div>

      {/* TRUST SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-t border-gray-200/60 pt-8 w-full max-w-3xl"
      >
        <span
          className={`text-sm font-medium ${theme.colors.textMuted}`}
        >
          Trusted by 1000+ institutions across India
        </span>

        {/* LOGOS */}
        <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition duration-300">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Image
                src={`/logos/${logo}.jpg`}
                alt={logo}
                width={80}
                height={24}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}