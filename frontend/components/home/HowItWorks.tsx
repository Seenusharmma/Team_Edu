"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { theme } from "@/lib/theme";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your learning goals, subjects, and current level of understanding.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Analyzes Your Needs",
    description: "Our intelligent system assesses your strengths and weaknesses to create a personalized learning path.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Start Learning",
    description: "Access interactive lessons, practice problems, and get instant help from our AI tutor anytime.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Track Progress",
    description: "Monitor your growth with detailed analytics and celebrate your achievements along the way.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { colors } = theme;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28"
      style={{ backgroundColor: colors.pageBackground }}
    >
      <motion.div 
        className="absolute inset-0 opacity-40" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
          y: bgY,
          scale: bgScale,
        }} 
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/10 sm:w-20" />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
                How It Works
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/10 sm:w-20" />
            </div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-heading"
              style={{ color: colors.textPrimary }}
            >
              Start Learning in 4 Simple Steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style={{ color: colors.textSecondary }}>
              Get started with Siksha and transform your learning experience today.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/10 to-transparent" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  className={`relative lg:flex lg:items-center lg:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Content */}
                  <div className={`lg:flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="relative p-6 sm:p-8 rounded-2xl" style={{ backgroundColor: colors.white, border: `1px solid ${colors.whiteBorder}` }}>
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl"
                        style={{ backgroundColor: colors.accent, color: colors.white }}
                      >
                        {step.icon}
                      </div>

                      <span className="block text-5xl font-bold" style={{ color: colors.white, textShadow: `0 2px 8px ${colors.accent}` }}>
                        {step.number}
                      </span>

                      <h3
                        className="mt-2 text-xl font-semibold sm:text-2xl"
                        style={{ color: colors.textPrimary }}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className="h-4 w-4 rounded-full border-4" style={{ borderColor: colors.accent, backgroundColor: colors.white }} />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="lg:flex-1" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
