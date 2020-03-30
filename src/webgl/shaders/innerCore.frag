precision highp float;

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform float uColorProgress;

varying vec2 vUv;

void main() {
  float dist = length(vUv);
  vec3 baseColor = vec3(0.2, 0.2, 0.9);
  vec3 color = mix(baseColor, uColor, uColorProgress);
  gl_FragColor = vec4(color, uAlpha);
}
