import * as THREE from 'three';
import Animator from './EntranceAnimator';
import vertexShader from '../../shaders/gate.vert';
import fragmentShader from '../../shaders/gate.frag';

export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animator(this.context);
    this.gate = {};
  }

  destroy() {

  }

  init() {
    this.context.carousel.setVisible(false);

    this.context.setCameraPosition(0, 0, -5);
    this.context.lookAt(new THREE.Vector3());
    this.createGate();
    this.context.add(this.gate);



    window.addEventListener('mousemove', (e) => {
      this.context.mouse.updatePosition(e);
    })
  }

  createGate() {
    const geometry = new THREE.PlaneGeometry(25, 25);
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uiforms: {

      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.gate = new THREE.Mesh(geometry, material);
  }
}
