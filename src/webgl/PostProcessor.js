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
    this.bloom = {};
    this.fxaa = {};
    this.renderPass = {};
  }

  setup() {
    this.composer = new EffectComposer(this.context.renderer);

    this.renderPass = new RenderPass(this.context.scene, this.context.camera);
    this.renderPass.renderToScreen = false;

    this.fxaa = new ShaderPass(FXAAShader);
    this.fxaa.uniforms.resolution.value.set(
      1 / this.context.canvas.width,
      1 / this.context.canvas.height,
    );
    this.fxaa.renderToScreen = false;

    const dimensions = new THREE.Vector2(
      this.context.canvas.width,
      this.context.canvas.height,
    );

    this.bloom = new UnrealBloomPass(dimensions, 1.2, 0.55, 0.05);
    this.bloom.renderToScreen = true;



    this.addPass(this.renderPass);
    this.addPass(this.fxaa);
    this.addPass(this.bloom);

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

  render() {
    this.composer.render();
  }
}
