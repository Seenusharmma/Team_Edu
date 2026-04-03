"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPAnimationOptions {
  speed?: number;
  lag?: number;
}

export function useGSAPScrollAnimation(selector: string, options: GSAPAnimationOptions = {}) {
  const { speed = 1, lag = 0 } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector);

      elements.forEach((element) => {
        const speedAttr = element.getAttribute("data-speed");
        const lagAttr = element.getAttribute("data-lag");

        const elementSpeed = speedAttr ? parseFloat(speedAttr) : speed;
        const elementLag = lagAttr ? parseFloat(lagAttr) : lag;

        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: elementLag,
        });

        gsap.to(element, {
          y: (1 - elementSpeed) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, speed, lag]);
}

export function useParallaxAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const parallaxElements = document.querySelectorAll<HTMLElement>("[data-speed]");

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute("data-speed") || "1");

        gsap.to(element, {
          y: (1 - speed) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}

export function useStaggeredReveal(selector: string, stagger: number = 0.1) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector);

      elements.forEach((element) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, stagger]);
}
