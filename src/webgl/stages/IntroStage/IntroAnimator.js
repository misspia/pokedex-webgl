import { Vector3 } from 'three';
import { TimelineMax } from 'gsap';
import { RADIUS } from '../../CardCarousel';
import { randomFloatBetween } from '../../../utils';

export default class IntroAnimator {
  constructor(context) {
    this.context = context;
  }
  destroy() {

  }

  play() {
    this.context.disablePointerEvents(true);

    const minDelay = 0.5;
    const maxDelay = 6;
    const cardDuration = 0.06;

    const cardIntros = this.context.carousel.cards.map((card, index) => (
      this.cardEntrance(card, cardDuration, randomFloatBetween(minDelay, maxDelay))
    ));
    const cameraIntro = this.cameraEntrance(maxDelay / 2);
    return Promise.all([...cardIntros, cameraIntro])
      .then((values) => {
        this.context.carousel.isRotating = true;
        this.context.disablePointerEvents(false);
        return values;
      });
  }
  cameraEntrance(duration) {
    const radius = RADIUS + 40;
    const params = {
      angle: 0,
      y: this.context.carousel.minY,
    }
    const centerCoord = this.context.carousel.center;
    const tl = new TimelineMax();

    return new Promise((resolve) => {
      tl
        .to(params, duration, {
          angle: Math.PI * 2,
          y: this.context.carousel.midY,
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
        .from(card, {
          alpha: 0,
        })
        .add('reveal')
        .fromTo(card.pivot.position, {
          x: start.x,
          y: start.y,
          z: start.z,
        }, {
          x: end.x,
          y: end.y,
          z: end.z,
        }, 'reveal')
        .to(card, duration, {
          alpha: 1
        })

    })
  }

}
