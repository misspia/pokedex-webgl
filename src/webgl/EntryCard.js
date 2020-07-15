import * as THREE from 'three';
import fragmentShader from './shaders/cardFront.frag';
import vertexShader from './shaders/cardFront.vert';
import { Colors } from '../themes';
import ComponentNames from '../constants/componentNames';

export default class EntryListItem {
  constructor({
    id = 0,
    name = '',
    spriteUrl = '',
    types = [],
    height = 5,
    width = 5,
    backMesh,
  }) {
    this.id = id;
    this.name = name;
    this.isActive = false;
    this.isFlipped = false;
    this.width = width;
    this.height = height;

    const geometry = new THREE.PlaneGeometry(this.width, this.height, 2, 2);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    spriteTexture.generateMipmaps = true;
    spriteTexture.anisotropy = 1;

    spriteTexture.minFilter = THREE.LinearFilter;

    const mainType = types[0];
    const frontMaterial = new THREE.RawShaderMaterial({
      side: THREE.FrontSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      flatShading: true,
      uniforms: this.uniforms,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
        uContentVisibility: { type: 'f', value: 0, },
        uBGVisibility: { type: 'f', value: 0, },
        uTypeColor: { type: 'v3', value: Colors.typesVector[mainType] },
        uAlpha: { type: 'f', value: 1 },
      },
    });

    this.front = new THREE.Mesh(geometry, frontMaterial);
    this.back = backMesh;
    this.back.position.z = -0.01;

    this.front.name = ComponentNames.CARD_FRONT;
    this.back.name = ComponentNames.CARD_BACK;

    this.pivot = new THREE.Object3D();
    this.pivot.add(this.front);
    this.pivot.add(this.back);
    this.castShadow = true;

    this.pivot.name = id;
    this.alpha = 1;
  }

  get layers() {
    return this.pivot.layers;
  }
  get frontUniforms() {
    return this.front.material.uniforms;
  }

  get backUniforms() {
    return this.back.material.uniforms;
  }

  get position() {
    return this.pivot.position;
  }

  get rotation() {
    return this.pivot.rotation;
  }

  set alpha(alpha) {
    this.frontUniforms.uAlpha.value = alpha;
    this.back.material.opacity = alpha;
  }

  set castShadow(isCastingShadow) {
    this.front.castShadow = isCastingShadow;
    this.back.castShadow = isCastingShadow;
  }

  set scale(factor) {
    this.front.scale.set(factor, factor, factor);
    this.back.scale.set(factor, factor, factor);
  }
  isFront(obj) {
    return obj === this.front;
  }

  isBack(obj) {
    return obj === this.back
  }

  setPosition(x = 0, y = 0, z = 0) {
    this.pivot.position.set(x, y, z);
  }

  setRotation(x = 0, y = 0, z = 0) {
    this.pivot.rotation.set(x, y, z);
  }

  setActiveState(isActive) {
    this.isActive = isActive;
  }

  setFlippedState(isFlipped) {
    this.isFlipped = isFlipped;
  }

  setLayer(layer) {
    this.pivot.layers.set(layer);
    this.front.layers.set(layer);
    this.back.layers.set(layer);
  }
}
