import { TimelineMax, Elastic } from 'gsap';
import { Vector2 } from 'three';

export default class EntranceAnimator {
  constructor(stage) {
    this.stage = stage;
    this.gate = stage.gate;
    this.orb = stage.context.orb;
    this.context = stage.context;
  }
  destroy() {
    window.removeEventListener('mousemove', this.onMousemove);
  }

  onMousemove = (e) => {
    this.context.mouse.updatePosition(e);
    this.context.orb.setPosition(
      this.context.mouse.position.x,
      this.context.mouse.position.y,
      10,
    );
  }

  play() {
    window.addEventListener('mousemove', this.onMousemove);
    this.context.orb.setVisible(true);

    return new Promise(resolve => {
      resolve();
    });
  }
  enter() {
    return new Promise(resolve => {
      const tl = new TimelineMax();
      tl
        .to(this.stage.gate.material.uniforms.uAlpha, 1, {
          value: 1,
          onComplete: resolve,
        })
    })
  }
  exit() {
    return new Promise(resolve => {
      const { uPos, uRadius, uAlpha, uNoiseFactor } = this.gate.material.uniforms;
      const tl = new TimelineMax({
        onComplete: resolve,
      });
      tl
        .to(uNoiseFactor, 0.3, {
          value: 0,
        })
        .to(uRadius, 0.4, {
          value: 0.2
        })
        .to(uRadius, 0.2, {
          value: 0.1,
          delay: 0.2
        })
        .to(uAlpha, 0.4, {
          value: 0,
        })
    })
  }

}
