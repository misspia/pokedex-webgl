import * as THREE from 'three';
import fragmentShader from './shaders/orb.frag';
import vertexShader from './shaders/orb.vert';
import { ORB_RADIUS } from '../constants/entries';
import Animator from './animators/OrbAnimator';
import Types from '../constants/types';

const SHELL_RADIUS_FACTOR = 1;
const OUTER_CORE_RADIUS_FACTOR = 0.5;
const INNER_CORE_RADIUS_FACTOR = 0.1;

export default class Orb {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    this.shell = {};
    this.outerCore = {};
    this.innerCore = {};
    this.pivot = new THREE.Object3D();

    this.createShell();
    this.createOuterCore();
    this.createInnerCore();

    this.animator = new Animator(this);

  }
  get scale() {
    return this.pivot.scale;
  }
  get position() {
    return this.pivot.position;
  }

  get shellUniforms() {
    return this.shell.material.uniforms;
  }

  set wireframe(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  createShell() {
    const geometry = new THREE.SphereGeometry(ORB_RADIUS, 32, 32);
    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.5 },
        uColor: { value: new THREE.Vector3() },
        uColorProgress: { value: 0.0 },
      },
      transparent: true,
    });
    this.shell = new THREE.Mesh(geometry, material);
    this.pivot.add(this.shell);
  }

  createOuterCore() {
    const geometry = new THREE.SphereGeometry(ORB_RADIUS * OUTER_CORE_RADIUS_FACTOR, 32, 32);
    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.5 },
        uColor: { value: new THREE.Vector3() },
        uColorProgress: { value: 0.0 },
      },
      transparent: true,
    });
    this.outerCore = new THREE.Mesh(geometry, material);
    this.pivot.add(this.outerCore);
  }

  createInnerCore() {
    const geometry = new THREE.SphereGeometry(ORB_RADIUS * INNER_CORE_RADIUS_FACTOR, 32, 32);
    const material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.5 },
        uColor: { value: new THREE.Vector3() },
        uColorProgress: { value: 0.0 },
      },
      transparent: true,
    });
    this.innerCore = new THREE.Mesh(geometry, material);
    this.pivot.add(this.innerCore);
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
