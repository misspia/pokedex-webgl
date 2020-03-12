import { TimelineMax } from 'gsap';

export default class EntranceAnimator {
  constructor(context) {
    this.context = context;


  }
  destroy() {

  }

  play() {
    return new Promise(resolve => {
      resolve();
      // const tl = new TimelineMax();
      // tl
      //   .from(this.context.petals.petals, {

      //   })
      //   .to(this.context.petals.petals, 1, {

      //   });
    });
  }
  exit() {

  }
}
