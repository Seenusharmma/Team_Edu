"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  const { colors } = theme;

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{ backgroundColor: colors.chocolate }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`, filter: 'blur(60px)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${colors.accentWarm} 0%, transparent 70%)`, filter: 'blur(60px)' }}
        />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: colors.white }}
          >
            Ready to Transform Your Learning Journey?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl"
            style={{ color: colors.whiteOverlay }}
          >
            Join thousands of students and educators already using Siksha to achieve their learning goals. Start your free trial today.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="/contact"
              className="group w-full sm:w-auto rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: colors.accent,
                color: colors.white,
                boxShadow: `0 15px 40px rgba(196, 135, 90, 0.4)`,
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
              className="w-full sm:w-auto rounded-2xl border-2 px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: colors.whiteBorder,
                color: colors.white,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: colors.whiteOverlay }}>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
