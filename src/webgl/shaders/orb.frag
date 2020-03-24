precision highp float;

uniform float uTime;
uniform float uAlpha;
varying vec2 vUv;

void main() {
  float dist = length(vUv);
  gl_FragColor = vec4(0.9, 0.5, 0.5, uAlpha);
}
