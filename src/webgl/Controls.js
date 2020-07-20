import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { clamp } from '../utils';

export default class Controls extends MapControls {
  constructor(context) {
    super(context.camera, context.renderer.domElement);
    this.context = context;
    this.enableZoom = false;
    this.enableRotate = false;
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;
  }

  enable() {
    this.enabled = true;
  }

  disabled() {
    this.enabled = false;
  }
}
