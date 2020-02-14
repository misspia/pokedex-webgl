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

    const geometry = new THREE.PlaneGeometry(width, height, 2, 2);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    spriteTexture.minFilter = THREE.LinearFilter;

    const frontMaterial = new THREE.RawShaderMaterial({
      side: THREE.FrontSide,
      transparent: false,
      fragmentShader,
      vertexShader,
      flatShading: true,
      transparent: true,
      uniforms: this.uniforms,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
        uContentVisibility: { type: 'f', value: 1, },
        uBGVisibility: { type: 'f', value: 1, },
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

    const tl = new TimelineMax({ delay: 0.2 });
    tl
      .to(this.front.material.uniforms.uContentVisibility, 0.8, {
        value: 0,
      })
      .to(this.front.material.uniforms.uBGVisibility, 0.8, {
        value: 0,
      })
  }
}
