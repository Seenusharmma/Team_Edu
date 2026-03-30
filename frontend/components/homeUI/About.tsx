"use client";

import Image from "next/image";
import { theme } from "@/lib/theme";

export default function About() {
  const { colors } = theme;

  return (
    <section 
      className="relative py-16 sm:py-20 lg:py-28 rounded-t-4xl"
      style={{ backgroundColor: colors.chocolate }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            <h2 
              className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              style={{ color: colors.white }}
            >
              About{" "}
              <span style={{ color: colors.accent }}>
                Siksha
              </span>
            </h2>

            {/* Divider */}
            <div 
              className="w-16 h-[3px] mt-4 mb-6"
              style={{ backgroundColor: colors.accent }}
            />

            <div className="space-y-4">
              <p 
                className="text-base leading-relaxed"
                style={{ color: colors.whiteOverlay }}
              >
                Welcome to Siksha &ndash; where education meets innovation. We are dedicated to transforming the way people learn through cutting-edge artificial intelligence and personalized learning experiences.
              </p>
              
              <p 
                className="text-base leading-relaxed"
                style={{ color: colors.whiteOverlay }}
              >
                Our mission is to make quality education accessible to everyone, everywhere. By harnessing the power of AI, we create customized learning paths that adapt to each student&apos;s unique needs, pace, and learning style.
              </p>
              
              <p 
                className="text-base leading-relaxed"
                style={{ color: colors.whiteOverlay }}
              >
                Whether you&apos;re a student looking to excel in your studies, a professional seeking new skills, or an organization aiming to train your team, Siksha provides the tools and support you need to achieve your goals.
              </p>
            </div>
            {/* CTA Button */}
            <button 
              className="mt-8 px-8 py-3 rounded-xl font-semibold transition-transform hover:-translate-y-1"
              style={{ 
                backgroundColor: colors.accent, 
                color: colors.white,
                boxShadow: "0 10px 30px rgba(157, 95, 55, 0.3)",
              }}
            >
              Learn More About Us
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2">
            <Image
              src="/about1.png"
              alt="About Siksha - AI Powered Education"
              width={600}
              height={700}
              className="w-full h-auto object-cover rounded-3xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
