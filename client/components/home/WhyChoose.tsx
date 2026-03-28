"use client";

import { motion } from "framer-motion";
import { theme } from "../../lib/theme";

export default function WhyChoose() {
  return (
    <section className={`w-full ${theme.layout.sectionPadding} ${theme.colors.bgGray} overflow-hidden`}>
      <div className={`${theme.layout.containerSmall} text-center relative`}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`${theme.typography.sectionHeading} ${theme.colors.textDark}`}
        >
          Why Siksha?
        </motion.h2>

        <p className={`mt-3 ${theme.colors.textSecondary} max-w-xl mx-auto ${theme.typography.bodyText}`}>
          Smarter. Faster. Scalable.
        </p>

        {/* Content Container (Stack on mobile, Center on md) */}
        <div className="relative flex flex-col items-center mt-12 md:mt-16 gap-10 md:gap-0">

          {/* Video Container (Animated Rings and Video) */}
          <div className="relative flex items-center justify-center">
            {/* Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-green-200"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full border border-purple-200"
            />

            {/* Video */}
            <div className="relative z-10 w-48 h-64 md:w-64 md:h-80 overflow-hidden rounded-full shadow-lg">
              <video
                src="/siksha.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Feature Cards Grid (Mobile Stack, Desktop Absolute) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 md:hidden mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>⚡ 70% Faster</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Evaluation time reduced</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>📊 Data-Driven</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Decision making</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>🎯 Personalized</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Learning experience</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>🇮🇳 Built for India</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>India's education ecosystem</p>
            </motion.div>
          </div>

          {/* Desktop Floating Cards */}
          <div className="hidden md:block">
            {/* Left Top */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute left-10 top-10 bg-white border rounded-xl p-4 shadow-sm w-44"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>⚡ 70% Faster</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Evaluation time reduced</p>
            </motion.div>

            {/* Left Bottom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute left-10 bottom-10 bg-white border rounded-xl p-4 shadow-sm w-44"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>📊 Data-Driven</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Decision making</p>
            </motion.div>

            {/* Right Top */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute right-10 top-10 bg-white border rounded-xl p-4 shadow-sm w-48"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>🎯 Personalized</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>Learning experience</p>
            </motion.div>

            {/* Right Bottom */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute right-20 bottom-10 bg-white border rounded-xl p-4 shadow-sm w-48"
            >
              <h4 className={`font-semibold ${theme.colors.textDark}`}>🇮🇳 Built for India</h4>
              <p className={`text-xs ${theme.colors.textMuted}`}>India's education ecosystem</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}