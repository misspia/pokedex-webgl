import * as THREE from 'three';
import fragmentShader from './shaders/orb.frag';
import vertexShader from './shaders/orb.vert';
import { ORB_RADIUS } from '../constants/entries';
import Animator from './animators/OrbAnimator';
import Types from '../constants/types';

export default class Orb {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.animator = new Animator(this);

    const geometry = new THREE.SphereGeometry(ORB_RADIUS * 0.5, 12, 12);
    this.material = new THREE.RawShaderMaterial({
      wireframe: true,
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.5 },
      },
      transparent: true,
    });
    this.pivot = new THREE.Mesh(geometry, this.material);
  }
  get scale() {
    return this.pivot.scale;
  }
  get position() {
    return this.pivot.position;
  }

  set wireframe(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  setPosition(x, y, z) {
    this.pivot.position.set(x, y, z);
  }

  setVisible(isVisible = true) {
    this.mesh.visible = isVisible;
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
  }

  setType(type = Types.normal) {
    this.animator.setType(type);
  }
}
