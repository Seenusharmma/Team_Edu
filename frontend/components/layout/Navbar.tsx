"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Sparkles, Menu, X, Pencil } from "lucide-react";
import { theme } from "@/lib/theme";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

const taglineWords = ["Education", "with", "Tech", "&", "AI"];

const softEase = [0.2, 0.8, 0.2, 1] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [wordCount, setWordCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordCount((prev) => (prev < taglineWords.length ? prev + 1 : 1));
    }, 900);
    return () => clearInterval(interval);
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

  const navLinkMotion = useMemo(
    (): Variants => ({
      rest: { y: 0, scale: 1 },
      hover: { y: -2, scale: 1.04 },
      tap: { scale: 0.96 },
    }),
    []
  );

  const navAreaRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pencilRafRef = useRef<number | null>(null);
  const spotlightRafRef = useRef<number | null>(null);
  const [pencilTarget, setPencilTarget] = useState({
    x: 0,
    y: 0,
    width: 0,
    rotate: -25,
    visible: false,
  });
  const [hoverKey, setHoverKey] = useState(0);
  const [isNavHovering, setIsNavHovering] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    return () => {
      if (pencilRafRef.current !== null) {
        cancelAnimationFrame(pencilRafRef.current);
      }
      if (spotlightRafRef.current !== null) {
        cancelAnimationFrame(spotlightRafRef.current);
      }
    };
  }, []);

  const handleNavHover = (index: number) => {
    const navEl = navAreaRef.current;
    const itemEl = navItemRefs.current[index];
    if (!navEl || !itemEl) return;

    const navRect = navEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    const x = itemRect.left - navRect.left + itemRect.width / 2;
    const y = itemRect.bottom - navRect.top + 4;
    const width = Math.max(28, itemRect.width - 12);
    if (pencilRafRef.current !== null) {
      cancelAnimationFrame(pencilRafRef.current);
    }
    setIsNavHovering(true);
    setHoverKey((prev) => prev + 1);
    setPencilTarget({ x: 0, y, width, rotate: -35, visible: true });
    pencilRafRef.current = requestAnimationFrame(() => {
      setPencilTarget({ x, y, width, rotate: 0, visible: true });
    });
  };

  const handleNavLeave = () => {
    setIsNavHovering(false);
    setSpotlight((prev) => ({ ...prev, visible: false }));
    setPencilTarget((prev) => ({ ...prev, visible: true }));
  };

  const handleNavMove = (event: MouseEvent<HTMLDivElement>) => {
    const navEl = navAreaRef.current;
    if (!navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const x = event.clientX - navRect.left;
    const y = event.clientY - navRect.top;
    if (spotlightRafRef.current !== null) {
      cancelAnimationFrame(spotlightRafRef.current);
    }
    spotlightRafRef.current = requestAnimationFrame(() => {
      setSpotlight({ x, y, visible: true });
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30">
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
            className="rounded-[1.35rem] border px-3 py-2.5 backdrop-blur-xl sm:rounded-[1.7rem] sm:px-5 sm:py-5"
            style={{
              transition: "background-color 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s cubic-bezier(0.2,0.8,0.2,1)",
              backgroundColor: isScrolled
                ? "rgba(255,255,255,0.72)"
                : "rgba(255,255,255,0.55)",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
              backgroundBlendMode: "soft-light",
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
                  {taglineWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i < wordCount ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: softEase }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
                </p>
              </div>
            </Link>

            <div
              ref={navAreaRef}
              onMouseLeave={handleNavLeave}
              onMouseMove={handleNavMove}
              className="relative hidden items-center lg:flex"
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                animate={{
                  opacity: spotlight.visible ? 1 : 0,
                  background: `radial-gradient(220px 120px at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.55), transparent 70%)`,
                }}
                transition={{ duration: 0.25, ease: softEase }}
              />

              <motion.span
                key={hoverKey}
                className="pointer-events-none absolute left-0 top-0 -translate-x-1/2"
                animate={{
                  x: pencilTarget.x,
                  y: pencilTarget.y,
                  opacity: pencilTarget.visible
                    ? isNavHovering
                      ? 1
                      : 0.4
                    : 0,
                  rotate: pencilTarget.rotate,
                }}
                transition={{
                  duration: 0.4,
                  ease: softEase,
                }}
              >
                <span
                  className="flex items-center"
                  style={{ width: `${pencilTarget.width}px` }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2"
                    style={{
                      width: `${Math.max(32, pencilTarget.width + 18)}px`,
                    }}
                  >
                    <span
                      className="block h-[3px] w-full rounded-full blur-[3px]"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${theme.colors.accentSoft} 35%, rgba(79,54,37,0.22) 100%)`,
                      }}
                    />
                  </span>
                  <span
                    className="h-[2px] w-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${theme.colors.accent} 35%, ${theme.colors.textSecondary} 100%)`,
                      boxShadow: `0 0 8px ${theme.colors.accentSoft}`,
                    }}
                  />
                  <Pencil
                    className="-ml-1 h-3 w-3"
                    aria-hidden="true"
                    style={{ color: theme.colors.textSecondary }}
                  />
                </span>
              </motion.span>

              <nav className="flex items-center gap-1 pb-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    ref={(el) => {
                      navItemRefs.current[index] = el;
                    }}
                    onMouseEnter={() => handleNavHover(index)}
                    className="group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                    variants={navLinkMotion}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span
                      className="relative z-10 transition-all duration-300 group-hover:font-semibold"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.accentSoft} 0%, transparent 70%)`,
                        boxShadow: `0 4px 16px ${theme.colors.accentSoft}`,
                      }}
                    />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <motion.a
                href="#signin"
                className="group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10" style={{ color: theme.colors.textSecondary }}>Sign in</span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.accentSoft} 0%, transparent 70%)`,
                    boxShadow: `0 4px 16px ${theme.colors.accentSoft}`,
                  }}
                />
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
