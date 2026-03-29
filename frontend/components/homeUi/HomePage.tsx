"use client";

import Image from "next/image";
import { theme } from "@/lib/theme";

const HomePage = () => {
  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        backgroundColor: theme.colors.pageBackground,
        color: theme.colors.textPrimary,
      }}
    >
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: theme.gradients.heroBackground }}
          />
          <div
            className="absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: theme.colors.accentSoft }}
          />
          <div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: theme.colors.accentWarm }}
          />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p
                className="mb-5 text-sm font-semibold uppercase tracking-[0.35em]"
                style={{ color: theme.colors.accent }}
              >
                AI-led learning
              </p>

              <h1
                className="max-w-xl text-5xl leading-[0.95] font-normal tracking-[-0.04em] text-balance sm:text-6xl lg:text-8xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Build a workforce ready for anything.
              </h1>

              <p
                className="mt-8 max-w-xl text-lg leading-8 sm:text-xl"
                style={{ color: theme.colors.textSecondary }}
              >
                Human and AI coaching with practical, outcome-focused learning
                paths that help teams adapt faster and perform with confidence.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="rounded-full px-8 py-4 text-base font-semibold transition"
                  style={{
                    backgroundColor: theme.colors.textPrimary,
                    color: theme.colors.white,
                  }}
                >
                  Request a demo
                </button>

                <span
                  className="text-sm font-medium tracking-[0.18em] uppercase"
                  style={{ color: theme.colors.textMuted }}
                >
                  Trusted by modern teams
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full border blur-sm lg:block"
                style={{
                  borderColor: theme.colors.whiteBorder,
                  backgroundColor: theme.colors.whiteGlass,
                }}
              />
              <div
                className="absolute -right-4 bottom-10 hidden h-24 w-24 rounded-[2rem] blur-2xl lg:block"
                style={{ backgroundColor: theme.colors.inkOverlay }}
              />

              <div className="relative mx-auto w-full max-w-3xl">
                <div
                  className="absolute inset-x-[16.15%] top-[19.35%] bottom-[35.9%] z-0 overflow-hidden rounded-[0.7rem]"
                  style={{
                    backgroundColor: theme.colors.inkSoft,
                    boxShadow: theme.shadows.screen,
                  }}
                >
                  <video
                    className="h-full w-full object-cover object-center"
                    src="/hero-merged.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                <Image
                  className="relative z-10 h-auto w-full"
                  src="/laptop.png"
                  alt="Laptop showing the Siksha platform"
                  width={2500}
                  height={2500}
                  priority
                  style={{ filter: `drop-shadow(${theme.shadows.laptop})` }}
                />
              </div>

              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
