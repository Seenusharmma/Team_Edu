"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/lib/theme";
import ScrollReveal from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    id: 1,
    quote: "Siksha has completely transformed how I study. The AI tutor explains concepts in a way that makes sense to me, and my grades have improved dramatically.",
    name: "Priya Sharma",
    role: "Class 12 Student",
    location: "Delhi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    quote: "As a teacher, Siksha has been a game-changer. I can track my students' progress individually and provide personalized attention where needed.",
    name: "Rajesh Kumar",
    role: "Mathematics Teacher",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    quote: "The personalized learning paths are incredible. It feels like having a private tutor available 24/7. I've saved so much study time and achieved better results.",
    name: "Ananya Patel",
    role: "Engineering Student",
    location: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    quote: "My daughter used to struggle with science. Now she actually enjoys learning! The AI makes complex topics so much easier to understand.",
    name: "Meena Devi",
    role: "Parent",
    location: "Chennai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { colors } = theme;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-28"
      style={{
        background: `linear-gradient(180deg, ${colors.pageBackground} 0%, rgba(244, 230, 210, 0.5) 100%)`,
      }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.accentSoft} 0%, transparent 40%)` }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/10 sm:w-20" />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.accent }}>
                Testimonials
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/10 sm:w-20" />
            </div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: colors.textPrimary }}
            >
              Loved by Students & Teachers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style={{ color: colors.textSecondary }}>
              See what our community has to say about their learning experience with Siksha.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12">
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative p-6 sm:p-10 rounded-3xl"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.whiteBorder}`,
                  boxShadow: theme.shadows.button,
                }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.accent, color: colors.white }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p
                    className="text-base sm:text-lg leading-relaxed italic"
                    style={{ color: colors.textSecondary }}
                  >
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      width={56}
                      height={56}
                      sizes="56px"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm" style={{ color: colors.textMuted }}>
                        {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.whiteBorder}`, color: colors.textPrimary }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: index === currentIndex ? 24 : 8,
                      backgroundColor: index === currentIndex ? colors.accent : colors.textMuted,
                      opacity: index === currentIndex ? 1 : 0.3,
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.whiteBorder}`, color: colors.textPrimary }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
