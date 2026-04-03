"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { SceneManager } from "../core/SceneManager";
import { ScrollManager } from "../core/ScrollManager";
import { Particles } from "../canvas/Particles";
import { Wave } from "../canvas/Wave";
import { FluidBlob } from "../canvas/FluidBlob";

type CanvasMode = "particles" | "wave" | "blob" | "none";

interface Canvas3DProps {
  mode?: CanvasMode;
  particleCount?: number;
  particleColor?: string;
  waveColor1?: string;
  waveColor2?: string;
  blobColor?: string;
  className?: string;
}

export default function Canvas3D({
  mode = "particles",
  particleCount = 1500,
  particleColor = "#9d5f37",
  waveColor1 = "#1c140f",
  waveColor2 = "#9d5f37",
  blobColor = "#9d5f37",
  className = "",
}: Canvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const scrollManagerRef = useRef<ScrollManager | null>(null);
  const componentRef = useRef<unknown>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Initialize scene
    sceneManagerRef.current = new SceneManager();
    scrollManagerRef.current = new ScrollManager();

    const scene = sceneManagerRef.current.getScene();
    const renderer = sceneManagerRef.current.getRenderer();
    const canvas = renderer.domElement;

    // Set canvas properties
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";

    containerRef.current?.appendChild(canvas);

    // Initialize animation component
    if (mode === "particles") {
      componentRef.current = new Particles(scene, scrollManagerRef.current, {
        count: particleCount,
        color: particleColor,
        mouse: true,
      });
    } else if (mode === "wave") {
      componentRef.current = new Wave(scene, scrollManagerRef.current, {
        color1: waveColor1,
        color2: waveColor2,
      });
    } else if (mode === "blob") {
      componentRef.current = new FluidBlob(scene, scrollManagerRef.current, {
        color: blobColor,
      });
    }

    // Register frame callback
    sceneManagerRef.current.onFrame((delta, elapsed) => {
      const comp = componentRef.current as { update?: (delta: number, elapsed: number) => void };
      comp?.update?.(delta, elapsed);
    });

    // Register resize callback
    sceneManagerRef.current.onResizeCallback((width, height) => {
      const comp = componentRef.current as { onResize?: (width: number, height: number) => void };
      comp?.onResize?.(width, height);
    });

    // Cleanup
    return () => {
      const comp = componentRef.current as { destroy?: () => void };
      comp?.destroy?.();
      scrollManagerRef.current?.destroy();
      sceneManagerRef.current?.destroy();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [mode, particleCount, particleColor, waveColor1, waveColor2, blobColor]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        pointerEvents: mode === "particles" ? "all" : "none",
      }}
    />
  );
}