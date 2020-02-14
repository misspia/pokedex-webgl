import * as THREE from 'three';
import fragmentShader from './shaders/cardFront.frag';
import vertexShader from './shaders/cardFront.vert';
import { TweenMax, TimelineMax } from 'gsap';

export default class EntryListItem {
  constructor({
    id = 0,
    name = '',
    spriteUrl = '',
    height = 5,
    width = 5,
  }) {
    this.id = id;
    this.name = name;
    this.isActive = false;
    this.resetPosition = new THREE.Vector3();
    this.resetRotation = new THREE.Vector3();

    const geometry = new THREE.PlaneGeometry(width, height, 2, 2);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    spriteTexture.minFilter = THREE.LinearFilter;

    const frontMaterial = new THREE.RawShaderMaterial({
      side: THREE.FrontSide,
      transparent: false,
      fragmentShader,
      vertexShader,
      flatShading: true,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
        uContentVisibility: { type: 'f', value: 1, },
      },
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.BackSide,
    });

    this.front = new THREE.Mesh(geometry, frontMaterial);
    this.back = new THREE.Mesh(geometry, backMaterial);
    this.back.position.z = -0.01;

    this.mesh = new THREE.Object3D();
    this.mesh.add(this.front);
    this.mesh.add(this.back);

    this.mesh.name = id;
  }
  setPosition(x = 0, y = 0, z = 0) {
    this.mesh.position.set(x, y, z);
  }
  setRotation(x = 0, y = 0, z = 0) {
    this.mesh.rotation.set(x, y, z);
  }
  setActiveState(isActive) {
    this.isActive = isActive;
    this.resetPosition.copy(this.mesh.position);
    this.resetRotation.copy(this.mesh.rotation);

    console.debug(this.front.material.uniforms)
    const tl = new TimelineMax({ delay: 0 });
    tl
      .to(this.front.material.uniforms.uContentVisibility, 1, {
        value: 0,
      })
    // .to(this.mesh.rotation, 0.5, {
    //   y: Math.PI,
    //   repeat: 2,
    // })
    // .to(this.front.scale, 1, {
    //   x: 10,
    //   // z: 0.3,
    // }, 0)
    // .to(this.back.scale, 1, {
    //   x: 0.3,
    //   z: 0.3,
    // }, 0);

  }
}
