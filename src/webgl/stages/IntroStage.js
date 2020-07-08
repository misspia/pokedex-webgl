import Animtor from '../animators/IntroAnimator';
import Stages from '../../constants/stages';
export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animtor(this.context);

    this.init();
  }

  init() {
    this.animator.play()
      .then(() => {
        console.debug('[complete]')
        // this.context.setStage(Stages.MAIN);
      })
  }

  update() {

  }
}
