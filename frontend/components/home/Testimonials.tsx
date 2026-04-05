"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, PanInfo } from "framer-motion";
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
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { colors } = theme;
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const x = useMotionValue(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        if (!isPaused) {
          setDirection(1);
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28"
      style={{
        background: `linear-gradient(180deg, ${colors.pageBackground} 0%, rgba(244, 230, 210, 0.5) 100%)`,
      }}
    >
      <motion.div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.accentSoft} 0%, transparent 40%)`,
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
                Testimonials
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/10 sm:w-20" />
            </div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-heading"
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
          <div 
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <div
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
                </div>
              </motion.div>
            </AnimatePresence>

            
          </div>

          {/* Navigation Dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: index === currentIndex ? 28 : 8,
                  backgroundColor: index === currentIndex ? colors.accent : colors.textMuted,
                  opacity: index === currentIndex ? 1 : 0.35,
                  transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
