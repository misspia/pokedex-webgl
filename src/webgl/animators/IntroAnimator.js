import { Vector3 } from 'three';
import gsap, { Power2 } from 'gsap';
import { randomFloatBetween } from '../../utils';

export default class IntroAnimator {
  constructor(context) {
    this.context = context;
  }

  destroy() {

  }

  exit() {

  }

  play() {
    this.context.disablePointerEvents(true);

    const minDelay = 0.3;
    const maxDelay = 2;
    const cardDuration = 0.8;

    const cardIntros = this.context.carousel.cards.map(card => (
      this.cardEntrance(card, cardDuration, randomFloatBetween(minDelay, maxDelay))
    ));
    const cameraIntro = this.cameraEntrance(maxDelay + cardDuration);
    return Promise.all([...cardIntros, cameraIntro])
      .then((values) => {
        this.context.disablePointerEvents(false);
        return values;
      });
  }

  cameraEntrance(duration) {
    const target = new Vector3(0, 500, 0);
    const endTarget = new Vector3(0, 0, 0);
    return new Promise((resolve, reject) => {
      gsap.timeline({
        onComplete: resolve,
        onUpdate: () => {
          this.context.camera.lookAt(target);
        },
      })
      .to(this.context.camera.position, 0.3, {
        y: 100,
        z: 50,
      })
      .to(target, 0.8, {
        x: target.x,
        y: target.y,
        z: target.z,
      })
      .to(target, duration, {
        x: endTarget.x,
        y: endTarget.y,
        z: endTarget.z,
        ease: Power2.easeOut,
        delay: 0.2,
      });
    });
  }

  cardEntrance(card, duration, delay = 0) {
    const start = new Vector3().copy(card.pivot.position);
    start.y = 600;

    const end = new Vector3().copy(card.pivot.position);
    return new Promise((resolve) => {
      gsap.timeline({
        delay,
        onComplete: resolve,
      })
        .add('reveal')
        .fromTo(card.pivot.position, duration, {
          x: start.x,
          y: start.y,
          z: start.z,
        }, {
          x: end.x,
          y: end.y,
          z: end.z,
          ease: Power2.easeIn,
        }, 'reveal')
        .fromTo(card, 0.1, {
          alpha: 0,
        }, {
          alpha: 1,
        }, 'reveal')
        .to({}, 2, {})

    })
  }
}
