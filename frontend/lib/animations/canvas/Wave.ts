import * as THREE from "three";
import { ScrollManager } from "../core/ScrollManager";
import {
  gradientVertexShader,
  gradientFragmentShader,
} from "../shaders/particles";

interface WaveConfig {
  width?: number;
  height?: number;
  segments?: number;
  color1?: string;
  color2?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

export class Wave {
  private mesh: THREE.Mesh;
  private geometry: THREE.PlaneGeometry;
  private material: THREE.ShaderMaterial;
  private config: Required<WaveConfig>;
  private initialPositions: Float32Array | null = null;

  constructor(
    scene: THREE.Scene,
    scrollManager: ScrollManager,
    config: WaveConfig = {}
  ) {
    this.config = {
      width: config.width || 10,
      height: config.height || 6,
      segments: config.segments || 64,
      color1: config.color1 || "#1c140f",
      color2: config.color2 || "#9d5f37",
      amplitude: config.amplitude || 0.3,
      frequency: config.frequency || 2,
      speed: config.speed || 0.5,
    };

    this.geometry = new THREE.PlaneGeometry(
      this.config.width,
      this.config.height,
      this.config.segments,
      this.config.segments
    );

    // Store initial positions for wave animation
    this.initialPositions = this.geometry.attributes.position.array.slice() as Float32Array;

    const color1 = new THREE.Color(this.config.color1);
    const color2 = new THREE.Color(this.config.color2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: gradientVertexShader,
      fragmentShader: gradientFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColor1: { value: color1 },
        uColor2: { value: color2 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.z = -3;
    scene.add(this.mesh);

    this.setupScrollSync(scrollManager);
  }

  private setupScrollSync(scrollManager: ScrollManager): void {
    scrollManager.onProgress((progress) => {
      this.material.uniforms.uProgress.value =
        Math.sin(progress * Math.PI) * 0.5 + 0.5;
    });
  }

  update(delta: number, elapsed: number): void {
    this.material.uniforms.uTime.value = elapsed;

    if (!this.initialPositions) return;

    const positions = this.geometry.attributes.position.array as Float32Array;
    const segments = this.config.segments + 1;

    for (let i = 0; i < positions.length; i += 3) {
      const x = this.initialPositions[i];
      const y = this.initialPositions[i + 1];

      // Wave calculation
      const waveY =
        Math.sin(x * this.config.frequency + elapsed * this.config.speed) *
        this.config.amplitude +
        Math.sin(x * this.config.frequency * 0.5 + elapsed * this.config.speed * 0.7) *
          this.config.amplitude *
          0.5;

      positions[i + 1] = y + waveY;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }

  setColors(color1: string, color2: string): void {
    this.material.uniforms.uColor1.value.set(color1);
    this.material.uniforms.uColor2.value.set(color2);
  }

  setProgress(progress: number): void {
    this.material.uniforms.uProgress.value = progress;
  }

  destroy(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default Wave;