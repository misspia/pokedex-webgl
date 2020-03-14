import * as THREE from 'three';
import Animator from './EntranceAnimator';
import vertexShader from '../../shaders/gate.vert';
import fragmentShader from '../../shaders/gate.frag';

export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animator(this.context);
    this.clock = new THREE.Clock();
    this.gate = {};

    this.init();
  }


  destroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  init() {
    this.context.carousel.setVisible(false);

    this.context.setCameraPosition(0, 0, 7);
    this.context.lookAt(new THREE.Vector3());
    this.createGate();
    this.context.add(this.gate);

    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.context.mouse.updatePosition(e);
    this.gate.material.uniforms.uMouse.value = this.context.mouse.uv;
  }

  createGate() {
    const geometry = new THREE.PlaneGeometry(15, 15);
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.gate = new THREE.Mesh(geometry, material);
  }
  update() {
    this.gate.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}