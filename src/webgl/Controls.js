import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { clamp } from '../utils';

export default class Controls {
  constructor(context) {
    this.context = context
    this.controls = new OrbitControls(
      this.context.camera,
      this.context.renderer.domElement,
    );
    // this.controls = new MapControls(
    //   this.context.camera,
    //   this.context.renderer.domElement
    // );
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;

    // this.controls.screenSpacePanning = false;
    // this.controls.enableRotate = false;
    // this.controls.enableZoom = false;
    // this.controls.maxPolarAngle = Math.PI / 2;

    // this.controls.minAzimuthAngle = -Math.PI;
    // this.controls.maxAzimuthAngle = Math.PI;

    this.controls.update();
  }

  update() {

  }
}
