"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { theme } from "@/lib/theme";
import ScrollReveal from "@/components/ui/ScrollReveal";

const schools = [
  { name: "Delhi Public School", image: "/logo/dps.jpeg" },
  { name: "St. Xavier's School", image: "/logo/st.png" },
  { name: "Ryan International School", image: "/logo/ryan.jpeg" },
  { name: "DAV Public School", image: "/logo/dav.svg" },
  { name: "Kendriya Vidyalaya", image: "/logo/kv.jpeg" },
  { name: "Modern School", image: "/logo/ms.jpeg" },
  { name: "Amity International School", image: "/logo/ai.png" },
  { name: "Podar International School", image: "/logo/pi.png" },
];

const duplicatedSchools = [...schools, ...schools];

const TrustedBySchools = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-1 sm:py-1 lg:py-1"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.inkSoft} 0%, #0d0705 50%, ${theme.colors.inkSoft} 100%)`,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, rgba(157, 95, 55, 0.25) 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, rgba(157, 95, 55, 0.15) 0%, transparent 50%)`,
          y: bgY,
          scale: bgScale,
          opacity: gradientOpacity,
        }}
      />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30 sm:w-20" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/50">Partners</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30 sm:w-20" />
          </div>
          <h2
            className="text-base font-semibold tracking-[0.2em] uppercase text-white/90 sm:text-lg lg:text-xl"
            style={{ letterSpacing: "0.2em" }}
          >
            Trusted By Top Schools & Institutions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
            Join hundreds of educational institutions transforming learning experiences
          </p>
        </ScrollReveal>
      </div>

      <div className="group relative flex w-full overflow-hidden py-4">
        <div className="flex animate-marquee items-center gap-6 sm:gap-8 lg:gap-10">
          {duplicatedSchools.map((school, index) => (
            <div
              key={`first-${index}`}
              className="group/item flex shrink-0 cursor-pointer items-center gap-3 transition-all duration-300"
              style={{ opacity: 0.7 }}
              onMouseEnter={(e) => {
                const container = e.currentTarget;
                container.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const container = e.currentTarget;
                container.style.opacity = "0.7";
              }}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 shadow-lg ring-2 ring-white/10 transition-all duration-300 group-hover/item:scale-110 group-hover/item:ring-white/30 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <Image
                  src={school.image}
                  alt={school.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="whitespace-nowrap text-xs font-semibold text-white sm:text-sm"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {school.name}
                </span>
                <span className="text-[10px] text-white/40">Education Partner</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex animate-marquee items-center gap-6 sm:gap-8 lg:gap-10" aria-hidden="true">
          {duplicatedSchools.map((school, index) => (
            <div
              key={`second-${index}`}
              className="group/item flex shrink-0 cursor-pointer items-center gap-3 transition-all duration-300"
              style={{ opacity: 0.7 }}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 shadow-lg ring-2 ring-white/10 transition-all duration-300 group-hover/item:scale-110 group-hover/item:ring-white/30 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <Image
                  src={school.image}
                  alt={school.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="whitespace-nowrap text-xs font-semibold text-white sm:text-sm"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {school.name}
                </span>
                <span className="text-[10px] text-white/40">Education Partner</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#1c140f] to-transparent opacity-0 transition-opacity duration-300 sm:w-24 lg:w-32 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to right, ${theme.colors.inkSoft}, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#1c140f] to-transparent opacity-0 transition-opacity duration-300 sm:w-24 lg:w-32 group-hover:opacity-100"
          style={{
            background: "linear-gradient(to left, #1c140f, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-2">
        <div className="h-1 w-8 rounded-full bg-white/20" />
        <div className="h-1 w-1 rounded-full bg-white/10" />
        <div className="h-1 w-1 rounded-full bg-white/10" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedBySchools;
