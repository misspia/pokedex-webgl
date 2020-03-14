import * as THREE from 'three';
import fragmentShader from './shaders/petal.frag';
import vertexShader from './shaders/petal.vert';

export default class Petal {
  constructor() {
    this.geometry = this.createGeometry(0.2);
    this.materual = new THREE.RawShaderMateriall({
      uniforms: {},
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  createGeometry(size = 1) {
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(50, 100, -50, 100, 0, 0);

    const extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 15,
      bevelThickness: 0.5
    };
    const geometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    geometry.scale(size, size, size);

    return geometry;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
}
