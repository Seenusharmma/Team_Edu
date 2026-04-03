"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    const syncScrollTrigger = () => {
      ScrollTrigger.update();
    };

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", syncScrollTrigger);

    // Add lenis to window for debugging
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
