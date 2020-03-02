import { Vector3 } from 'three';
import { TweenMax } from 'gsap/gsap-core';
import { TimelineMax, Power2, Power4 } from 'gsap';
import Layers from '../constants/layers';
import { RADIUS } from './CardCarousel';

export default class AnimationController {
  constructor(context) {
    this.context = context;
    this.pp = context.pp;
  }
  startIntro() {
    this.context.disablePointerEvents(true);

    const delayMultiplier = 0.05;
    const cardDuration = 0.1;
    const totalDuration = this.context.carousel.cards.length * cardDuration;
    const cardIntros = this.context.carousel.cards.map((card, index) => (
      this.introCard(card, cardDuration, index * delayMultiplier)
    ));
    const cameraIntro = this.introCamera(totalDuration / 2);

    return Promise.all([...cardIntros, cameraIntro])
      .then((values) => {
        this.context.carousel.isRotating = true;
        this.context.disablePointerEvents(false);
        return values;
      });
  }
  introCard(card, duration, delay = 0) {
    const destination = new Vector3().copy(card.mesh.position);
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay,
        onComplete: () => {
          resolve();
        }
      });
      tl
        .from(card, {
          alpha: 0,
        })
        .add('reveal')
        .fromTo(card.mesh.position, duration, {
          x: destination.x - 20,
          y: destination.y - 20,
          z: destination.z - 20,
        }, {
          x: destination.x,
          y: destination.y,
          z: destination.z,

        }, 'reveal')
        .to(card, duration, {
          alpha: 1,
        }, 'reveal')

    })
  }
  introCamera(duration) {
    const radius = RADIUS + 30;
    const params = {
      angle: 0,
      y: -50,
    }
    const centerCoord = new Vector3();
    return new Promise((resolve) => {
      TweenMax.to(params, duration, {
        angle: Math.PI,
        y: 0,
        onUpdate: () => {
          this.context.setCameraPosition(
            radius * Math.cos(params.angle) + centerCoord.x,
            params.y,
            radius * Math.sin(params.angle) + centerCoord.z,
          );
          this.context.lookAt(centerCoord);
        },
        onComplete: resolve,
      });
    })
  }
  activateCard(card) {
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay: 0.2,
        onStart: () => {
          this.context.disablePointerEvents(true)
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
        }
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
        delay: 0.2,
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
