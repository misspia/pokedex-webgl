import * as THREE from 'three';
import Animator from './EntranceAnimator';
import vertexShader from '../../shaders/gate.vert';
import fragmentShader from '../../shaders/gate.frag';
import ComponentNames from '../../../constants/componentNames';

export default class EntranceStage {
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

  exit() {
    return this.animator.exit()
      .then(() => {
        this.context.remove(this.gate);
        return;
      })
  }

  init() {
    this.context.setClearColor(0xffffff);
    this.context.setCameraPosition(0, 0, 7);

    this.context.lookAt(new THREE.Vector3());
    this.createGate();

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
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { type: 'f', value: 0.0 },
        uExitProgress: { type: 'f', value: 0.0 },
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

    this.context.add(this.gate);
  }

  update() {
    this.gate.material.uniforms.uTime.value = this.clock.getElapsedTime();
  }
}
