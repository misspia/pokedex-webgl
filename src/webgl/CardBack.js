import * as THREE from 'three';
import { Images } from '../themes';

export default class CardBack {
  constructor({
    width,
    height,
  }) {
    this.geometry = new THREE.PlaneGeometry(width, height, 2, 2);

    const texture = new THREE.TextureLoader().load(Images.cardBack);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.flipY = true;

    this.material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      transparent: true,
      map: texture,
    });
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.rotation.z += Math.PI;
  }

  clone() {
    return this.pivot.clone();
  }
}
