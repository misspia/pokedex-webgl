import { TimelineMax, Power2 } from 'gsap';
import Layers from '../constants/layers';

export default class AnimationController {
  constructor(context) {
    this.context = context;
  }
  activateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay: 0.2,
        onComplete: () => {
          card.setLayer(Layers.BLOOM);
          resolve();

        },
      });
      tl
        .to(card.frontUniforms.uContentVisibility, 0.8, {
          value: 1,
        })
        .to(card.frontUniforms.uBGVisibility, 0.8, {
          value: 1,

        })
        .add('spin')
        .to(card.mesh.rotation, 1, {
          z: -Math.PI * 6,
          ease: Power2.easeOut,
        }, 'spin')
        .to(card.mesh.scale, 1, {
          y: 0.33,
          x: 0.5,
          ease: Power2.easeOut,
        }, 'spin');
    })
  }
  deactrivateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay: 0.2,
        onStart: () => {
          card.setLayer(Layers.BASE);
        },
        onComplete: () => {
          resolve();
        }
      });
      tl
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
}
