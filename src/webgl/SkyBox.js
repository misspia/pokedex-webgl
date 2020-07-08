import * as THREE from 'three';
import { toRadians, clamp } from '../utils';

THREE.Object3D.prototype.rotateAroundWorldAxis = function () {

  // rotate object around axis in world space (the axis passes through point)
  // axis is assumed to be normalized
  // assumes object does not have a rotated parent

  var q = new THREE.Quaternion();

  return function rotateAroundWorldAxis(point, axis, angle) {

    q.setFromAxisAngle(axis, angle);

    this.applyQuaternion(q);

    this.position.sub(point);
    this.position.applyQuaternion(q);
    this.position.add(point);

    return this;

  }

}();

export default class Skybox {
  constructor() {
    this.width = 5000;
    this.depth = 5000;
    this.height = 20;

    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    /**
     * remove top face
     */
    geometry.faces.splice(4, 2);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.pivot = new THREE.Mesh(geometry, material);
    this.pivot.receiveShadow = true;
    this.pivot.position.y = this.pivot.position.y = this.height / 2 - 0.2;
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
