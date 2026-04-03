"use client";

import { useLayoutEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  
  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(raf);

    requestAnimationFrame(() => {
      setLenisInstance(lenis);
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return lenisInstance;
}
