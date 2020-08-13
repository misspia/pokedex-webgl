import * as THREE from 'three';

export default class Floor {
  constructor() {
    this.width = 450;
    this.depth = 450;
    this.height = 0.1;

    const geometry = new THREE.PlaneGeometry(this.width, this.depth, this.width, this.depth);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
    });
    this.pivot = new THREE.Mesh(geometry, material);
    this.pivot.receiveShadow = true;
    this.pivot.rotation.x -= Math.PI / 2;
  }
  setPosition({ x, y, z }) {
    if (x) {
      this.pivot.position.x = x;
    }
    if (y) {
      this.pivot.position.y = y;
    }
    if (z) {
      this.pivot.position.z = z;
    }
  }
}
