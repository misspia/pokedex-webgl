import { TweenMax } from 'gsap/gsap-core';
import { TimelineMax, Power2, Power4 } from 'gsap';
import Layers from '../../../constants/layers';


export default class MainAnimator {
  constructor(context) {
    this.context = context;
    this.pp = context.pp;
  }

  play() {
    return new Promise(resolve => {
      resolve();
    })
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
        .to(card.pivot.rotation, 0.7, {
          z: -Math.PI * 6,
          ease: Power2.easeOut,
        }, 'spin')
        .to(card.pivot.scale, 0.7, {
          y: 0.33,
          x: 0.5,
          ease: Power2.easeOut,
          onComplete: () => {
            card.setLayer(Layers.BLOOM_CARD);
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
        .to(card.pivot.rotation, 0.7, {
          z: 0,
        }, 'spin')
        .to(card.pivot.scale, 0.5, {
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
    TweenMax.to(card.pivot.scale, 0.2, {
      x: 1.1,
      y: 1.1,
    });
  }

  unfocusCard(card) {
    TweenMax.to(card.pivot.scale, 0.2, {
      x: 1,
      y: 1,
    });

  }

}
