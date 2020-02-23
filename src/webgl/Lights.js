import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.spot = new THREE.SpotLight(0xffffff, 0.5, 1000, 1.05, 0.3, 2);
    this.spot.shadow.mapSize.width = 1024;
    this.spot.shadow.mapSize.height = 1024;
    this.spot.position.set(0, 150, 0);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.25);

    this.directional = new THREE.DirectionalLight(0xffffff, 0.75);
    this.directional.position.setScalar(100);
    // this.directional.position.set(120, 100, 0);
  }
}

