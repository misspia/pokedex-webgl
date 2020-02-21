import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export default class PostProcessor {
  constructor(context) {
    this.context = context;
    this.renderPass = new RenderPass(this.context.scene, this.context.camera);
    this.composer = new EffectComposer(this.context.renderer);

  }
  onResize() {
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
