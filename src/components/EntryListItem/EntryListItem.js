import * as THREE from 'three';
import fragmentShader from './entryListItem.frag';
import vertexShader from './entryListItem.vert';

export default class EntryListItem {
  constructor({
    id = 0,
    name = '',
    spriteUrl = '',
  }) {
    const geometry = new THREE.PlaneGeometry(2, 2);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    const material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      flatShading: true,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
      },
    });

    this.mesh = new THREE.Mesh(geometry, material);
  } 
}