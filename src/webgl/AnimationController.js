import { TimelineMax } from 'gsap';

export default class AnimationController {
  constructor(context) {
    this.context = context;
  }
  activateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({ delay: 0.2 });
      tl
        .to(card.frontUniforms.uContentVisibility, 0.8, {
          value: 1,
        })
        .to(card.frontUniforms.uBGVisibility, 0.8, {
          value: 1,
          onComplete: () => {
            resolve();
          }
        });
    })
  }
  deactrivateCard() {
    const tl = new TimelineMax({ delay: 0.2 });
    return new Promise((resolve) => {
      tl
        .to(this.front.material.uniforms.uBGVisibility, 0.8, {
          value: 0,
        })
        .to(this.front.material.uniforms.uContentVisibility, 0.8, {
          value: 0,
          onComplete: () => {
            resolve();
          }
        });
    })
  }
}
