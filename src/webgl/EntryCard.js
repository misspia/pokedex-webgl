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
    anisotropy = 1,
    types = [],
    height = 5,
    width = 5,
  }) {
    this.id = id;
    this.name = name;
    this.isActive = false;
    const geometry = new THREE.PlaneGeometry(width, height, 2, 2);

    const spriteTexture = new THREE.TextureLoader().load(spriteUrl);
    spriteTexture.generateMipmaps = true;
    spriteTexture.anisotropy = anisotropy;

    spriteTexture.minFilter = THREE.LinearFilter;

    const mainType = types[0];
    const frontMaterial = new THREE.RawShaderMaterial({
      side: THREE.FrontSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      flatShading: true,
      transparent: true,
      uniforms: this.uniforms,
      uniforms: {
        uSpriteTexture: { type: 't', value: spriteTexture },
        uContentVisibility: { type: 'f', value: 0, },
        uBGVisibility: { type: 'f', value: 0, },
        uTypeColor: { type: 'v3', value: Colors.typesVector[mainType] },
        alpha: { type: 'f', value: 1 },
      },
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
      transparent: true,
    });

    this.front = new THREE.Mesh(geometry, frontMaterial);
    this.back = new THREE.Mesh(geometry, backMaterial);
    this.back.position.z = -0.01;

    this.front.name = ComponentNames.CARD_FRONT;
    this.back.name = ComponentNames.CARD_BACK;

    this.mesh = new THREE.Object3D();
    this.mesh.add(this.front);
    this.mesh.add(this.back);

    this.mesh.name = id;
  }

  get layers() {
    return this.mesh.layers;
  }
  get frontUniforms() {
    return this.front.material.uniforms;
  }

  get backUniforms() {
    return this.back.material;
  }

  set positionY(y) {
    this.mesh.position.y = y;
  }

  set alpha(alpha) {
    console.debug()
    this.frontUniforms.alpha.value = alpha;
    this.back.opactiy = alpha;
  }

  isFront(obj) {
    return obj === this.front;
  }

  isBack(obj) {
    return obj === this.back
  }

  setPosition(x = 0, y = 0, z = 0) {
    this.mesh.position.set(x, y, z);
  }
  setRotation(x = 0, y = 0, z = 0) {
    this.mesh.rotation.set(x, y, z);
  }
  setActiveState(isActive) {
    this.isActive = isActive;
  }

  setLayer(layer) {
    this.mesh.layers.set(layer);
    this.front.layers.set(layer);
    this.back.layers.set(layer);
  }
}
