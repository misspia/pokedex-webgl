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

export default class SkyBox {
  constructor({ size = 1000, mouse }) {
    this.mouse = mouse;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.position.y = this.mesh.position.y = size / 2 - 0.2;
    this.group = new THREE.Group();

    this.add(this.mesh);
  }
  setPosition({ x, y, z }) {
    if (x) {
      this.mesh.position.x = x;
    }
    if (y) {
      this.mesh.position.y = y;
    }
    if (z) {
      this.mesh.position.z = z;
    }
  }
  add(obj) {
    this.group.add(obj);
  }
  tilt() {
    // const xVelocity = getVelocity(this.mouse.x);
    // const zVelocity = getVelocity(this.mouse.y);

    // this.group.rotation.x = clamp(
    //   this.group.rotation.x + xVelocity,
    //   MIN_TILT,
    //   MAX_TILT
    // );
    // this.group.rotation.z = clamp(
    //   this.group.rotation.z + zVelocity,
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