import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationId: number | null = null;
  private clock: THREE.Clock;
  private frameCallbacks: Array<(delta: number, elapsed: number) => void> = [];
  private resizeCallbacks: Array<(width: number, height: number) => void> = [];
  private isInitialized = false;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.clock = new THREE.Clock();

    this.init();
  }

  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.camera.position.z = 5;

    window.addEventListener("resize", this.onResize);
    this.start();
  }

  private onResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    this.resizeCallbacks.forEach((cb) => cb(width, height));
  };

  start(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    const animate = (): void => {
      this.animationId = requestAnimationFrame(animate);

      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      this.frameCallbacks.forEach((cb) => cb(delta, elapsed));

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy(): void {
    this.stop();
    this.renderer.dispose();
    window.removeEventListener("resize", this.onResize);

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  getCanvas(): HTMLCanvasElement | null {
    return this.renderer.domElement;
  }

  onFrame(callback: (delta: number, elapsed: number) => void): void {
    this.frameCallbacks.push(callback);
  }

  onResizeCallback(callback: (width: number, height: number) => void): void {
    this.resizeCallbacks.push(callback);
  }
}

export const createScene = (): SceneManager => new SceneManager();
export default SceneManager;