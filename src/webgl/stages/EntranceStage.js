import * as THREE from 'three';
import Animator from '../animators/EntranceAnimator';
import vertexShader from '../shaders/gate.vert';
import fragmentShader from '../shaders/gate.frag';
import ComponentNames from '../../constants/componentNames';
import gsap, { Power2 } from 'gsap';

export default class EntranceStage {
  constructor(context) {
    this.context = context;
    this.animator = {};
    this.clock = new THREE.Clock();
    this.gate = {};
    this.focal = new THREE.Vector3(
      0,
      500,
      0,
    );
    this.isMousemoveDisabled = false;
    this.init();
  }

  get gateUniforms() {
    return this.gate.material.uniforms;
  }

  destroy() {

  }

  exit() {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.isMousemoveDisabled = true;
    return this.animator.exit();
  }

  init() {
    this.context.setClearColor(0xffffff);
    this.context.camera.position.set(this.focal.x, this.focal.y, 100);
    this.context.camera.lookAt(this.focal);

    this.createGate();

    this.animator = new Animator(this);
    this.animator.enter();

    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    if(this.isMousemoveDisabled) {
      return;
    }
    this.context.mouse.updatePosition(e);
    this.context.mouse.updateIntersection();
    const { intersection } = this.context.mouse;
    if (intersection && intersection.object.name === ComponentNames.GATE) {
      gsap.to(this.gate.material.uniforms.uPos.value, 1.2, {
        x: intersection.uv.x,
        y: intersection.uv.y,
        ease: Power2.easeOut,
      });

    }
  }

  createGate() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uPos: { value: new THREE.Vector2(0.5, 0.5) },
        uNoiseFactor: { value: 0.02 },
        uRadius: { value: 0.1 },
        uTime: { value: 0.0 },
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
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.gate = new THREE.Mesh(geometry, material);
    this.gate.name = ComponentNames.GATE;

    this.gate.position.set(this.focal.x, this.focal.y, this.focal.z);
    this.fitGateToScreen();

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
  }

  update() {
    this.gate.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}
