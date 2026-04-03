"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { theme } from "@/lib/theme";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

const softEase = [0.2, 0.8, 0.2, 1] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navMotion = useMemo(
    (): Variants => ({
      hidden: { opacity: 0, y: -8 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: softEase },
      },
    }),
    []
  );

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        <motion.div
          variants={navMotion}
          initial="hidden"
          animate="show"
          className="relative rounded-[1.4rem] p-[1px] sm:rounded-[1.75rem]"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.whiteGlass}, rgba(157,95,55,0.22))`,
          }}
        >
          <div
            className="rounded-[1.35rem] border px-3 py-3 backdrop-blur-xl sm:rounded-[1.7rem] sm:px-5"
            style={{
              backgroundColor: isScrolled
                ? theme.colors.whiteSoft
                : theme.colors.whiteOverlay,
              borderColor: theme.colors.whiteBorder,
              boxShadow: isScrolled
                ? "0 16px 48px rgba(79,54,37,0.16)"
                : theme.shadows.nav,
            }}
          >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold sm:h-11 sm:w-11"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.chocolate})`,
                  color: theme.colors.white,
                }}
              >
                S
              </div>

              <div className="min-w-0 leading-none">
                <p
                  className="truncate text-base font-semibold tracking-[-0.03em] sm:text-lg"
                  style={{ color: theme.colors.textPrimary }}
                >
                  Siksha
                </p>
                <p
                  className="mt-1 hidden text-xs font-medium uppercase tracking-[0.2em] sm:block"
                  style={{ color: theme.colors.textMuted }}
                >
                  Education with Tech & AI
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: theme.colors.textSecondary }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      backgroundColor: theme.colors.accentSoft,
                    }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <motion.a
                href="#signin"
                className="text-sm font-medium"
                style={{ color: theme.colors.textSecondary }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in
              </motion.a>

              <motion.a
                href="/contact"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold"
                style={{
                  color: theme.colors.white,
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="absolute inset-0 -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.textPrimary}, ${theme.colors.chocolate})`,
                    boxShadow: theme.shadows.button,
                  }}
                />
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Contact Us
              </motion.a>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
              style={{
                borderColor: theme.colors.whiteBorder,
                backgroundColor: theme.colors.whiteSoft,
                color: theme.colors.textPrimary,
              }}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: softEase }}
                className="mt-4 overflow-hidden border-t pt-4 md:hidden"
                style={{ borderColor: theme.colors.whiteBorder }}
              >
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium"
                      style={{
                        backgroundColor: theme.colors.whiteSoft,
                        color: theme.colors.textSecondary,
                      }}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-4 flex flex-col gap-2">
                  <motion.a
                    href="#signin"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium"
                    style={{
                      backgroundColor: theme.colors.whiteSoft,
                      color: theme.colors.textPrimary,
                    }}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign in
                  </motion.a>

                  <motion.a
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.textPrimary}, ${theme.colors.chocolate})`,
                      color: theme.colors.white,
                      boxShadow: theme.shadows.button,
                    }}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Contact Us
                  </motion.a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
