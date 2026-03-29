"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        <div
          className="rounded-[1.4rem] border px-3 py-3 backdrop-blur-xl sm:rounded-[1.75rem] sm:px-5"
          style={{
            backgroundColor: theme.colors.whiteOverlay,
            borderColor: theme.colors.whiteBorder,
            boxShadow: theme.shadows.nav,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold sm:h-11 sm:w-11"
                style={{
                  backgroundColor: theme.colors.accent,
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
                
              </div>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#signin"
                className="text-sm font-medium"
                style={{ color: theme.colors.textSecondary }}
              >
                Sign in
              </a>

              <a
                href="#demo"
                className="rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: theme.colors.textPrimary,
                  color: theme.colors.white,
                  boxShadow: theme.shadows.button,
                }}
              >
                Book a demo
              </a>
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
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full transition-transform duration-200 ${
                    isOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                  style={{ backgroundColor: theme.colors.textPrimary }}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                  style={{ backgroundColor: theme.colors.textPrimary }}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full transition-transform duration-200 ${
                    isOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                  style={{ backgroundColor: theme.colors.textPrimary }}
                />
              </div>
            </button>
          </div>

          {isOpen ? (
            <div className="mt-4 border-t pt-4 md:hidden" style={{ borderColor: theme.colors.whiteBorder }}>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium"
                    style={{
                      backgroundColor: theme.colors.whiteSoft,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href="#signin"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{
                    backgroundColor: theme.colors.whiteSoft,
                    color: theme.colors.textPrimary,
                  }}
                >
                  Sign in
                </a>

                <a
                  href="#demo"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-center text-sm font-semibold"
                  style={{
                    backgroundColor: theme.colors.textPrimary,
                    color: theme.colors.white,
                    boxShadow: theme.shadows.button,
                  }}
                >
                  Book a demo
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
