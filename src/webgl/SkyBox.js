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
  constructor({
    width = 1000,
    height = 1000,
    depth = 1000,
    mouse
  }) {
    this.mouse = mouse;
    this.width = width;
    this.height = height;
    this.depth = depth;

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

  tilt() {
    // const xVelocity = getVelocity(this.mouse.x);
    // const zVelocity = getVelocity(this.mouse.y);

    // this.pivot.rotation.x = clamp(
    //   this.pivot.rotation.x + xVelocity,
    //   MIN_TILT,
    //   MAX_TILT
    // );
    // this.pivot.rotation.z = clamp(
    //   this.pivot.rotation.z + zVelocity,
    //   MIN_TILT,
    //   MAX_TILT
    // );
  }
}

const MAX_TILT = toRadians(3);
const MIN_TILT = toRadians(-3);
const TILT_VELOCITY = 0.01;
const TILT_THRESHOLD = 0;

function getVelocity(pos) {
  if (pos > TILT_THRESHOLD) {
    return TILT_VELOCITY;
  }
  if (pos < -TILT_THRESHOLD) {
    return -TILT_VELOCITY;
  }
  else {
    return 0;
  }
}
