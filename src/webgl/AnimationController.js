import { TimelineMax } from 'gsap';

export default class AnimationController {
  constructor(context) {
    this.context = context;
  }
  activateCard(card) {
    return new Promise((resolve) => {
      this.context.carousel.pauseRotation();

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
  deactrivateCard(card) {
    const tl = new TimelineMax({ delay: 0.2 });
    return new Promise((resolve) => {
      tl
        .to(card.frontUniforms.uBGVisibility, 0.8, {
          value: 0,
        })
        .to(card.frontUniforms.uContentVisibility, 0.8, {
          value: 0,
          onComplete: () => {
            this.context.carousel.resumeRotation();
            resolve();
          }
        });
    })
  }
}
