import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export default class PostProcessor {
  constructor(context) {
    this.context = context;
    this.composer = {};
  }
  setup() {
    this.composer = new EffectComposer(this.context.renderer);
  }
  resize() {
    this.composer.setSize(
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
  addPass(pass) {
    this.composer.addPass(pass);
  }
  addBloomPass(isRenderedToScreen = false) {
    const dimensions = new THREE.Vector2(
      this.context.canvas.width,
      this.context.canvas.height,
    );
    const strength = 1.2;
    const radius = 0.55;
    const threshold = 0.05;
    const bloomPass = new UnrealBloomPass(dimensions, strength, radius, threshold);
    bloomPass.renderToScreen = isRenderedToScreen;


    this.addPass(bloomPass);
  }
  addFXAAPass(isRenderedToScreen = false) {
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(
      1 / this.context.canvas.with,
      1 / this.context.canvas.height,
    );
    fxaaPass.renderToScreen = isRenderedToScreen;
  }
  addRenderPass(isRenderedToScreen = false) {
    this.renderPass = new RenderPass(this.context.scene, this.context.camera);
    this.renderPass.renderToScreen = isRenderedToScreen;
    this.addPass(this.renderPass);
  }
  render() {
    this.composer.render();
  }
}
