import * as THREE from 'three';
import Animator from './EntranceAnimator';
import vertexShader from '../../shaders/gate.vert';
import fragmentShader from '../../shaders/gate.frag';
import ComponentNames from '../../../constants/componentNames';


const CAMERA_DIST_OFFSET = 20;
const GATE_DIST_OFFSET = 10;

export default class EntranceStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animator(this);
    this.clock = new THREE.Clock();
    this.gate = {};
    this.init();
  }

  get gateUniforms() {
    return this.gate.material.uniforms;
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  exit() {
    return this.animator.exit(this.gate)
      .then(() => {
        this.context.remove(this.gate);
        return;
      })
  }

  init() {
    this.context.setClearColor(0x000000);
    this.context.setCameraPosition(0, 0, CAMERA_DIST_OFFSET);

    this.context.lookAt(new THREE.Vector3());
    this.createGate();
    this.fitGateToScreen();

    this.animator.enter();

    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.context.mouse.updatePosition(e);
    this.context.mouse.updateIntersection();
    const { intersection } = this.context.mouse;
    if (intersection && intersection.object.name === ComponentNames.GATE) {
      this.gate.material.uniforms.uMouse.value = intersection.uv;
    }
  }

  createGate() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { type: 'f', value: 0.0 },
        uAlpha: { value: 0 },
        uExitProgress: { value: 1.0 },
        uResolution: {
          type: 'v2',
          value: new THREE.Vector2(
            this.context.canvas.innerWidth,
            this.context.canvas.innerHeight,
          )
        }
      },
      side: THREE.FrontSide,
      transparent: true,
    });
    this.gate = new THREE.Mesh(geometry, material);
    this.gate.name = ComponentNames.GATE;

    this.gate.position.z = GATE_DIST_OFFSET;

    this.context.add(this.gate);
  }
  fitGateToScreen() {
    const cameraZ = this.context.camera.position.z;
    const planeZ = this.gate.position.z;
    const distance = cameraZ - planeZ;
    const { aspect } = this.context.camera;
    const vFov = this.context.camera.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * aspect;

    const scale = Math.max(height, width);
    this.gate.scale.x = scale;
    this.gate.scale.y = scale;
    console.debug(height, width);
  }

  update() {
    this.gate.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}
