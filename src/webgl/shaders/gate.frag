precision highp float;

uniform vec2 uMouse;
uniform float uExitProgress;
uniform float uTime;
varying vec2 vUv;
varying float vDistance;

#pragma glslify: noise = require('glsl-noise/simplex/2d')

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

void main() {
  vec3 color = vec3(0.95, 0.95, 1.0);
  vec3 spiritColor = vec3(0.8, 0.8, 1.0);
  float alpha = 1.0;

  float mouseOffset = noise(uMouse) * 0.02 * remap(0.0, 1.0, -1.0, 1.0, sin(uTime * 3.0));
  vec2 mouse = uMouse + mouseOffset;

  float mouseDist = length(mouse - vUv);
  float radius = 0.15;

  if(mouseDist < radius) {
    float mixValue = remap(0.0, 0.1, 0.0, 1.0, radius - mouseDist);
    color = mix(color, spiritColor, mixValue);
  }
  color = mix(color, spiritColor, uExitProgress);
  alpha = 1.0 - uExitProgress;

  gl_FragColor = vec4(color, alpha);
}
