export const particlesVertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  uniform float uSize;
  
  attribute float aScale;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandomness;
  
  //	Simplex 3D Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
  
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
  
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
  
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
  
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
  
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
  
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
  
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vec3 pos = position;
    
    // Add noise-based movement
    float noiseFreq = 0.5;
    float noiseAmp = 0.5;
    vec3 noisePos = vec3(pos.x * noiseFreq, pos.y * noiseFreq, uTime * 0.2);
    float noise = snoise(noisePos);
    
    // Scroll-based movement
    pos.y += uScroll * aRandomness.y * 2.0;
    pos.x += sin(uTime * aRandomness.z + aRandomness.x * 6.28) * aRandomness.z * 0.3;
    pos.y += noise * noiseAmp;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on distance and pixel ratio
    gl_PointSize = uSize * uPixelRatio * aScale * (1.0 / -mvPosition.z);
    
    // Pass to fragment shader
    vColor = color;
    vAlpha = 1.0 - smoothstep(0.0, 5.0, -mvPosition.z);
    vRandomness = aRandomness.x;
  }
`;

export const particlesFragmentShader = `
  uniform vec3 uColor;
  uniform sampler2D uTexture;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandomness;
  
  void main() {
    // Circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    alpha *= vAlpha;
    
    // Color variation
    vec3 finalColor = uColor + vRandomness * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const gradientVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const gradientFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    // Create flowing gradient
    float gradient = vUv.y;
    gradient += sin(vUv.x * 3.14159 + uTime) * 0.1;
    
    // Mouse interaction
    float mouseDist = distance(vUv, uMouse);
    gradient += smoothstep(0.5, 0.0, mouseDist) * 0.2;
    
    // Progress-based reveal
    gradient *= uProgress;
    
    vec3 color = mix(uColor1, uColor2, gradient);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default {
  particlesVertexShader,
  particlesFragmentShader,
  gradientVertexShader,
  gradientFragmentShader,
};