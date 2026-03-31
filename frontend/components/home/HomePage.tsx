"use client";

import Image from "next/image";
import CountUpStats from "@/components/home/CountUpStats";
import TrustedBySchools from "@/components/home/TrustedBySchools";
import { theme } from "@/lib/theme";
import About from "./About";

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
            className="absolute -left-24 top-10 h-48 w-48 rounded-full blur-3xl sm:top-16 sm:h-72 sm:w-72"
            style={{ backgroundColor: theme.colors.accentSoft }}
          />
          <div
            className="absolute bottom-0 right-0 h-56 w-56 rounded-full blur-3xl sm:h-80 sm:w-80"
            style={{ backgroundColor: theme.colors.accentWarm }}
          />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pt-36">
          <div className="grid w-full items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: theme.colors.textPrimary }}
              >
                Accelerate Your Learning with{" "}
                <span style={{ color: theme.colors.accent }}>AI Power</span>
              </h1>

              <p
                className="mx-auto mt-6 max-w-xl text-base leading-7 sm:mt-8 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl"
                style={{ color: theme.colors.textSecondary }}
              >
                Master concepts faster, save hours of study time, and achieve better results with our intelligent learning assistant that adapts to your unique needs.
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start">
                <a
                  href="/contact"
                  className="w-full rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-1 sm:w-auto text-center"
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: theme.colors.white,
                    boxShadow: theme.shadows.button,
                  }}
                >
                  Get Started Free
                </a>

                <a
                  href="#how-it-works"
                  className="w-full rounded-2xl border-2 px-8 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-1 sm:w-auto text-center"
                  style={{
                    borderColor: theme.colors.textPrimary,
                    color: theme.colors.textPrimary,
                  }}
                >
                  Watch Demo
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[40rem]">
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
                  className="absolute inset-x-[16.15%] top-[19.35%] bottom-[35.9%] z-0 overflow-hidden rounded-[0.35rem] sm:rounded-[0.55rem] lg:rounded-[0.7rem]"
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

      <TrustedBySchools />

      <CountUpStats />

      <About/>
    </main>
  );
};

export default HomePage;
