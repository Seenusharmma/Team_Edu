import * as THREE from "three";
import { ScrollManager } from "../core/ScrollManager";
import {
  particlesVertexShader,
  particlesFragmentShader,
} from "../shaders/particles";

interface ParticlesConfig {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  mouse?: boolean;
}

export class Particles {
  private mesh: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private positions: Float32Array;
  private scales: Float32Array;
  private randomness: Float32Array;
  private config: Required<ParticlesConfig>;
  private mousePosition = new THREE.Vector2(0.5, 0.5);
  private targetMousePosition = new THREE.Vector2(0.5, 0.5);

  constructor(
    scene: THREE.Scene,
    scrollManager: ScrollManager,
    config: ParticlesConfig = {}
  ) {
    this.config = {
      count: config.count || 2000,
      size: config.size || 4,
      color: config.color || "#9d5f37",
      spread: config.spread || 20,
      mouse: config.mouse ?? true,
    };

    this.positions = new Float32Array(this.config.count * 3);
    this.scales = new Float32Array(this.config.count);
    this.randomness = new Float32Array(this.config.count * 3);

    this.initPositions();
    this.initRandomness();

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.scales, 1)
    );
    this.geometry.setAttribute(
      "aRandomness",
      new THREE.BufferAttribute(this.randomness, 3)
    );

    const color = new THREE.Color(this.config.color);

    this.material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: this.config.size },
        uColor: { value: color },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.position.z = -5;
    scene.add(this.mesh);

    this.setupScrollSync(scrollManager);
  }

  private initPositions(): void {
    const spread = this.config.spread;
    for (let i = 0; i < this.config.count; i++) {
      const i3 = i * 3;
      this.positions[i3] = (Math.random() - 0.5) * spread * 2;
      this.positions[i3 + 1] = (Math.random() - 0.5) * spread * 2;
      this.positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
  }

  private initRandomness(): void {
    for (let i = 0; i < this.config.count; i++) {
      const i3 = i * 3;
      this.scales[i] = Math.random();

      this.randomness[i3] = Math.random();
      this.randomness[i3 + 1] = Math.random();
      this.randomness[i3 + 2] = Math.random();
    }
  }

  private setupScrollSync(scrollManager: ScrollManager): void {
    scrollManager.onScroll(() => {
      const scroll = scrollManager.getProgress();
      this.material.uniforms.uScroll.value = scroll * 5;
    });
  }

  onResize(width: number, height: number): void {
    this.material.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio,
      2
    );
  }

  update(delta: number, elapsed: number): void {
    this.material.uniforms.uTime.value = elapsed;

    // Smooth mouse following
    this.mousePosition.x +=
      (this.targetMousePosition.x - this.mousePosition.x) * 0.05;
    this.mousePosition.y +=
      (this.targetMousePosition.y - this.mousePosition.y) * 0.05;

    if (this.config.mouse) {
      const positions = this.geometry.attributes.position.array as Float32Array;
      const spread = this.config.spread;

      for (let i = 0; i < this.config.count; i++) {
        const i3 = i * 3;
        const randomX = this.randomness[i3];
        const randomY = this.randomness[i3 + 1];

        // Mouse influence
        const mouseX =
          (this.mousePosition.x - 0.5) * spread * randomX * 0.5;
        const mouseY =
          (this.mousePosition.y - 0.5) * spread * randomY * 0.5;

        positions[i3] += mouseX * delta * 0.5;
        positions[i3 + 1] += mouseY * delta * 0.5;
      }

      this.geometry.attributes.position.needsUpdate = true;
    }
  }

  setColor(color: string): void {
    this.material.uniforms.uColor.value.set(color);
  }

  setSize(size: number): void {
    this.material.uniforms.uSize.value = size;
  }

  destroy(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default Particles;