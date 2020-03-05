import * as THREE from 'three';

export default class Petals {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.numPetals = 100;
    this.petals = [];
    this.group = new THREE.Group();
  }
  createPetals() {

  }
}
