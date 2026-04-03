"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentProgress = window.scrollY / scrollHeight;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        setProgress(Math.max(0, Math.min(1, currentProgress)));
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    frameId = requestAnimationFrame(updateProgress);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return progress;
}
