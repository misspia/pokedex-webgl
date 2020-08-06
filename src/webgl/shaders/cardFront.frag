precision highp float;

uniform sampler2D uSpriteTexture;
uniform float uContentVisibility;
uniform float uBGVisibility;
uniform vec3 uTypeColor;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec4 bgColor = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 spriteTexture = texture2D(uSpriteTexture, vec2(vUv.x, vUv.y * 1.5 - 0.25));

  vec4 color;
  if(spriteTexture.a == 1.0) {
    spriteTexture.rgb = mix(spriteTexture.rgb, uTypeColor, uContentVisibility);
    color = spriteTexture;
  } else {
    // bgColor.rgb = mix(bgColor.rgb, uTypeColor, uBGVisibility);
    color = bgColor;
  }

  color.rgb = mix(color.rgb, bgColor.rgb, uBGVisibility);
  gl_FragColor = vec4(color.rgb, uAlpha);
}

