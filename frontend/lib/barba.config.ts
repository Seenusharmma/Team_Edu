import gsap from "gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
const curtainTransition = {
  name: "curtain-transition",
  once: async function () {
    await gsap.fromTo(
      ".barba-overlay",
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.8, ease: "power4.inOut" }
    );
    await gsap.to(".barba-overlay", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.1,
    });
  },
  leave: async function (data: any) {
    const done = data.async();
    
    await gsap.to(data.current.container, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.inOut",
    });

    await gsap.fromTo(
      ".barba-overlay",
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.6, ease: "power4.inOut" }
    );

    done();
  },
  enter: async function (data: any) {
    gsap.set(data.next.container, { opacity: 0, scale: 1.02 });
    
    await gsap.to(data.next.container, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    
    await gsap.to(".barba-overlay", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.6,
      ease: "power4.inOut",
    });
  },
  afterEnter: function () {
    window.scrollTo(0, 0);
  },
};

interface BarbaConfig {
  transitions: Array<typeof curtainTransition>;
  debug?: boolean;
}

export const initBarba = async () => {
  if (typeof window === "undefined") return;
  
  const barba = (await import("@barba/core")).default;
  
  const config: BarbaConfig = {
    transitions: [curtainTransition],
    debug: true,
  };
  
  barba.init(config);
};

export default initBarba;
