import { TimelineMax } from 'gsap';

export default class EntranceAnimator {
  constructor(context) {
    this.context = context;


  }
  destroy() {
    window.removeEventListener('mousemove', this.onMousemove);
  }

  onMousemove = (e) => {
    this.context.mouse.updatePosition(e);
    this.context.orb.setPosition(
      this.context.mouse.position.x,
      this.context.mouse.position.y,
      10,
    );
  }

  play() {
    window.addEventListener('mousemove', this.onMousemove);
    this.context.orb.setVisible(true);



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
