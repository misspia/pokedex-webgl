import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { clamp } from '../utils';

export default class Controls {
  constructor(context) {
    this.context = context
    this.controls = new MapControls(
      this.context.camera,
      this.context.renderer.domElement
    );
    this.controls.screenSpacePanning = false;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;

    this.controls.update();
  }
  update(bounds) {
    const { minX, maxX, minZ, maxZ } = bounds;
    const x = clamp(this.context.camera.position.x, minX, maxX);
    const z = clamp(this.context.camera.position.z, minZ, maxZ);

    if (this.context.camera.position.x <= minX || this.context.camera.position.x >= maxX) {
      this.controls.target.x = x;
    }
    if (this.context.camera.position.z <= minZ || this.context.camera.position.z >= maxZ) {
      this.controls.target.z = z;
    }
    this.controls.update();
  }
}
