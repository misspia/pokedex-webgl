precision highp float;

uniform sampler2D uSpriteTexture;
uniform float uContentVisibility;
uniform float uBGVisibility;
uniform vec3 uTypeColor;
uniform float alpha;

varying vec2 vUv;

void main() {
  vec3 color = vec3(1.0, 0.9, 0.9);
  float alpha = 1.0;

  gl_FragColor = vec4(color, alpha);
}
