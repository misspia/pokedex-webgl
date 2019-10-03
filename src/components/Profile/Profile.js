import * as THREE from 'three';

export default class Profile {
  constructor() {
    this.id = 0;
    this.isActive = false;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffeeee,
    });
    this.geometry = new THREE.PlaneGeometry(5, 5, 5);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  
  hide() {
    this.isActive = false;
  }
  reveal() {
    this.isActive = true;
  }

  setId(id) {
    this.id = id;
  }
}
