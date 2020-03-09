import * as THREE from 'three';
import Petal from './Petal';

export default class Petals {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.numPetals = 100;
    this.petals = [];
    this.group = new THREE.Group();

    this.createPetals();
  }
  createPetals() {
    for (let i = 0; i < this.numPetals; i++) {
      const petal = new Petal();
      this.group.add(petal.mesh);
      this.petals.push(petal);
    }
  }
}
