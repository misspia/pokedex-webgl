import * as THREE from 'three';

export default class Orb {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(geometry, material);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setVisible(isVisible = true) {
    this.mesh.visible = isVisible;
  }
}
