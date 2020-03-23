import * as THREE from 'three';
import fragmentShader from './shaders/orb.frag';
import vertexShader from './shaders/orb.vert';

export default class Orb {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    const geometry = new THREE.SphereGeometry(2, 12, 12);
    this.material = new THREE.RawShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
    });
    this.pivot = new THREE.Mesh(geometry, this.material);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setVisible(isVisible = true) {
    this.mesh.visible = isVisible;
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
  }
}
