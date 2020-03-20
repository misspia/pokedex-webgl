import { Vector3 } from 'three';
import { TimelineMax } from 'gsap';
import { RADIUS } from '../../CardCarousel';

export default class IntroAnimator {
  constructor(context) {
    this.context = context;
  }
  destroy() {

  }

  play() {
    this.context.disablePointerEvents(true);

    const delayMultiplier = 0.04;
    const cardDuration = 0.06;
    const totalDuration = this.context.carousel.cards.length * cardDuration;

    const cardIntros = this.context.carousel.cards.map((card, index) => (
      this.cardEntrance(card, cardDuration, index * delayMultiplier)
    ));
    const cameraIntro = this.cameraEntrance(totalDuration / 2);
    return Promise.all([...cardIntros, cameraIntro])
      .then((values) => {
        this.context.carousel.isRotating = true;
        this.context.carousel.isCycling = true;
        this.context.disablePointerEvents(false);
        return values;
      });
  }
  cameraEntrance(duration) {
    const radius = RADIUS + 30;
    const params = {
      angle: 0,
      y: this.context.carousel.minY,
    }
    const centerCoord = this.context.carousel.center;
    const tl = new TimelineMax();

    return new Promise((resolve) => {
      this.context.setCameraPosition(0, -25, radius);

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
    const destination = new Vector3().copy(card.pivot.position);
    const destination2 = new Vector3().copy(card.pivot.position);
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
          x: destination.x,
          y: destination.y,
          z: destination.z,
        }, {
          x: destination2.x,
          y: destination2.y,
          z: destination2.z,
        }, 'reveal')
        .to(card, duration, {
          alpha: 1
        })

    })
  }

}
