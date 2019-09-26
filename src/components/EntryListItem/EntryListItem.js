import * as THREE from 'three';
import fragmentShader from './entryListItem.frag';
import vertexShader from './entryListItem.vert';

export default class EntryListItem {
  constructor({
    id = 0,
    name = '',
    spriteUrl = '',
  }) {
    this.id = id;
    this.name = name;
    this.isActive = false;
    this.mesh = this.createMesh(spriteUrl);
  } 

  createMesh(spriteUrl) {
    const geometry = new THREE.PlaneGeometry(5, 5, 5, 5);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
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
    return new THREE.Mesh(geometry, material);
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
