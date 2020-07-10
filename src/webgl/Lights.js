import * as THREE from 'three';
import { toRadians } from '../utils';

export default class Lights {
  constructor() {
    this.spot = new THREE.SpotLight(0xffffff, 1);
    this.spot.castShadow = true;
    this.spot.shadow.mapSize.width = 2048;
    this.spot.shadow.mapSize.height = 2048;
    this.spot.shadow.near = 0.5;
    this.spot.shadow.far = 700;
    this.spot.position.set(0, 450, 0);

    this.spotHelper = new THREE.SpotLightHelper(this.spot, 0xff0000);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.2);

    this.directional = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directional.position.set(0, 1, 0);
  }
}
