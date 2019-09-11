precision highp float;

uniform sampler2D uSpriteTexture;

varying vec2 vUv;

void main() {
  vec4 bgColor = vec4(0.4, 0.7, 1.0, 0.7);
  vec4 spriteTexture = texture2D(uSpriteTexture, vUv);

  vec4 color;
  if(spriteTexture.a == 1.0) {
    color = spriteTexture;
  } else {
    color = bgColor;
  }

  gl_FragColor = color;
}