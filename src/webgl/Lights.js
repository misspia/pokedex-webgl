import * as THREE from 'three';
import { toRadians } from '../utils';

export default class Lights {
  constructor() {
    this.spot = new THREE.SpotLight(
      0xffffff,
      0.3,
      2000,
      toRadians(80),
      0.3,
      0.1
    );
    this.spot.castShadow = true;
    this.spot.shadow.mapSize.width = 1024;
    this.spot.shadow.mapSize.height = 1024;
    this.spot.position.set(0, 150, 0);

    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.2);

    this.directional = new THREE.DirectionalLight(0xffffff, 1);
    this.directional.position.setScalar(100);
    // this.directional.position.set(120, 100, 0);
  }
}

