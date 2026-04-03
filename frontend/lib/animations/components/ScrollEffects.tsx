"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const yMove = direction === "vertical" ? speed * 200 : 0;
    const xMove = direction === "horizontal" ? speed * 200 : 0;

    gsap.to(contentRef.current, {
      y: yMove,
      x: xMove,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed, direction]);

  return (
    <section ref={sectionRef} className={className}>
      <div ref={contentRef}>{children}</div>
    </section>
  );
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  duration = 1,
  className = "",
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const directions = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { y: 0, x: 50 },
      right: { y: 0, x: -50 },
    };

    gsap.from(elementRef.current, {
      ...directions[direction],
      opacity: 0,
      duration,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, [delay, direction, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerReveal({ children, stagger = 0.1, className = "" }: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.children;
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface ScaleOnScrollProps {
  children: React.ReactNode;
  from?: number;
  to?: number;
  className?: string;
}

export function ScaleOnScroll({
  children,
  from = 0.8,
  to = 1,
  className = "",
}: ScaleOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { scale: from, opacity: from },
      {
        scale: to,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, [from, to]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  splitBy?: "word" | "char";
}

export function TextReveal({ text, className = "", splitBy = "word" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    const split = splitBy === "word" ? text.split(" ") : text.split("");
    containerRef.current.innerHTML = "";

    split.forEach((item, i) => {
      const span = document.createElement("span");
      span.textContent = splitBy === "word" ? item + (i < split.length - 1 ? " " : "") : item;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(30px) skewY(5deg)";
      containerRef.current?.appendChild(span);
    });

    const children = containerRef.current.children;
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [text, splitBy]);

  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  );
}

export default {
  ParallaxSection,
  RevealOnScroll,
  StaggerReveal,
  ScaleOnScroll,
  TextReveal,
};