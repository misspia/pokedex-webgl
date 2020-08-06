import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.spot = new THREE.SpotLight(0xffffff, 0.8);
    this.spot.castShadow = true;
    this.spot.shadow.mapSize.width = 4096;
    this.spot.shadow.mapSize.height = 4096;
    this.spot.shadow.near = 1;
    this.spot.shadow.far = 400;
    this.spot.position.set(0, 300, 0);

    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.3);

  }
  updateSpot(position) {
    this.spot.position.set(
      position.x,
      this.spot.position.y,
      position.z
    );
  }
}
