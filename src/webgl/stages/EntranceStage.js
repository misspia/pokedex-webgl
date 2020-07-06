import * as THREE from 'three';
import Animator from '../animators/EntranceAnimator';
import vertexShader from '../shaders/gate.vert';
import fragmentShader from '../shaders/gate.frag';
import ComponentNames from '../../constants/componentNames';

const CAMERA_DIST_OFFSET = 150;
const GATE_DIST_OFFSET = CAMERA_DIST_OFFSET * 0.8;

export default class EntranceStage {
  constructor(context) {
    this.context = context;
    this.animator = {};
    this.clock = new THREE.Clock();
    this.gate = {};
    this.focal = new THREE.Vector3(
      0,
      0,
      150,
      // CAMERA_DIST_OFFSET
    );
    this.init();
  }

  get gateUniforms() {
    return this.gate.material.uniforms;
  }

  destroy() {

  }

  exit() {
    return this.animator.exit();
  }

  init() {
    this.context.setClearColor(0x000000);

    // this.context.setCameraPosition(this.focal.x, this.focal.y, this.focal.z);
    this.context.setCameraPosition(0, 250, 200);
    this.context.lookAt(this.focal);
    this.context.controls.update();

    this.createGate(this.focal);

    this.animator = new Animator(this);
    // this.animator.enter();

    // window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.context.mouse.updatePosition(e);
    this.context.mouse.updateIntersection();
    const { intersection } = this.context.mouse;
    if (intersection && intersection.object.name === ComponentNames.GATE) {
      this.gate.material.uniforms.uPos.value = intersection.uv;
    }
  }

  // createGate() {
  //   const geometry = new THREE.PlaneGeometry(1, 1);
  //   const material = new THREE.RawShaderMaterial({
  //     vertexShader,
  //     fragmentShader,
  //     uniforms: {
  //       uPos: { value: new THREE.Vector2(0.5, 0.5) },
  //       uNoiseFactor: { value: 0.02 },
  //       uRadius: { value: 0.15 },
  //       uTime: { value: 0.0 },
  //       uAlpha: { value: 0 },
  //       uExitProgress: { value: 1.0 },
  //       uResolution: {
  //         type: 'v2',
  //         value: new THREE.Vector2(
  //           this.context.canvas.innerWidth,
  //           this.context.canvas.innerHeight,
  //         )
  //       }
  //     },
  //     side: THREE.FrontSide,
  //     transparent: true,
  //   });
  //   this.gate = new THREE.Mesh(geometry, material);
  //   this.gate.name = ComponentNames.GATE;

  //   this.gate.position.x = this.focal.x;
  //   this.gate.position.y = this.focal.y;
  //   this.gate.position.z = GATE_DIST_OFFSET;

  //   this.context.add(this.gate);
  // }

  createGate() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.gate = new THREE.Mesh(geometry, material);
    this.gate.name = ComponentNames.GATE;

    this.gate.position.x = this.focal.x;
    this.gate.position.y = this.focal.y;
    this.gate.position.z = GATE_DIST_OFFSET;

    this.context.add(this.gate);
    // this.fitGateToScreen();
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
  }

  update() {
    // this.gate.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}
