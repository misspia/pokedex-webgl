import { TweenMax } from 'gsap/gsap-core';
import { TimelineMax, Power2, Power4 } from 'gsap';
import Layers from '../../constants/layers';
import IntroAnimator from './IntroAnimator';
import EntranceAnimator from './EntranceAnimator';

export default class AnimationController {
  constructor(context) {
    this.context = context;
    this.entranceAnimator = new EntranceAnimator(this.context);
    this.introAnimator = new IntroAnimator(this.context);

    this.pp = context.pp;
  }
  startIntro() {
    return this.introAnimator.enter();
  }
  activateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true)
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
        }
      });
      tl
        .to(card.frontUniforms.uContentVisibility, 0.6, {
          value: 1,
        })
        .to(card.frontUniforms.uBGVisibility, 0.6, {
          value: 1,

        })
        .add('spin')
        .to(card.mesh.rotation, 0.7, {
          z: -Math.PI * 6,
          ease: Power2.easeOut,
        }, 'spin')
        .to(card.mesh.scale, 0.7, {
          y: 0.33,
          x: 0.5,
          ease: Power2.easeOut,
          onComplete: () => {
            card.setLayer(Layers.BLOOM);
          }
        }, 'spin')
        .to(this.pp.bloom, 2, {
          onStart: () => {
            resolve();
          },
          strength: 24,
          radius: 1.5,
          threshold: 0,
          ease: Power4.easeOut,
        })
    })
  }
  deactrivateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true);
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
          resolve();
        },

      });

      tl
        .to(this.pp.bloom, 0.4, {
          strength: 0,
          radius: 0,
          threshold: 0,
          onComplete: () => {
            card.setLayer(Layers.BASE);
          }
        })
        .add('spin')
        .to(card.mesh.rotation, 0.7, {
          z: 0,
        }, 'spin')
        .to(card.mesh.scale, 0.5, {
          y: 1,
          x: 1,
        }, 'spin')
        .to(card.frontUniforms.uBGVisibility, 0.4, {
          value: 0,
        })
        .to(card.frontUniforms.uContentVisibility, 0.5, {
          value: 0,
        });
    })
  }

  focusCard(card) {
    TweenMax.to(card.mesh.scale, 0.2, {
      x: 1.1,
      y: 1.1,
    });
  }

  unfocusCard(card) {
    TweenMax.to(card.mesh.scale, 0.2, {
      x: 1,
      y: 1,
    });

  }
}
