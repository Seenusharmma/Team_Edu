import * as THREE from "three";
import { ScrollManager } from "../core/ScrollManager";

interface BlobConfig {
  radius?: number;
  segments?: number;
  color?: string;
  distortion?: number;
  speed?: number;
}

export class FluidBlob {
  private mesh: THREE.Mesh;
  private geometry: THREE.IcosahedronGeometry;
  private material: THREE.ShaderMaterial;
  private config: Required<BlobConfig>;
  private originalPositions: Float32Array | null = null;
  private time = 0;

  constructor(
    scene: THREE.Scene,
    scrollManager: ScrollManager,
    config: BlobConfig = {}
  ) {
    this.config = {
      radius: config.radius || 1.5,
      segments: config.segments || 64,
      color: config.color || "#9d5f37",
      distortion: config.distortion || 0.3,
      speed: config.speed || 0.5,
    };

    this.geometry = new THREE.IcosahedronGeometry(
      this.config.radius,
      this.config.segments
    );

    // Store original positions
    this.originalPositions = this.geometry.attributes.position.array.slice() as Float32Array;

    const vertexShader = `
      uniform float uTime;
      uniform float uDistortion;
      uniform float uSpeed;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      // Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          
        float n_ = 1.0/7.0;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      
      void main() {
        vec3 pos = position;
        
        // Multi-layered noise
        float noise1 = snoise(pos * 2.0 + uTime * uSpeed);
        float noise2 = snoise(pos * 4.0 - uTime * uSpeed * 0.8);
        float noise3 = snoise(pos * 8.0 + uTime * uSpeed * 0.6);
        
        float displacement = noise1 * uDistortion + noise2 * uDistortion * 0.5 + noise3 * uDistortion * 0.25;
        
        vec3 newPosition = pos + normal * displacement;
        
        vNormal = normalMatrix * normal;
        vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        vDisplacement = displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uColor;
      uniform float uTime;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      void main() {
        // Fresnel effect
        vec3 viewDirection = normalize(-vPosition);
        float fresnel = pow(1.0 - dot(viewDirection, normalize(vNormal)), 3.0);
        
        // Color based on displacement
        vec3 color = uColor;
        color += vDisplacement * 0.2;
        
        // Add rim lighting
        color += fresnel * 0.3;
        
        // Slight glow in center
        float glow = 1.0 - fresnel;
        color *= glow * 0.5 + 0.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDistortion: { value: this.config.distortion },
        uSpeed: { value: this.config.speed },
        uColor: { value: new THREE.Color(this.config.color) },
      },
      wireframe: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);

    this.setupScrollSync(scrollManager);
  }

  private setupScrollSync(scrollManager: ScrollManager): void {
    scrollManager.onVelocity((velocity) => {
      const speed = Math.min(Math.abs(velocity) / 100, 3);
      this.material.uniforms.uSpeed.value = this.config.speed + speed;

      // Rotate based on velocity
      this.mesh.rotation.y += velocity * 0.0001;
    });
  }

  update(delta: number, elapsed: number): void {
    this.material.uniforms.uTime.value = elapsed;
    this.time += delta;

    // Gentle floating motion
    this.mesh.position.y = Math.sin(elapsed * 0.5) * 0.1;
    this.mesh.rotation.x = Math.sin(elapsed * 0.3) * 0.05;
    this.mesh.rotation.z = Math.cos(elapsed * 0.4) * 0.03;
  }

  setColor(color: string): void {
    this.material.uniforms.uColor.value.set(color);
  }

  setDistortion(distortion: number): void {
    this.material.uniforms.uDistortion.value = distortion;
  }

  destroy(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default FluidBlob;