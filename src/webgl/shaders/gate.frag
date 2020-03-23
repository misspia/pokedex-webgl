precision highp float;

uniform vec2 uPos;
uniform float uExitProgress;
uniform float uAlpha;
uniform float uTime;
uniform float uNoiseFactor;
uniform float uRadius;

varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/2d')

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
  vec4 spiritColor = vec4(0.8, 0.8, 1.0, 1.0);
  float alpha = 0.0;

  float offset = noise(uPos) * uNoiseFactor * remap(0.0, 1.0, -1.0, 1.0, sin(uTime * 3.0));
  vec2 pos = uPos + offset;

  float dist = length(pos - vUv);

  if(dist < uRadius) {
    float mixValue = remap(0.0, 0.1, 0.0, 1.0, uRadius - dist);
    color = mix(color, spiritColor, mixValue);
    alpha = color.a;
  }

  gl_FragColor = vec4(color.rgb, alpha * uAlpha);
}
