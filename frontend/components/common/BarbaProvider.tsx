"use client";

import { useEffect, useRef } from "react";
import { initBarba } from "@/lib/barba.config";
import { theme } from "@/lib/theme";

interface BarbaWindow extends Window {
  barba?: {
    go: (href: string) => void;
  };
}

interface BarbaProviderProps {
  children: React.ReactNode;
}

const BarbaProvider = ({ children }: BarbaProviderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (
        link &&
        link.href &&
        !link.href.startsWith("mailto:") &&
        !link.href.startsWith("tel:") &&
        link.href.includes(window.location.host)
      ) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && href !== window.location.pathname) {
          window.history.pushState({}, "", href);
          (window as unknown as BarbaWindow).barba?.go(href);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    
    const initBarbaOnLoad = () => {
      try {
        initBarba();
        console.log("[Barba] Initialized successfully");
      } catch (error) {
        console.error("[Barba] Initialization error:", error);
      }
    };

    if (document.readyState === "complete") {
      initBarbaOnLoad();
    } else {
      window.addEventListener("load", initBarbaOnLoad);
    }

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <div data-barba="wrapper" ref={wrapperRef}>
      <div
        className="barba-overlay fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.inkSoft} 0%, ${theme.colors.accent} 50%, ${theme.colors.inkSoft} 100%)`,
          transform: "scaleY(0)",
        }}
      />
      <div
        data-barba="container"
        className="barba-page-content"
        data-barba-namespace="home"
      >
        {children}
      </div>
    </div>
  );
};

export default BarbaProvider;
