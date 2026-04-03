import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class ScrollManager {
  private lenis: Lenis;
  private scrollCallbacks: Array<(scroll: number) => void> = [];
  private velocityCallbacks: Array<(velocity: number) => void> = [];
  private progressCallbacks: Array<(progress: number) => void> = [];
  private progress = 0;
  private velocity = 0;

  constructor() {
    this.lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    this.setupGSAPTicker();
    this.setupListeners();
    this.setupScrollTrigger();
  }

  private setupGSAPTicker(): void {
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time: number) => {
      this.lenis.raf(time * 1000);
    });
  }

  private setupListeners(): void {
    this.lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      this.progress = scroll / limit;
      this.scrollCallbacks.forEach((cb) => cb(scroll));
      this.progressCallbacks.forEach((cb) => cb(this.progress));
    });

    this.lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      this.velocity = velocity;
      this.velocityCallbacks.forEach((cb) => cb(velocity));
    });
  }

  private setupScrollTrigger(): void {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          this.lenis.scrollTo(self.scroll() * scrollHeight, { immediate: true });
        }
      },
    });

    ScrollTrigger.refresh();
  }

  getLenis(): Lenis {
    return this.lenis;
  }

  getProgress(): number {
    return this.progress;
  }

  getVelocity(): number {
    return this.velocity;
  }

  scrollTo(
    target: number | string,
    options?: { immediate?: boolean; offset?: number }
  ): void {
    this.lenis.scrollTo(target, options);
  }

  onScroll(callback: (scroll: number) => void): void {
    this.scrollCallbacks.push(callback);
  }

  onVelocity(callback: (velocity: number) => void): void {
    this.velocityCallbacks.push(callback);
  }

  onProgress(callback: (progress: number) => void): void {
    this.progressCallbacks.push(callback);
  }

  createScrollTrigger(
    trigger: string | HTMLElement,
    onUpdate: (progress: number) => void,
    options?: {
      start?: string;
      end?: string;
      scrub?: boolean | number;
      pin?: boolean | string;
    }
  ): ScrollTrigger {
    return ScrollTrigger.create({
      trigger,
      start: options?.start || "top bottom",
      end: options?.end || "bottom top",
      scrub: options?.scrub ?? true,
      pin: options?.pin || false,
      onUpdate: (self: ScrollTrigger) => {
        onUpdate(self.progress);
      },
    });
  }

  destroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    this.lenis.destroy();
    gsap.ticker.remove((time: number) => this.lenis.raf(time * 1000));
  }
}

export const createScrollManager = (): ScrollManager => new ScrollManager();
export default ScrollManager;