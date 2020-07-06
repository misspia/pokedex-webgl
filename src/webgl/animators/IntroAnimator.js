import { Vector3 } from 'three';
import gsap, { TimelineMax, Elastic } from 'gsap';
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
    console.debug('PLAY INTRO')
    this.context.disablePointerEvents(true);

    const minDelay = 0.5;
    const maxDelay = 3;
    const cardDuration = 1;

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
    this.context.camera.lookAt(new Vector3());
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  cardEntrance(card, duration, delay = 0) {
    const start = new Vector3(0, 100, 0);
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
        }, 'reveal')
        .fromTo(card, 0.1, {
          alpha: 0,
        }, {
          alpha: 1,
        }, 'reveal')

    })
  }
}

// cameraEntrance(duration) {
//   const radius = CAROUSEL_RADIUS * 2.5;
//   const yDestination = this.context.carousel.maxY + 10;
//   const params = {
//     angle: 0,
//     y: this.context.carousel.minY,
//   }
//   const centerCoord = this.context.carousel.center;
//   const tl = new TimelineMax();

//   return new Promise((resolve) => {
//     tl
//       .to(this.context.camera.position, 1, {
//         x: radius * Math.cos(params.angle) + centerCoord.x,
//         y: params.y,
//         z: radius * Math.sin(params.angle) + centerCoord.z,
//         onUpdate: () => {
//           this.context.lookAt(centerCoord);
//         }
//       })
//       .to(params, duration, {
//         angle: Math.PI * 2,
//         y: yDestination,
//         onUpdate: () => {
//           this.context.setCameraPosition(
//             radius * Math.cos(params.angle) + centerCoord.x,
//             params.y,
//             radius * Math.sin(params.angle) + centerCoord.z,
//           );
//           this.context.lookAt(centerCoord);
//         },
//         onComplete: resolve,
//       });
//   })
// }

