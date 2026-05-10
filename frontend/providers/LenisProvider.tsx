"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.currentTarget as HTMLAnchorElement;
      if (target.tagName !== "A") return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenisRef.current?.scrollTo(el, { offset: -80, duration: 1.2 });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
}
