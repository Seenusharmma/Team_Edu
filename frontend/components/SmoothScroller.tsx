"use client";

import { ReactNode, useEffect, useRef } from "react";

interface SmoothScrollerProps {
  children: ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    const resizeObserver = new ResizeObserver(() => {
      // Resize handling is done via Lenis internal resize
    });

    resizeObserver.observe(content);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      style={{
        overflow: "hidden",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <div
        ref={contentRef}
        id="smooth-content"
        style={{
          overflow: "visible",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}