export { SceneManager, createScene, ScrollManager, createScrollManager } from "./core";
export { Particles, Wave, FluidBlob } from "./canvas";
export { Canvas3D, ParallaxSection, RevealOnScroll, StaggerReveal, ScaleOnScroll, TextReveal } from "./components";

export { particlesVertexShader, particlesFragmentShader, gradientVertexShader, gradientFragmentShader } from "./shaders/particles";

export type { default as SceneManagerType } from "./core/SceneManager";
export type { default as ScrollManagerType } from "./core/ScrollManager";
export type { default as ParticlesType } from "./canvas/Particles";
export type { default as WaveType } from "./canvas/Wave";
export type { default as FluidBlobType } from "./canvas/FluidBlob";