precision highp float;

uniform sampler2D uSpriteTexture;

varying vec2 vUv;

// https://stackoverflow.com/questions/43970170/bordered-rounded-rectangle-in-glsl
// https://codepen.io/prisoner849/pen/OeJGjB?editors=0010
void main() {
  vec4 bgColor = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 spriteTexture = texture2D(uSpriteTexture, vec2(vUv.x, vUv.y * 1.5 - 0.25));

  vec4 color;
  if(spriteTexture.a == 1.0) {
    color = spriteTexture;
  } else {
    color = bgColor;
  }

  gl_FragColor = color;
}