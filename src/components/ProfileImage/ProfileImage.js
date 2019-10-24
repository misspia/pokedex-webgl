import * as THREE from 'three';
import fragmentShader from './profileImage.frag';
import vertexShader from './profileImage.vert';

export default class ProfileImage {
  constructor({
    spriteUrl = ''
  }) {
    
    const geometry = new THREE.PlaneGeometry(10, 10, 5);
    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    spriteTexture.minFilter = THREE.LinearFilter;
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
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

}
