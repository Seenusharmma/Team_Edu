"use client";

import { useEffect, useRef, useState } from "react";
import { theme } from "@/lib/theme";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  
}

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Students Helped" },
  { value: 500, suffix: "+", label: "Schools Connected"},
  { value: 1000000, suffix: "+", label: "Study Hours Saved" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 24, suffix: "/7", label: "Support" },
];

const CountUpStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-6 sm:py-10"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.pageBackground} 0%, rgba(244, 230, 210, 0.95) 50%, ${theme.colors.pageBackground} 100%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${theme.colors.accentSoft} 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, ${theme.colors.accentWarm} 0%, transparent 50%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full opacity-40" style={{ background: `radial-gradient(circle, ${theme.colors.accentSoft} 0%, transparent 70%)`, filter: "blur(30px)" }} />
      <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full opacity-40" style={{ background: `radial-gradient(circle, ${theme.colors.accentWarm} 0%, transparent 70%)`, filter: "blur(30px)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/10 sm:w-20" />
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: theme.colors.accent }}>Impact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/10 sm:w-20" />
          </div>
          <h2
            className="text-2xl font-semibold tracking-[0.15em] uppercase sm:text-3xl lg:text-4xl"
            style={{ letterSpacing: "0.15em", fontFamily: "Georgia, 'Times New Roman', serif", color: theme.colors.textPrimary }}
          >
            Our Impact in Numbers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base" style={{ color: theme.colors.textMuted }}>
            Real results powered by AI & innovation
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8" style={{ color: theme.colors.textMuted }}>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.accent }} />
            <span className="text-xs uppercase tracking-wider">Trusted by 500+ Institutions</span>
          </div>
          <div className="hidden h-4 w-px bg-black/10 sm:block" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.accent }} />
            <span className="text-xs uppercase tracking-wider">ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: Stat;
  index: number;
  isVisible: boolean;
}

const StatCard = ({ stat, index, isVisible }: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [isVisible, stat.value, index]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    return num.toString();
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.white} 0%, ${theme.colors.whiteOverlay} 100%)`,
        backdropFilter: "blur(10px)",
        border: `1px solid ${theme.colors.whiteBorder}`,
        boxShadow: theme.shadows.nav,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.accentSoft} 0%, transparent 60%)`,
        }}
      />

      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle, ${theme.colors.accent}30 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-baseline gap-1">
          <span
            className="text-3xl font-bold tabular-nums sm:text-4xl lg:text-5xl"
            style={{
              color: theme.colors.textPrimary,
            }}
          >
            {formatNumber(count)}
          </span>
          <span
            className="text-xl font-semibold"
            style={{ color: theme.colors.accent }}
          >
            {stat.suffix}
          </span>
        </div>

        <p
          className="mt-2 text-xs font-medium uppercase tracking-widest"
          style={{ letterSpacing: "0.1em", color: theme.colors.textSecondary }}
        >
          {stat.label}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 h-1 transform-gpu transition-transform duration-500 group-hover:scale-x-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
};

export default CountUpStats;
