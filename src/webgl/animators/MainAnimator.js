import gsap from 'gsap';
import { Power4 } from 'gsap';
import Layers from '../../constants/layers';


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
      gsap.timeline({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true)
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
        }
      })
        .to(card.position, 0.2, {
          y: 10,
          ease: Power4.easeInOut,
        })
        .to(card.frontUniforms.uContentVisibility, 0.6, {
          value: 1,
        })
        .to(card.frontUniforms.uBGVisibility, 0.6, {
          value: 1,
        })
        .to(this.pp.bloom, 2, {
          onStart: () => {
            resolve();
          },
          strength: 18,
          radius: 1.2,
          threshold: 0,
          ease: Power4.easeOut,
        })
    })
  }

  deactrivateCard(card) {
    return new Promise((resolve) => {
      gsap.timeline({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true);
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
          resolve();
        },
      })
        .to(this.pp.bloom, 0.4, {
          strength: 0,
          radius: 0,
          threshold: 0,
          onComplete: () => {
            card.setLayer(Layers.BASE);
          }
        })
        .to(card.frontUniforms.uBGVisibility, 0.4, {
          value: 0,
        })
        .to(card.frontUniforms.uContentVisibility, 0.5, {
          value: 0,
        })
        .to(card.position, 0.2, {
          y: card.restingYPos,
          ease: Power4.easeInOut,
        })
    })
  }

  flipCard(card) {
    const endY = card.position.y;

    gsap.timeline()
    .to(card.position, 0.1, {
      y: endY + card.width,
    })
    .to(card.rotation, 0.3, {
      y: -Math.PI,
    })
    .to(card.position, 0.1, {
      y: endY,
    });
  }
}
