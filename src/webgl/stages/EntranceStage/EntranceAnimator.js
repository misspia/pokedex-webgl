import { TimelineMax } from 'gsap';

export default class EntranceAnimator {
  constructor(stage) {
    this.stage = stage;
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
  exit(gate) {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: () => resolve(),
      });
      tl
        .to(gate.material.uniforms.uAlpha, 0.5, {
          value: 0,
          onComplete: resolve,
        })
    })
  }

}
