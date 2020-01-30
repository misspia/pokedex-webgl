import * as THREE from 'three';

export default class FLoor {
  constructor({ size = 1000 }) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.position.y = this.mesh.position.y = size / 2 - 0.2;
  }
  setPosition({ x, y, z }) {
    if (x) {
      this.mesh.position.x = x;
    }
    if (y) {
      this.mesh.position.y = y;
    }
    if (z) {
      this.mesh.position.z = z;
    }
  }
}
