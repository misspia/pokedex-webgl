import * as THREE from 'three';
import shellFragment from './shaders/shell.frag';
import shellVertex from './shaders/shell.vert';
import outerCoreFragment from './shaders/outerCore.frag';
import outerCoreVertex from './shaders/outerCore.vert';
import innerCoreFragment from './shaders/innerCore.frag';
import innerCoreVertex from './shaders/innerCore.vert';

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

  get outerCoreUniforms() {
    return this.outerCore.material.uniforms;
  }

  get innerCoreUniforms() {
    return this.innerCore.material.uniforms;
  }

  set wireframe(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  createShell() {
    const geometry = new THREE.SphereGeometry(ORB_RADIUS, 32, 32);
    const material = new THREE.RawShaderMaterial({
      fragmentShader: shellFragment,
      vertexShader: shellVertex,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 1 },
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
      fragmentShader: outerCoreFragment,
      vertexShader: outerCoreVertex,
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
      fragmentShader: innerCoreFragment,
      vertexShader: innerCoreVertex,
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
    return this.animator.setType(type);
  }
}
