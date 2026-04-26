"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { theme } from "@/lib/theme";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.765 2.027-3 3.772-3 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.765 0-3.223-1.235-3.772-3m-.772 3c.549 1.765 2.027 3 3.772 3 2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.765 0-3.223 1.235-3.772 3m.772 3v5m0 0v-5" />
      </svg>
    ),
    title: "Ask Anything, Anytime",
    description:
      "Stuck on a concept at midnight before your exam? Siksha's AI tutor breaks down complex topics into simple steps — no waiting, no judgment, just clarity.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Learning That Adapts to You",
    description:
      "Struggling with algebra but flying through history? Siksha notices and adjusts — giving you more practice where you need it and moving faster where you don't.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "See Exactly Where You Stand",
    description:
      "Know which chapters you've mastered and which ones need another look. Your weekly progress report shows improvement you can actually feel proud of.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Study Smarter, Not Longer",
    description:
      "Siksha builds your study plan around your day — 20 minutes before lunch, an hour after dinner. Short focused sessions that actually stick, not marathon cramming.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Learn Together, Go Further",
    description:
      "Join live doubt-solving rooms, form study groups, or ask your teacher for a quick review — all inside Siksha. Learning is better when it's not lonely.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Exam-Ready From Day One",
    description:
      "Practice with tests built to match your board or entrance exam pattern. Get a score, see your mistakes, understand why — and walk into the exam hall confident.",
  },
];

export default function FeaturesSection() {
  const { colors } = theme;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28"
      style={{ backgroundColor: colors.pageBackground }}
    >
      <motion.div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          y: bgY,
          scale: bgScale,
        }} 
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal once={false}>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/10 sm:w-20" />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
                Why Siksha
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/10 sm:w-20" />
            </div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-heading"
              style={{ color: colors.textPrimary }}
            >
              Why Students Love Siksha
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style={{ color: colors.textSecondary }}>
              Everything you need to study smarter, not harder — built around how you actually learn.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1} once={false}>
              <motion.div
                className="group relative p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.whiteBorder}`,
                  boxShadow: theme.shadows.button,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accentSoft} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.white,
                    }}
                  >
                    {feature.icon}
                  </div>

                  <h3
                    className="text-lg font-semibold sm:text-xl"
                    style={{ color: colors.textPrimary }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="mt-3 text-sm leading-relaxed sm:text-base"
                    style={{ color: colors.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
