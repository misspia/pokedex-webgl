import { Vector3 } from 'three';
import { TimelineMax, Elastic } from 'gsap';
import { CAROUSEL_RADIUS } from '../../constants/entries';
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

    const minDelay = 0.5;
    const maxDelay = 3;
    const cardDuration = 0.5;

    const cardIntros = this.context.carousel.cards.map(card => (
      this.cardEntrance(card, cardDuration, randomFloatBetween(minDelay, maxDelay))
    ));
    const cameraIntro = this.cameraEntrance(maxDelay);
    return Promise.all([...cardIntros, cameraIntro])
      .then((values) => {
        this.context.carousel.isRotating = true;
        this.context.disablePointerEvents(false);
        return values;
      });
  }
  cameraEntrance(duration) {
    const radius = CAROUSEL_RADIUS * 2.5;
    const yDestination = this.context.carousel.maxY + 10;
    const params = {
      angle: 0,
      y: this.context.carousel.minY,
    }
    const centerCoord = this.context.carousel.center;
    const tl = new TimelineMax();

    return new Promise((resolve) => {
      tl
        .to(this.context.camera.position, 1, {
          x: radius * Math.cos(params.angle) + centerCoord.x,
          y: params.y,
          z: radius * Math.sin(params.angle) + centerCoord.z,
          onUpdate: () => {
            this.context.lookAt(centerCoord);
          }
        })
        .to(params, duration, {
          angle: Math.PI * 2,
          y: yDestination,
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

  cardEntrance(card, duration, delay = 0) {
    const start = new Vector3(0, this.context.carousel.midY, 0);
    const end = new Vector3().copy(card.pivot.position);
    return new Promise((resolve) => {
      const tl = new TimelineMax({
        delay,
        onComplete: resolve
      });
      tl
        .add('reveal')
        .fromTo(card.pivot.position, duration, {
          x: start.x,
          y: start.y,
          z: start.z,
        }, {
          x: end.x,
          y: end.y,
          z: end.z,
        }, 'reveal')
        .fromTo(this.card, duration, {
          scale: 0.6,
        }, {
          scale: 1,
          ease: Elastic.ease,
        }, 'reveal')
        .fromTo(card, duration, {
          alpha: 0,
        }, {
          alpha: 1,
        }, 'reveal')

    })
  }

}
