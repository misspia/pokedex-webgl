import * as THREE from 'three';
import fragmentShader from './entryListItem.frag';
import vertexShader from './entryListItem.vert';

export default class EntryListItem {
  constructor({
    id = 0,
    name = '',
    spriteUrl = '',
    onLoadComplete = () => { },
    height = 5,
    width = 5,
  }) {
    this.id = id;
    this.name = name;
    this.isActive = false;

    const geometry = new THREE.PlaneGeometry(width, height, 5, 5);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl, onLoadComplete);
    spriteTexture.minFilter = THREE.LinearFilter;

    const material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      transparent: false,
      fragmentShader,
      vertexShader,
      flatShading: true,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
      },
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = id;
    this.mesh.castShadow = true;
  }
  setPosition(x = 0, y = 0, z = 0) {
    this.mesh.position.set(x, y, z);
  }
  setRotation(x = 0, y = 0, z = 0) {
    this.mesh.rotation.set(x, y, z);
  }
  setActiveState(isActive) {
    this.isActive = isActive;
  }
}
