// Built and based on animation by https://codepen.io/cameronknight/pen/ogxWmBP
// Implements a dual gradient background with interactive touch displacement and noise

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D uTouchTexture;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uBgIntensity;

varying vec2 vUv;

// Helper function to generate film grain noise
float grain(vec2 uv, float time) {
  // Generate pseudo random values based on sine waves and dot products
  vec2 grainUv = uv * iResolution * 0.5;
  float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);

  // Normalize the random value from [0, 1] to [-1, 1]
  return grainValue * 2.0 - 1.0;
}

void main() {
  vec2 uv = vUv;

  // Apply touch interaction logic 
  vec4 touch = texture2D(uTouchTexture, uv);

  float vx = -(touch.r * 2.0 - 1.0);
  float vy = -(touch.g * 2.0 - 1.0);

  // Use blue channel as intensity mask
  float intensity = touch.b;

  uv.x += vx * 0.25 * intensity;
  uv.y += vy * 0.25 * intensity;

  // Animation center points
  vec2 center1 = vec2(0.5 + sin(iTime * 0.4) * 0.3, 0.5 + cos(iTime * 0.5) * 0.3);
  vec2 center2 = vec2(0.5 + cos(iTime * 0.6) * 0.3, 0.5 + sin(iTime * 0.45) * 0.3);

  // Calculate distance from fragment to animated centers using Euclidean norm (length)
  float d1 = length(uv - center1);
  float d2 = length(uv - center2);

  // Create soft radial falloff
  float i1 = 1.0 - smoothstep(0.0, 0.6, d1);
  float i2 = 1.0 - smoothstep(0.0, 0.6, d2);

  vec3 color = vec3(uBgIntensity);

  // Mix in two gradient colors
  color += uColor1 * i1;
  color += uColor2 * i2;

  // Add final grain texture
  color += grain(uv, iTime) * 0.075;

  gl_FragColor = vec4(color, 1.0);
}